import { Request, Response } from "express"
import { CampaignTopic } from "../core/types/CampaignTopic"
import { _getAllCampaignsTopics, _addCustomizedCampaignTopic, _deleteCampaignTopic } from "../services/campaignsTopics"

export const CampaignTopicController = {
    getAllCampaignsTopics,
    addCustomizedCampaignTopic,
    deleteCampaignTopic
}


async function getAllCampaignsTopics(request: Request, response: Response) : Promise<void> {
  try {
    const res = await _getAllCampaignsTopics()
    response.status(200).send({
      message: "Campaigns fetched successful!",
      data: res,
    })
  } catch (e) {
    console.log(e)
    response.status(404).send({
      message: "server error",
    })
  }
}

async function addCustomizedCampaignTopic(request: Request, response: Response) : Promise<void> {
    try {
        const { verticals, geos } = request.body;
        if (!verticals || verticals.length === 0 && !geos || geos.length === 0) {
            throw new Error("verticals and geo fields can't be empty");
        }
        const res = await _addCustomizedCampaignTopic(verticals, geos);
        response.status(200).send({
          message: "Campaigns fetched successful!",
          data: res,
        })
      } catch (e) {
        console.log(e)
        response.status(404).send({
          message: `error in addCustomizedCampaignTopic : ${e}`,
        })
      }
}

async function deleteCampaignTopic(request: Request, response: Response) {
  try {
    const {params: { id }} = request
    const res = await _deleteCampaignTopic(id)
    response.status(200).send({
      message: "Campaign has been deleted!",
    })
  } catch (e) {
    console.log(e)
    response.status(404).send({
      message: "server error",
    })
  }
}