const { Client } = require("cassandra-driver");
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();

const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-bottledmessage.zip",
  },
  credentials: { username: "passthelad", password: "CoolKid56" },
});
client.connect();
async function query(placeName = "anandaHouse") {


  // Execute a query
  const rs = await client.execute("SELECT messageText, postTime FROM messages.messagedb WHERE placeName = '"+placeName+"';");
  for (row of rs["rows"]){
    console.log(row["messagetext"]+" posted on "+(row["posttime"].getMonth()+1)+"/"+row["posttime"].getDate());
  }
  return rs["rows"]
}

async function insertInto(messageText, postTime, placeName){

  await client.execute("INSERT INTO messages.messagedb (messageText, postTime, placeName) VALUES ('"+messageText+"', '"+postTime+"', '"+placeName+"');");
}

//get stuff for user. have conversation with alden about how to insert information
router.get('/', async function(req, res) {
    const queryInfo = await query();
    await res.json(queryInfo);
});

//insertInto("My name is Ananda and I like sandwiches", "2020-12-18 1:33", "anandaHouse")
app.use('/api', router);
app.listen(port);
insertInto("hi", '2020-12-18 12:33', "anandaHouse")
//getting moving. https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
console.log('working on port ' + port);
