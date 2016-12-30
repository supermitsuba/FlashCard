// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var csv = require('csv-parser');
var csvstream = csv({
  headers: ['question', 'answer']
})
var http = require('https');


var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/csv", function(req, res){
  var url = req.body.url
  var result = []
   http.get(url, function(response) {
      response.pipe(csvstream)
            .on('data', function(data){
              result.push(data)
            })
            .on('end', function(){
              res.end(JSON.stringify(result))
            })
   });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});