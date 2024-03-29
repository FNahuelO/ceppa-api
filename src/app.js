import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { router } from './routes/index.js'
import { config } from 'dotenv'

config()

import './config/sequelize.js'

export const app = express()

app.use(
  fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
  }),
)

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
app.use('/', router)
