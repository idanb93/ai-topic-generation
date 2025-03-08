import "./App.css"
import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { AddCustomizedCampaignsTopics } from "./components/AddCustomizedCampaignsTopics"
import { Title } from "./components/Title"
import { Dashboard } from "./components/Dashboard"

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <div id="dashboard-page-container">
          <Title />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/add_campaigns_topics" component={AddCustomizedCampaignsTopics} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}
