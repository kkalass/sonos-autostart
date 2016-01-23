var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended : true
})); // for parsing application/x-www-form-urlencoded

var config = [
    {
        players : [
            "Küche", "Esszimmer"
        ],
        play : {
            type : "favourite",
            value : "NDR 2"
        }
    }, {
        players : [
            "Wohnzimmer"
        ],
        play : {
            type : "favourite",
            value : "NDR 2"
        }
    }
];
var topologyChangeParser = require('./src/topologyChangeParser.js');
var autoplayservice = require('./src/autoplayservice.js').service(config);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/eventcb', upload.array(), function(req, res) {
    // console.log('got body', JSON.stringify(req.body));

    var body = req.body;
    if (body.type === 'topology-change') {
        console.log('topology changed');
        var players = topologyChangeParser.parsePlayerInfo(body.data);
        autoplayservice.autoplay(players);
    }

    res.send('OK');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
