import { sqlConnector } from "../core/sql/sqlConnector";
import { CampaignTopic } from "../core/types/CampaignTopic";
import { ChatGPT } from "../core/OpenAI/ChatGPT";
import format from "pg-format";


export async function _getAllCampaignsTopics() : Promise<Array<CampaignTopic>> {
  try {

    // const openAIInstance : ChatGPT = new ChatGPT();
    // const userPrompt : string = "Write a list of 10 campaign topics, some for Facebook and some for TikTok.";
    // const event : string = await openAIInstance.generateCompletion("gpt-4o", userPrompt);
    // console.log(event);



    const query : string = "SELECT * FROM campaigns_topics";
    return await sqlConnector.query(query);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
}

export async function _addCustomizedCampaignTopic(verticals: Array<string>, geo: Array<string>) {
  try {
    const openAIInstance : ChatGPT = new ChatGPT();
    const userPrompt : string = `Write a list of 10 campaign topics, some for Facebook and some for TikTok using the following verticals: ${verticals} and GEOs: ${geo}.`;
    const event : { message: string, data : Array<any>} = await openAIInstance.generateCompletion("gpt-4o", userPrompt);

    console.log(event);

    const query = format(
      "INSERT INTO campaigns_topics (vertical, sub_vertical, topic, geo, platform) VALUES %L RETURNING *;",
      event.data.map(({ vertical, sub_vertical, topic, geo, platform }) => [vertical, sub_vertical, topic, geo, platform])
    );

    // const query = `
    //   INSERT INTO campaigns_topics (vertical, sub_vertical, topic, geo, platform)
    //   VALUES ($1, $2, $3, $4, $5) RETURNING *;
    // `;

    // const values : Array<string> = [
    //   // event.vertical,
    //   // event.sub_vertical,
    //   // event.topic,
    //   // event.geo,
    //   // event.platform,
    // ];

    const result : any = await sqlConnector.query(query);

    console.log("Inserted rows:", result.rows);
    return result.rows;

    // const result = await sqlConnector.query(query, values);
    // return result[0];

  } catch (error) {
    console.error("Error adding campaign:", error);
    throw error;
  }
}

export async function _deleteCampaignTopic(topic_id: string) {
  try {
    const query = "DELETE FROM campaigns_topics WHERE id = $1 RETURNING *";
    const result = await sqlConnector.query(query, [topic_id]);
    return result[0];
  } catch (error) {
    console.error("Error deleting campaign topic:", error);
    throw error;
  }
}