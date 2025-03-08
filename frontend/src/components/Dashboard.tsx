import React, { useEffect, useState } from "react"
import { Button, Form, Table } from "antd"
import axios, { AxiosResponse } from "axios"
import { Link } from "react-router-dom"
import { CampaignTopic } from "../types/CampaignTopic"

export const Dashboard: React.FC = () => {
  const [dataSource, setDataSource] = useState<Array<CampaignTopic>>([])
  const [form] = Form.useForm()

  const loadCampaignsTopics = async () => {
    try {
      const res: AxiosResponse = await axios.get("http://localhost:3001/get_campaigns_topics")
      setDataSource(res.data.data)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    loadCampaignsTopics()
  }, [])

  const onCampaignTopicClickIncrease = async (id: number) => {
    try {
      await axios.post(`http://localhost:3001/add_campaign_topic_click/${id}`)
      await loadCampaignsTopics();
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteCampaign = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/delete_campaign_topic/${id}`)
      await loadCampaignsTopics();
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      width: 100,
      title: "Vertical",
      dataIndex: "vertical",
      render: (text: any) =>  <p>{text}</p>,
    },
    {
      width: 100,
      title: "Sub Vertical",
      dataIndex: "sub_vertical",
      render: (text: any) =>  <p>{text}</p>,
    },
    {
      width: 100,
      title: "Topic",
      ellipsis: true,
      dataIndex: "topic",
      render: (text: any) => <p className="ellipsis-text">{text}</p>
    },
    {
      width: 100,
      title: "Geo",
      dataIndex: "geo",
      render: (text: any) => <p>{text}</p>
    },
    {
      width: 100,
      title: "Platform",
      dataIndex: "platform",
      render: (text: any) => <p>{text}</p>
    },
    {
      width: 100,
      title: "Clicks",
      dataIndex: "clicks",
      render: (text: any) => <p>{text}</p>
    },
    {
      width: 100,
      title: "Actions",
      render: (_: any, record: CampaignTopic) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => onCampaignTopicClickIncrease(record.id)}
            >
              Add Click +
            </Button>
            <Button
              type="link"
              onClick={() => onDeleteCampaign(record.id)}
            >
              Delete
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <div id="dashboard-main-section">
      <Link to={"/add_campaigns_topics"} id={"dashboard-link-add-campaign"}>
        Add Customized Campaigns Topics 
      </Link>
      <div id="dashboard-table-container">
        <Form form={form}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={(record) => record.id}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          ></Table>
        </Form>
      </div>
    </div>
  )
}
