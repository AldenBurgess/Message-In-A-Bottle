const express = require('express');
const app = express();
//need this in order to make req work right
var bodyParser = require('body-parser');
const https = require('https')
var options = {
  hostname: 'bottlemessage-299107.uc.r.appspot.com',
  port: 443,
  path: '/api/query/anandaHouse',
  method: 'GET'
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;        // set our port
var router = express.Router();  //router as usual




app.get('/', function (req, res) {
  res.send('get request to the homepage')

})
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()


app.listen(port);
