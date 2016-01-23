var expect = require('expect.js');
var topologyChangeParser = require('../src/topologyChangeParser.js');
var _ = require('underscore');

var fs = require('fs');

describe('parse topology change', function() {
    var testInput1 = JSON.parse(fs.readFileSync('test/topology-change.json', 'utf8'));
    var playerInfo = topologyChangeParser.parsePlayerInfo(testInput1);

    it('should have three Players ', function() {
        expect(playerInfo.length).to.equal(3);
    });

    it('should have Kitchen as playing', function() {
        var player = _(playerInfo).findWhere({
            name : 'Küche'
        });
        expect(player.playing).to.be(false);
    });

    it('should have Esszimmer as playing', function() {
        var player = _(playerInfo).findWhere({
            name : 'Esszimmer'
        });
        expect(player.playing).to.be(true);
    });

    it('should have Wohnzimmer as playing', function() {
        var player = _(playerInfo).findWhere({
            name : 'Wohnzimmer'
        });
        expect(player.playing).to.be(false);
    });
})
