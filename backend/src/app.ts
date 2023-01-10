import express from 'express'
import { initRoutes } from './routes'
import { log, LOG_TYPE_INFO } from './common/LogService'
import { sequelize } from './db'
import cors from 'cors'

sequelize.authenticate()

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ENV: string;
    }
  }
}

const { PORT, ENV } = process.env
const app = express()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:4403'
}));

app.listen(PORT, async () => {
  initRoutes(app)

  log(LOG_TYPE_INFO, `[${Date.now()}][${ENV}] [LISTENING:${PORT}]`)
})

module.exports = app
