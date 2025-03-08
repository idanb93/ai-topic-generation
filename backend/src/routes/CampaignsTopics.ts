import Express, { Router } from "express"
import { CampaignTopicController } from "../controllers/CampaignTopicController"

const CampaignTopicRouter: Router = Express.Router()
const { getAllCampaignsTopics, addCustomizedCampaignTopic, deleteCampaignTopic, addClickToCampaignTopic } = CampaignTopicController

CampaignTopicRouter.get("/get_campaigns_topics", getAllCampaignsTopics)
CampaignTopicRouter.post("/add_campaigns_topics", addCustomizedCampaignTopic)
CampaignTopicRouter.delete("/delete_campaign_topic/:id", deleteCampaignTopic)
CampaignTopicRouter.post("/add_campaign_topic_click/:id", addClickToCampaignTopic)
export default CampaignTopicRouter
