const { Client } = require("cassandra-driver");
//ofc express
const express = require('express');
var cors = require('cors')
const app = express();
//need this in order to make req work right
var bodyParser = require('body-parser');

app.use(cors())
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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


app.get('/_ah/warmup', (req, res) => {
    client.connect();
});



//default my house for testing purposes
async function query(placeName = "anandaHouse") {
  const rs = await client.execute("SELECT messageText, messageType, postTime FROM messages.messagedb WHERE placeName = '"+placeName+"';");
  return rs["rows"]
}

async function insertInto(messageText, postTime, messageType, placeName){
  //alright boys, time to build anti sql injection technology
  //https://stackoverflow.com/questions/31822891/how-to-build-dynamic-query-by-binding-parameters-in-node-js-sql implement in the morning
  console.log("insertion")
  await client.execute("INSERT INTO messages.messagedb (messageText, postTime, messageType, placeName) VALUES ('"+messageText+"', "+postTime+", '"+messageType+"', '"+placeName+"');");
    //"INSERT INTO messages.messagedb (messageText, postTime, messageType, placeName) VALUES ('"+messageText+"', '"+postTime+"', '"+messageType+"','"+placeName+"');");
}

//get stuff for user. have conversation with alden about how to get place name
router.get('/query/:placeName', cors(corsOptions), async function(req, res) {
    const queryInfo = await query(req.params.placeName);
    await res.json(queryInfo);
});
//
router.post('/postStuff', cors(corsOptions), async function(req, res){
  //use await in front of insertInto???
  insertInto(req.body.messageText, req.body.postTime, req.body.placeName);
  await res.json({worked:"yes"});
});
///make it use /api whenever using router routes
app.use('/api', router);
app.listen(port);

//getting moving. https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
console.log('working on port ' + port);
