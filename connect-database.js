const { Client } = require("cassandra-driver");
//ofc express
const express = require('express');
const app = express();
//need this in order to make req work right
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();  //router as usual

//connecting to the server and all that stuff you need to do
const client = new Client({
  cloud: {
    //ssl certs in directory - make sure you upload to google cloud!!!
    secureConnectBundle: "./secure-connect-bottledmessage.zip",
  },
  //ye
  credentials: { username: "passthelad", password: "CoolKid56" },
});
///https://stackoverflow.com/questions/46378266/how-to-make-nodejs-cassandra-driver-work-in-lambda
//for some reason you only connect once and hten you don't disconnect? weird
client.connect();

//default my house for testing purposes
async function query(placeName = "anandaHouse") {
  const rs = await client.execute("SELECT messageText, postTime FROM messages.messagedb WHERE placeName = '"+placeName+"';");
  return rs["rows"]
}

async function insertInto(messageText, postTime, placeName){
  //alright boys, time to build anti sql injection technology
  //https://stackoverflow.com/questions/31822891/how-to-build-dynamic-query-by-binding-parameters-in-node-js-sql implement in the morning
  await client.execute("INSERT INTO messages.messagedb (messageText, postTime, placeName) VALUES ('"+messageText+"', '"+postTime+"', '"+placeName+"');");
}

//get stuff for user. have conversation with alden about how to get place name
router.get('/', async function(req, res) {
    const queryInfo = await query(req.body.placeName);
    await res.json(queryInfo);
});
//
router.post('/postStuff', async function(req, res){
  insertInto(req.body.messageText, req.body.postTime, req.body.placeName);
});
///make it use /api whenever using router routes
app.use('/api', router);
app.listen(port);
//getting moving. https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
console.log('working on port ' + port);
