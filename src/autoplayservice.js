var _ = require('underscore');
var request = require('request');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name : 'sonos-autostart'
});

exports.service = function(config) {
    var getPlayerConfig = function(name) {
        return _(config).find(function(c) {
            var players = c.players;
            return _(players).contains(name);
        });
    };

    var autoplay = function(players) {
        log.info('autoplay started', players);
        _(players).each(
            function(player) {

                if (!player.playing) {
                    log.info('Found non-playing player', player);
                    // TODO: implement grouping
                    var playerConfig = getPlayerConfig(player.name);
                    if (playerConfig.play.type == "favourite") {
                        // TODO: call the sonos api
                        var url = "http://localhost:5005/" + player.name + "/favorite/"
                                  + playerConfig.play.value;
                        log.info('call sonos api for ', playerConfig.play.value, ' url ', url);
                        request(url, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                request( "http://localhost:5005/" + player.name + "/play", function (e2, res2, body2) {
                                    log.info("Autoplay SUCCESS!") // Show the HTML for the Google homepage.
                                });
                            }
                        });
                    } else {
                        log.info('unknown type of play config', playerConfig.play);
                    }
                }
            });
    };

    return {
        autoplay : autoplay
    };

};
