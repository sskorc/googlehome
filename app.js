const express = require('express')
const app = express()

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.post('/', (req, res) => res.send({
   "fulfillmentText" : req.body.queryResult.parameters["color"]
  }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
