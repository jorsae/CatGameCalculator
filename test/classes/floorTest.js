var assert = require('assert');
var floor = require('../../src/js/classes/floor');

describe('Floor', () => {
    it('constructor: Create object with right attributes', () => {
        const mayhem = new floor.Floor("Mayhem", 4, null);
        assert(mayhem.name === "Mayhem");
        assert(mayhem.floorNumber === 4);
        assert(mayhem.requirements === null);
    });

    it('toString: Returns expected string', () => {
        const testFloor = new floor.Floor("test", 10, null)
        assert(testFloor.toString() === "10: test");
    });
  
});