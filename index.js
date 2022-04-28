const express = require('express')
const app = express()

const pointsData = [
  {
    payer: 'DANONE',
    points: 1000, 
    timestamp: 'Today'
  }
]

app.get('/balances', (req, res, next) => {
  res.json(pointsData)
})

app.post('/balances', (req, res, next) => {
  pointsData = req.body
  res.json(pointsData)
})



const PORT = 3000

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})