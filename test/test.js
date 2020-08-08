var assert = require('assert');
var classes = require('../src/js/classes/floor');

describe('Test for Floor', () => {
    it('Floor variables', () => {
        const mayhem = new classes.Floor("Mayhem", 4, null);
        assert.equal(mayhem.name, "Mayhem");
        assert.equal(mayhem.floorNumber, 4);
        assert.equal(mayhem.requirements, null);
    });

    it('Floor: toString', () => {
        const testFloor = new classes.Floor("test", 10, null)
        assert.equal(testFloor, "10: test");
    });
  
});