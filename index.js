
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
  console.log('got body', req.body);
  console.log('url', req.url, req.originalUrl);  
  console.log('params', req.params);
  console.log('path', req.path);
  console.log('query', req.query);
  res.send('OK');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
