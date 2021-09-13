const express = require('express')
const { connectDb } = require('./src/dbconnection')
const router = require('./src/router')

connectDb()

const app = express()

const { PORT } = process.env

const port = PORT || 3000

app.get('/', (req, res) => {
  res.send("<h2>Hi there</h2>")
})

app.use(router)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
