import { Application } from "express"
import CampaignTopicRouter from "./CampaignsTopics"

const Routes = [{ path: "/", router: CampaignTopicRouter }]

const configureRoutes = (app: Application) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined"
    )
    return process.exit(1)
  }

  // Custom Routes
  Routes.forEach((route) => app.use(route.path, route.router))
}

export { configureRoutes }
