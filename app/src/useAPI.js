//need this in order to make req work right
var bodyParser = require('body-parser');
const https = require('https')

function getRequest(placeName){
  const options = {
    hostname: 'cassandra-api-dot-bottlemessage-299107.uc.r.appspot.com',
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
  var newDate = date.toISOString().split('T')[0]
  console.log(newDate)
  const data = JSON.stringify({
    messageText:messageText,
    postTime: newDate,
    placeName: placeName,
    messageType: messageType
  })

  const options = {
    hostname: 'cassandra-api-dot-bottlemessage-299107.uc.r.appspot.com',
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

postRequest("Hi my name's ananda", "hearts", "anandaHouse")
exports.getRequest = getRequest
exports.postRequest = postRequest
