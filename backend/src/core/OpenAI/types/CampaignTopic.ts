import { z } from "zod";

export const CampaignTopicResponse = z.object({
  vertical: z.string(),
  sub_vertical: z.string(),
  topic: z.string(),
  geo: z.string(),
  platform: z.string(),
  
});

export const topicsGenerationResponse = z.object({
  topics: z.array(CampaignTopicResponse),
});
