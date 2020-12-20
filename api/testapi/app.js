const express = require('express');
const app = express();
//need this in order to make req work right
var bodyParser = require('body-parser');
const https = require('https')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;        // set our port
var router = express.Router();  //router as usual


app.get('/', function (req, res) {
  res.send('get request to the homepage')

})
//this is how to make a get request to the api
function getRequest(placeName){
  const options = {
    hostname: 'cassandra-api.bottlemessage-299107.uc.r.appspot.com',
    port: 443,
    path: '/api/query/'+placeName,
    method: 'GET'
  }

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
}
//this is how to make a post request to the api
function postRequest(messageText, messageType, placeName){
  var date = new Date();
  var newDate = date.toString();
  const data = JSON.stringify({
    messageText:messageText,
    postTime: newDate,
    messageType: messageType,
    placeName: placeName
  })

  const options = {
    hostname: 'cassandra-api.bottlemessage-299107.uc.r.appspot.com',
    port: 443,
    path: '/api/postStuff',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}
getRequest('anandaHouse')
app.listen(port);
