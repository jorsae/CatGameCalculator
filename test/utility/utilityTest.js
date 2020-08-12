var assert = require('assert');
var utility = require('../../src/js/utility/utility');

describe('Utility', () => {
    it('intToString: Tests correct truncation for positive numbers', () => {
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

    it('intToString: Tests correct truncation for negative numbers', () => {
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

    it('convertMinutes: Tests convert minutes to hour(s)', () => {
        var hour = utility.convertMinutes(60);
        var hourExpected = "1 hour";
        assert.equal(hour, hourExpected)

        var hours = utility.convertMinutes(180);
        var hoursExpected = "3 hours";
        assert.equal(hours, hoursExpected);

        var hoursWithMin = utility.convertMinutes(259);
        var hoursWithMinExpected = "4 hours, 19 min";
        assert.equal(hoursWithMin, hoursWithMinExpected);
    });

    it('convertMinutes: Tests convert minutes to day(s)', () => {
        var day = utility.convertMinutes(1440);
        var dayExpected = "1 day";
        assert.equal(day, dayExpected);

        var days = utility.convertMinutes(4320);
        var daysExpected = "3 days";
        assert.equal(days, daysExpected);

        var daysWithHours = utility.convertMinutes(2400);
        var daysWithHoursExpected = "1 day, 16 hours";
        assert.equal(daysWithHours, daysWithHoursExpected);
        
        var daysWithHoursMin = utility.convertMinutes(3500);
        var daysWithHoursMinExpected = "2 days, 10 hours, 20 min";
        assert.equal(daysWithHoursMin, daysWithHoursMinExpected);
    });
});