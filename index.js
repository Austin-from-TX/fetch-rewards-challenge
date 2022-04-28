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

app.post('/')

const PORT = 3000

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})