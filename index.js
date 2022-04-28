const express = require('express')
const app = express()

const pointsData = {}

app.get('/balances', (req, res, next) => {
  res.json(poinstData)
})

app.post('/')

const PORT = 3000

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})