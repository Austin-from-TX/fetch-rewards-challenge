const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let pointsData = [
  { payer: "DANNON", "points": 300, timestamp: '2020-10-31T10:00:00Z' },
  { payer: "UNILEVER", points: 200, timestamp: '2020-10-31T11:00:00Z' },
  { payer: "DANNON", points: -200, timestamp: '2020-10-31T15:00:00Z' },
  { payer: "MILLER COORS", points: 10000, timestamp: '2020-11-01T14:00:00Z' },
  { payer: "DANNON", points: 1000, timestamp: '2020-11-02T14:00:00Z' },
]

app.get('/balances', (req, res) => {
  res.json(pointsData)
})

app.post('/balances', (req, res) => {
  pointsData.push(req.body)
  sortByTimestamp(pointsData, "timestamp")
  res.json(pointsData)
})

app.post('/spend', (req, res) => {
  const spend = req.body
  deductPoints(pointsData, spend.points)
  res.json(pointsData)
})

//reduce points from spend 
 function deductPoints(array, amount) {
   const result = []
   const payerName = []

   for (let i=0; i < array.length; i++){
     let current = array[i]
     console.log('---current----', current)
     if(payerName.includes(current.payer)){
      // result[current.payer] += current.points
     }
     else {
        result.push({payer: current.payer, points: current.points})
        payerName.push(current.payer)
     }
   }
  return result
}

console.log(deductPoints(pointsData))

//sort each POST to /balances route by timestamp 
function sortByTimestamp(array, key) {
    return array.sort(function(a, b) {
        let x = a[key]
        let y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

//reduce points in sorted array by each POST to /spend 
// function deductPoints(array, amount) {
//   const result = []

//   for (let i = 0; i < array.length; i++){
//     let current = array[i]
//     if (amount > current.points && current.points > 0) {
//       amount -= current.points 
//       result.push({payer: current.payer, points: `-${current.points}`})
//     }
//     if (amount > current.points && current.points < 0) {
//       amount -= current.points
//     }

//     if (amount < current.points && current.points > 0) {
//       result.push({payer: current.payer, points: `-${amount}`})
//       console.log('result', result)
//       return result
//     }
//   }
// }

const PORT = 3000

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})