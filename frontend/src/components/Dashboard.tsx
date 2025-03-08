import React, { useEffect, useState } from "react"
import { Button, Form, Input, Table } from "antd"
import axios, { AxiosResponse } from "axios"
import { Link } from "react-router-dom"
import { CampaignTopic } from "../types/CampaignTopic"

export const Dashboard: React.FC = () => {
  const [dataSource, setDataSource] = useState<Array<CampaignTopic>>([])
  const [edititingRow, setEditingRow] = useState(0)
  const [form] = Form.useForm()

  useEffect(() => {
    const getCampaignsTopics = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          "http://localhost:3001/get_campaigns_topics"
        )
        setDataSource(res.data.data)
      } catch (err) {
        alert(err)
      }
    }
    getCampaignsTopics()
  }, [])

  const columns = [
    {
      title: "Vertical",
      dataIndex: "vertical",
      render: (text: any, record: CampaignTopic) => {
        if (edititingRow === record.id) {
          return (
            <Form.Item
              name={"vertical"}
              rules={[
                {
                  required: true,
                  message: `Please enter a campaign name`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: "Sub Vertical",
      dataIndex: "sub_vertical",
      render: (text: any, record: CampaignTopic) => {
        if (edititingRow === record.id) {
          return (
            <Form.Item name={"sub_vertical"}>
            </Form.Item>
          )
        
        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: "Topic",
      dataIndex: "topic",
      render: (text: any, record: CampaignTopic) => {
        if (edititingRow === record.id) {
          return (
            <Form.Item name={"topic"}>
                          </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: "Geo",
      dataIndex: "geo",
      render: (text: any, record: CampaignTopic) => {
        if (edititingRow === record.id) {
          return (
            <Form.Item name={"geo"}>
                          </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: "Platform",
      dataIndex: "platform",
      render: (text: any, record: CampaignTopic) => {
        if (edititingRow === record.id) {
          return (
            <Form.Item name={"platform"}>
                          </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: "Actions",
      render: (_: any, record: CampaignTopic) => {
        return (
          <>
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

  const onDeleteCampaign = async (id: number) => {
    const updatedDataSource: Array<CampaignTopic> = [...dataSource]
    const indexOfDeletedCampaign = dataSource.findIndex(
      (campaign: CampaignTopic) => campaign.id === id
    )

    updatedDataSource.splice(indexOfDeletedCampaign, 1)

    try {
      const res: AxiosResponse = await axios.delete(
        `http://localhost:3001/delete_campaign_topic/${id}`
      )
      alert(res.data.message)
      setDataSource(updatedDataSource)
      setEditingRow(id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id="dashboard-main-section">
      <Link to={"/add_campaigns_topics"} id={"dashboard-link-add-campaign"}>
        CUSTOMIZED CAMPAIGN TOPIC 
      </Link>
      <div id="dashboard-table-container">
        <Form form={form}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={(record) => record.id}
          ></Table>
        </Form>
      </div>
    </div>
  )
}
