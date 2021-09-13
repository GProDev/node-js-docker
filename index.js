const express = require('express')
const { connectDb } = require('./src/dbconnection')
const UserSession = require('./src/middleware/user-session')
const router = require('./src/router')
const cors = require('cors')

const { PORT } = process.env

const port = PORT || 3000

connectDb()

const app = express()

app.enable('trust proxy')

app.use(cors({}))

app.use(UserSession)

app.use(router)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
