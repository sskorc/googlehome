const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.post('/', async (req, res) =>{
  console.log(req.body)

  const response = await axios.get('https://api.covid19api.com/live/country/poland/status/confirmed')

  const numberOfCases = response.data.pop().Cases;

  // const numberOfCases = 100;

  res.send({
    "fulfillmentText" : `The current number of cases in Poland is ${numberOfCases}`
   })
}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
