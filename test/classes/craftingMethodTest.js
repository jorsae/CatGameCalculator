var assert = require('assert');
var craftingMethod = require('../../src/js/classes/craftingMethod');

describe('CraftingMethod', () => {
    it('constructor: Create object with right attributes', () => {
        const method = new craftingMethod.CraftingMethod(50, 3);
        assert.equal(method.itemQuantity, 50);
        assert.equal(method.crafts, 3);
    });

    it('toString: Returns expected string', () => {
        const method = new craftingMethod.CraftingMethod(20, 3);
        assert.equal(method, "Craft: 20x, 3times");

    });
});