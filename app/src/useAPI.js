//need this in order to make req work right
var bodyParser = require('body-parser');
const https = require('https')

// function getRequest(placeName){
//   const options = {
//     hostname: 'cassandra-api-dot-bottlemessage-299107.uc.r.appspot.com',
//     port: 443,
//     path: '/api/query/'+placeName,
//     method: 'GET'
//   }
//   //why the fuck do I need to do it this stupid ass way
//   callback = function(res) {
//     var str
//     res.on('data', function(chunk){
//       process.stdout.write(chunk)
//       console.log("\n\n")
//       if (chunk !="undefined"){
//         str+=chunk
//       }
//     })
//     res.on('end', function(){
//       console.log(str)
//     })
//   };
//   var req = https.request(options, callback).end();
// }

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

  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

//exports.getRequest = getRequest
exports.postRequest = postRequest
