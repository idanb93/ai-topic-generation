import { MediaBuyingPlatform } from "../enums/MediaBuyingPlatform"

export type CampaignTopic = {
    id: number,
    vertical : string,
    sub_vertical: string,
    topic: string,
    geo: string,
    platform: MediaBuyingPlatform
}