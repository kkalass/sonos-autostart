var _ = require('underscore');
var request = require('request');

exports.service = function(config) {
    var getPlayerConfig = function(name) {
        return _(config).find(function(c) {
            var players = c.players;
            return _(players).contains(name);
        });
    };

    return {
        autoplay : function(players) {
            console.log('autoplay started', players);
            _(players).each(
                function(player) {

                    if (!player.playing) {
                        console.log('Found non-playing player', player);
                        // TODO: implement grouping
                        var playerConfig = getPlayerConfig(player.name);
                        if (playerConfig.play.type == "favourite") {
                            // TODO: call the sonos api
                            var url = "http://localhost:5005/" + player.name + "/favorite/"
                                      + playerConfig.play.value;
                            console.log(
                                'call sonos api for ',
                                playerConfig.play.value,
                                ' url ',
                                url);
                            request(url, function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log("Autoplay SUCCESS!") // Show the HTML for the Google homepage.
                                }
                            })
                        } else {
                            console.info('unknown type of play config', playerConfig.play.type);
                        }
                    }
                });
        }
    };

};
