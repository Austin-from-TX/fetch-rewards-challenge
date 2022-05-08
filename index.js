const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let pointsData = []

app.get('/balances', (req, res) => {
  res.json(pointsData)
})

app.post('/balances', (req, res) => {
  pointsData.push(req.body)
  sortByTimestamp(pointsData, "timestamp")
  res.json(pointsData)
})

app.post('/spend', (req, res) => {
  res.json(pointsData)
})

function sortByTimestamp(array, key) {
    return array.sort(function(a, b) {
        let x = a[key]
        let y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const PORT = 3000

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})