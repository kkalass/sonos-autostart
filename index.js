
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/eventcb', upload.array(), function (req, res) {
  //console.log('got body', JSON.stringify(req.body));
  
  var body = req.body;
  if (body.type === 'topology-change') {
     console.log('topology changed');
     var players = extractPlayerInfo(body.data);
     var kitchen = players['Küche'];
     var eatingroom = players['Esszimmer'];
     if (kitchen && !eatingroom) {
         ensureOnePlaying(kitchen);
     } else if (!kitchen && eatingroom) {
         ensureOnePlaying(eatingroom);
     } else if (kitchen && eatingroom) {
         ensureBothPlaying(kitchen, eatingroom);
     }
  }


  res.send('OK');
});

var ensureOnePlaying = function(player) {
    console.log('FIXME - IMPLEMENT - ensureOnePlaying', player);
}

var ensureBothPlaying = function (a, b) {
    console.log('FIXME - IMPLEMENT - ensureBothPlaying', a, b);
}

var extractPlayerInfo = function (data) {
    console.log('FIXME - IMPLEMENT - extractPlayerInfo', JSON.stringify(data));
    return {};
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
