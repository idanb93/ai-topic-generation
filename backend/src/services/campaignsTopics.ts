import { sqlConnector } from "../core/sql/sqlConnector";
import { CampaignTopic } from "../core/types/CampaignTopic";
import { ChatGPT } from "../core/OpenAI/ChatGPT";
import format from "pg-format";

export async function _getAllCampaignsTopics (): Promise<Array<CampaignTopic>> {
  try {
    const query: string = "SELECT * FROM campaigns_topics ORDER BY id DESC";
    return await sqlConnector.query(query);
  } catch (err) {
    console.error("Error fetching campaigns topics:", err);
    throw err;
  }
}

async function getBestTopics (verticals, geos): Promise<Array<string>> {
  const q = format(`
    SELECT * FROM campaigns_topics 
    WHERE vertical IN (%L) 
    AND geo IN (%L) 
    ORDER BY clicks DESC 
    LIMIT 5;
  `, verticals, geos);

  const res = await sqlConnector.query(q);
  return res.map(campaign => campaign.topic)
}

function parseEventFromChatGpt (eventResponse: { topics: Array<CampaignTopic> }) {
  let event: { topics: Array<CampaignTopic> };

  try {
    event = typeof eventResponse === "string" ? JSON.parse(eventResponse) : eventResponse;
  } catch (err) {
    console.error("Error parsing API response:", err);
    throw new Error("Failed to parse API response from OpenAI");
  }

  if (!event.topics || !Array.isArray(event.topics)) {
    console.error("Invalid API response: expected `topics` to be an array.", event);
    throw new Error("Invalid API response: `topics` is missing or not an array");
  }

  const parsedEvent = event.topics.map(({ vertical, sub_vertical, topic, geo, platform }) => [
    vertical,
    sub_vertical,
    topic,
    geo,
    platform,
  ]);

  return parsedEvent;
}

async function generateTopicsByChatGpt (verticals: Array<string>, geos: Array<string>, bestTopics: Array<string>) {
  const openAIInstance: ChatGPT = new ChatGPT();

  const userPrompt: string = `
    Write a list of 10 campaign topics,
    some for Facebook and some for TikTok using the following
    verticals: ${verticals} and GEOs: ${geos}.
    example for successful campaigns topics: ${bestTopics}`;

  const model: string = "gpt-4o";
  const eventResponse: { topics: Array<CampaignTopic> } = await openAIInstance.generateCompletion(model, userPrompt);
  return parseEventFromChatGpt(eventResponse);
}

async function insertTopicsToDB (parsedEvent) {
  const query = format("INSERT INTO campaigns_topics (vertical, sub_vertical, topic, geo, platform) VALUES %L RETURNING *;", parsedEvent);
  const result: any = await sqlConnector.query(query);
  console.log("Inserted rows:", result.rows);
  return result.rows;
}

export async function _addCustomizedCampaignTopic (verticals: Array<string>, geos: Array<string>) {
  try {
    const bestTopics = await getBestTopics(verticals, geos);
    const topics = await generateTopicsByChatGpt(verticals, geos, bestTopics);
    const newTopics = await insertTopicsToDB(topics);
    return newTopics;
  } catch (err) {
    console.error("Error adding campaigns topics:", err);
    throw err;
  }
}

export async function _deleteCampaignTopic (topic_id: string) {
  try {
    const query = "DELETE FROM campaigns_topics WHERE id = $1 RETURNING *";
    const result = await sqlConnector.query(query, [topic_id]);
    return result[0];
  } catch (err) {
    console.error("Error deleting campaign topic:", err);
    throw err;
  }
}

export async function _addClickToCampaignTopic (topic_id: string) {
  try {
    const query = "UPDATE campaigns_topics SET clicks = clicks + 1 WHERE id = $1 RETURNING *";
    const result = await sqlConnector.query(query, [topic_id]);
    return result[0];
  } catch (err) {
    console.error("Error in _addClickToCampaignTopic:", err);
    throw err;
  }
}