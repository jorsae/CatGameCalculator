var assert = require('assert');
var craftingMethod = require('../../src/js/classes/craftingMethod');

describe('CraftingMethod', () => {
    it('constructor: Create object with right attributes', () => {
        const method = new craftingMethod.CraftingMethod(50, 3);
        assert.strictEqual(method.itemQuantity, 50);
        assert.strictEqual(method.crafts, 3);
    });

    it('toString: Returns expected string', () => {
        const method = new craftingMethod.CraftingMethod(20, 3);
        assert.strictEqual(method.toString(), "20x, 3times");
    });

    it('toString: Returns correct plural of times', () => {
        const method = new craftingMethod.CraftingMethod(3, 1);
        assert.strictEqual(method.toString(), "3x, 1time");
    });
});