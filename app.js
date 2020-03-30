const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.post('/', (req, res) =>{
  console.log(req.body)

  const numberOfCases = 100;

  res.send({
    "fulfillmentText" : `The current number of cases in Poland is ${numberOfCases}`
   })
}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
