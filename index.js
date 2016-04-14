var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var request = require('request');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name : 'sonos-autostart'
});

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
            value : "NDR 2 Hamburg"
        }
    }, {
        players : [
            "Wohnzimmer"
        ],
        play : {
            type : "favourite",
            value : "NDR 2 Hamburg"
        }
    }
];
var topologyChangeParser = require('./src/topologyChangeParser.js');
var autoplayservice = require('./src/autoplayservice.js').service(config);

var autoplayTrigger = function(cb) {
    var url = "http://localhost:5005/zones";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            log.info(" Autoplay trigger!") // Show the HTML for the Google homepage.

            var players = topologyChangeParser.parseTopologyPlayerInfo(JSON.parse(body));
            log.info("Found players", players);
            autoplayservice.autoplay(players);
            if (cb) {
                cb();
            }
        }
    })
}

app.get('/', function(req, res) {
    //autoplayTrigger(function() {
    //    res.send('Triggered!');
    //});
});

app.post('/eventcb', upload.array(), function(req, res) {
    // console.log('got body', JSON.stringify(req.body));

    var body = req.body;
    // console.log('got event ', body.type);
    if (body.type === 'topology-change') {
        log.info('topology changed');
        var players = topologyChangeParser.parseTopologyPlayerInfo(body.data);
        log.info('topology change found players', players);
        autoplayservice.autoplay(players);
    }

    res.send('OK');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    log.info('Example app listening at http://%s:%s', host, port);
    //autoplayTrigger();
    // check every 5 minutes, in case the topology change notification does not arrive
    //setInterval(autoplayTrigger, 5 * 60 * 1000);
});
