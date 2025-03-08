import { Request, Response } from "express"
import { _getAllCampaignsTopics, _addCustomizedCampaignTopic, _deleteCampaignTopic, _addClickToCampaignTopic } from "../services/campaignsTopics"

export const CampaignTopicController = {
  getAllCampaignsTopics,
  addCustomizedCampaignTopic,
  deleteCampaignTopic,
  addClickToCampaignTopic
}

async function getAllCampaignsTopics (request: Request, response: Response): Promise<void> {
  try {
    const res = await _getAllCampaignsTopics()
    response.status(200).send({
      message: "Campaigns Topics fetched successful!",
      data: res,
    })
  } catch (err) {
    console.log(err)
    response.status(404).send({
      message: `error in getAllCampaignsTopics : ${err}`,
    })
  }
}

async function addCustomizedCampaignTopic (request: Request, response: Response): Promise<void> {
  try {
    const { verticals, geos } = request.body;
    if (!verticals || verticals.length === 0 && !geos || geos.length === 0) {
      throw new Error("verticals and geo fields can't be empty");
    }
    const res = await _addCustomizedCampaignTopic(verticals, geos);
    response.status(200).send({
      message: "Created 10 Topics!",
      data: res,
    })
  } catch (err) {
    console.log(err)
    response.status(404).send({
      message: `error in addCustomizedCampaignTopic : ${err}`,
    })
  }
}

async function deleteCampaignTopic (request: Request, response: Response) {
  try {
    const { id } = request.params;
    const res = await _deleteCampaignTopic(id);
    if (!res) {
      throw new Error(`Topic to delete not found!`);
    }
    response.status(200).send({
      message: "Campaign Topic has been deleted!",
    })
  } catch (err) {
    console.log(err)
    response.status(404).send({
      message: `error in deleteCampaignTopic : ${err}`,
    })
  }
}

async function addClickToCampaignTopic (request: Request, response: Response) {
  try {
    const { id } = request.params;
    const res = await _addClickToCampaignTopic(id);
    if (!res) {
      throw new Error(`Topic not found!`);
    }
    response.status(200).send({
      message: "Campaign Topic Clicks Has Been Updated!",
    })
  } catch (err) {
    console.log(err)
    response.status(404).send({
      message: `error in addClickToCampaignTopic : ${err}`,
    })
  }
}