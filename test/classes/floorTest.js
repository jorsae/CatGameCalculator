var assert = require('assert');
var floor = require('../../src/js/classes/floor');

describe('Floor', () => {
    it('constructor: Create object with right attributes', () => {
        const mayhem = new floor.Floor("Mayhem", 4, null);
        assert.equal(mayhem.name, "Mayhem");
        assert.equal(mayhem.floorNumber, 4);
        assert.equal(mayhem.requirements, null);
    });

    it('toString: Returns expected string', () => {
        const testFloor = new floor.Floor("test", 10, null)
        assert.equal(testFloor, "10: test");
    });
  
});