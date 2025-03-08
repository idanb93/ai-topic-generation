import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { topicsGenerationResponse } from "./types/CampaignTopic"

export class ChatGPT {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generateCompletion(model: string, prompt: string): Promise<any> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        response_format: zodResponseFormat(topicsGenerationResponse, "event"),
        store: true,
      });

      const responseMessage = completion.choices[0].message;
      return responseMessage?.content || "No response received.";
    } catch (error) {
      console.error("Error generating completion:", error);
      throw new Error("Failed to generate completion.");
    }
  }
}