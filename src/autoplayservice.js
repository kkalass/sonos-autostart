
var config = [{
	players: ["Küche", "Esszimmer"],
	play: {
		type: "favourite",
		value: "NDR 2"
	}
    }, {
        players: ["Wohnzimmer"],
	play: {
		type: "favourite",
		value: "NDR 2"
	}
    }];


var getPlayerConfig: function (name) {
};


exports.autoplay = function() {
     for (player in players) {

         if (!player.isPlaying) {
	     console.log('Found non-playing player', player);
	     // TODO: implement grouping
	     var playerConfig = autoplayConfig.getPlayerConfig( player.name );
	     if (playerConfig.play.type == "favourite") {
	         // TODO: call the sonos api
		 console.log('Implement me: call sonos api for ', playerConfig.play.value);
	     } else {
		 console.info('unknown type of play config', playerConfig.play.type);
	     }
	 }
     }
};
