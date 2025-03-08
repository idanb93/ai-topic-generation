import { Divider, Select } from "antd"
import axios, { AxiosResponse } from "axios"
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { availableVerticals } from "../consts/verticals"
import { availableGeos } from "../consts/geos"

export const AddCustomizedCampaignsTopics: React.FC = () => {
  const [verticals, setVerticals] = useState<Array<string>>([]);
  const [geos, setGeos] = useState<Array<string>>([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const addNewCampaignsTopics = async () => {
    try {
      setIsLoading(true)
      const res: AxiosResponse = await axios.post(
        "http://localhost:3001/add_campaigns_topics", {
          verticals: verticals,
          geos: geos
        }
      )
      setIsLoading(false)
      alert(res.data.message);
      history.push("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id="add-campaign-main-section">
      <div id="add-new-campaign-container">
        <strong style={{ fontSize: "3vh" }}>Generate New Campaigns Topics</strong>
        <Select
          mode="multiple"
          style={{ width: "350px" }}
          placeholder="Select Verticals"
          value={verticals.length > 0 ? verticals : undefined}
          options={availableVerticals.map((availableVertical) => ({
            value: availableVertical,
            label: availableVertical,
          }))}
          onChange={(selectedValues) => setVerticals(selectedValues)}
          showArrow
          maxTagCount={2}
        />
        <Select
          mode="multiple"
          style={{ width: "350px" }}
          placeholder="Select GEOs"
          value={geos.length > 0 ? geos : undefined}
          options={availableGeos.map((availableGeo) => ({
            value: availableGeo,
            label: availableGeo,
          }))}
          onChange={(selectedValues) => setGeos(selectedValues)}
          showArrow
          maxTagCount={2}
        />
        <div id="add-campaign-links-container">
          <button
            id={"link-add-campaign"}
            type="button"
            onClick={addNewCampaignsTopics}
          >
            Generate New Topics
          </button>
          <Link to={"/"} id={"link-add-campaign"}>
            Back To Dashboard
          </Link>
        </div>
        {isLoading && <div>Please wait while generating new topics...</div>}
      </div>
    </div>
  )
}