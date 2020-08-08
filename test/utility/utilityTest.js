var assert = require('assert');
var utility = require('../../src/js/utility/utility');

describe('utility test', () => {
    it('intToString positive number', () => {
        var result1d = utility.intToString(0);
        assert.equal(result1d, '0');

        var result2d = utility.intToString(16);
        assert.equal(result2d, '16');

        var result4d = utility.intToString(1512);
        assert.equal(result4d, '1.5k');

        var result5d = utility.intToString(52312);
        assert.equal(result5d, '52.3k');

        var result6d = utility.intToString(103212);
        assert.equal(result6d, '103.2k');

        var result7d = utility.intToString(7299912);
        assert.equal(result7d, '7.3m');
    });

    it('intToString negative number', () => {
        var result2d = utility.intToString(-16);
        assert.equal(result2d, '-16');

        var result4d = utility.intToString(-1512);
        assert.equal(result4d, '-1.5k');

        var result5d = utility.intToString(-52312);
        assert.equal(result5d, '-52.3k');

        var result6d = utility.intToString(-103212);
        assert.equal(result6d, '-103.2k');

        var result7d = utility.intToString(-7299912);
        assert.equal(result7d, '-7.3m');
    });
});