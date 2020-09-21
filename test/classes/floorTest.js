var assert = require('assert');
var floor = require('../../src/js/classes/floor');

describe('Floor', () => {
    it('constructor: Create object with right attributes', () => {
        const mayhem = new floor.Floor("Mayhem", 4, null);
        assert.strictEqual(mayhem.name, "Mayhem");
        assert.strictEqual(mayhem.floorNumber, 4);
        assert.strictEqual(mayhem.requirements, null);
    });

    it('toString: Returns expected string', () => {
        const testFloor = new floor.Floor("test", 10, null)
        assert.strictEqual(testFloor.toString(), "10: test");
    });
  
});