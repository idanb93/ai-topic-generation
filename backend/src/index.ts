import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { configureRoutes } from "./routes"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configureRoutes(app)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})
