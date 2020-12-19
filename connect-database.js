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

async function query(placeName = "anandaHouse") {
  const client = new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-bottledmessage.zip",
    },
    credentials: { username: "passthelad", password: "CoolKid56" },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT messageText, postTime FROM messages.messagedb WHERE placeName = '"+placeName+"';");
  console.log(rs["rows"])
  for (row of rs["rows"]){
    console.log(row["messagetext"]+" posted on "+(row["posttime"].getMonth()+1)+"/"+row["posttime"].getDate());
  }
  await client.shutdown();
}

async function insertInto(messageText, postTime, placeName){
  const client = new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-bottledmessage.zip",
    },
    credentials: { username: "passthelad", password: "CoolKid56" },
  });

  await client.connect();
  await client.execute("INSERT INTO messagedb (messageText, postTime, placeName) VALUES ('"+messageText+"', '"+postTime+"', '"+placeName+"');");
  await client.shutdown();
}

// Run the async function
query();
