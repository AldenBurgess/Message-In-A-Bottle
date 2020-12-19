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

app.listen(port);
