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
        _(players).each(function(player) {

            if (!player.playing) {
                log.info('Found non-playing player', player);

                var playerConfig = getPlayerConfig(player.name);
                if (playerConfig.play.type == "favourite" || playerConfig.play.type == "favorite") {
                    // Use preset api for grouping and starting
                    var preset = {
                        "players" : _(playerConfig.players).map(function(player) {
                            return {
                                "roomName" : player
                            }
                        }),
                        "favorite" : playerConfig.play.value
                    };

                    var url = "http://localhost:5005/preset/" + JSON.stringify(preset);
                    log.info('call sonos api for ', playerConfig.play.value, ' url ', url);
                    request(url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            log.info("Applied preset!") // Show the HTML for the Google homepage.
                        }
                    });
                } else {
                    log.info('unknown type of play config', playerConfig.play);
                }
            }
        });
    };

    var play = function(player, playerConfig) {
        // call the sonos api
        var url = "http://localhost:5005/" + player.name + "/favorite/" + playerConfig.play.value;
        log.info('call sonos api for ', playerConfig.play.value, ' url ', url);
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                request(
                    "http://localhost:5005/" + player.name + "/play",
                    function(e2, res2, body2) {
                        log.info("Autoplay SUCCESS!") // Show the HTML for the Google homepage.
                    });
            }
        });

    }

    return {
        autoplay : autoplay
    };

};
