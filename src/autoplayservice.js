var _ = require('underscore');

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
            _(players).each(function(player) {

                if (!player.playing) {
                    console.log('Found non-playing player', player);
                    // TODO: implement grouping
                    var playerConfig = getPlayerConfig(player.name);
                    if (playerConfig.play.type == "favourite") {
                        // TODO: call the sonos api
                        console.log('Implement me: call sonos api for ', playerConfig.play.value);
                    } else {
                        console.info('unknown type of play config', playerConfig.play.type);
                    }
                }
            });
        }
    };

};
