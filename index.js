const express = require('express')

const app = express()

const { PORT } = process.env

const port = PORT || 3000

app.get('/', (req, res) => {
  res.send("<h2>Hi there!!!</h2>")
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
