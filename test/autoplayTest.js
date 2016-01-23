var expect = require('expect.js');
var _ = require('underscore');

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

var autoplayservice = require('../src/autoplayservice.js').service(config);

describe('autoplay should trigger playing if asked to', function() {
    var playerInfo = [
        {
            name : "Küche",
            playing : false
        }, {
            name : "Esszimmer",
            playing : true
        }, {
            name : "Wohnzimmer",
            playing : false
        }
    ];

    it('should start Wohnzimmer and Küche ', function() {

        autoplayservice.autoplay(playerInfo);
        // FIXME: mock for http
        expect(false).to.be(true);
    });

})
