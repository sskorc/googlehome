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

const STATUSES = ['confirmed', 'recovered', 'deaths'];

app.post('/', async (req, res) => {
  console.log(req.body)
  const country = req.body.queryResult.parameters["geo-country"];

  const casesPromises = STATUSES.map(async status => {
  	const response = await axios.get('https://api.covid19api.com/live/country/' + country.toLowerCase() + '/status/' + status)
  	const numberOfCases = response.data.pop().Cases;

  	return `${status}: ${numberOfCases}`
  })
  const numberOfCases = await Promise.all(casesPromises)

  console.log(numberOfCases)

  const numberOfCasesText = `The current numbers for ${country} are ${numberOfCases.join(', ')}`
  console.log(numberOfCasesText)

  // const response = await axios.get('https://api.covid19api.com/live/country/' + country.toLowerCase() + '/status/confirmed')

  // const numberOfCases = response.data.pop().Cases;

  // const numberOfCases = 100;

  res.send({
    "fulfillmentText" : numberOfCasesText
    //`The current number of cases in ${country} is ${numberOfCases}`
   })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
