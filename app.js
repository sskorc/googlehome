const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const STATUSES = ['confirmed', 'recovered', 'deaths'];

app.post('/', async (req, res) => {
  console.log(req.body)
  const country = req.body.queryResult.parameters["geo-country"];
  let countrySlug = country.replace(/\'/, '').replace(/\s+/g, '-').toLowerCase()
  
  if (countrySlug == 'south-korea') {
    countrySlug = 'korea-south'
  }
  else if (countrySlug == 'united-states') {
    countrySlug = 'us'
  }

  const casesPromises = STATUSES.map(async status => {
    try {
      const response = await axios.get('https://api.covid19api.com/total/country/' + countrySlug + '/status/' + status)
      const numberOfCases = response.data.pop().Cases;

      return `${status}: ${numberOfCases}`
    } catch (e) {
      return undefined
    }
  })
  const numberOfCases = await Promise.all(casesPromises)

  let numberOfCasesText
  if (numberOfCases.some(element => element == undefined)) {
    numberOfCasesText = `Sorry, I don't understand: ${country}. Please provide another name.`;
  } else {
    numberOfCasesText = `The current numbers for ${country} are ${numberOfCases.join(', ')}.`
  }

  console.log(numberOfCasesText)

  res.send({
    "fulfillmentText": numberOfCasesText
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
