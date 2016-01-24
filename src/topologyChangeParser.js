var _ = require('underscore');

var parseTopologyPlayerInfo = function(data) {
    var zoneArray = data.data;
    // TODO: take members into consideration, not only coordinators
    var zones = _(zoneArray).map(function(zoneData) {
        var coordinator = zoneData.coordinator || {};
        var state = coordinator.state || {};
        return {
            name : coordinator.roomName,
            playing : state.playerState === 'PLAYING'
        }
    });

    return zones;
}

exports.parseTopologyPlayerInfo = parseTopologyPlayerInfo;
