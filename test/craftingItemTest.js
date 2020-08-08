var assert = require('assert');
var craftingItem = require('../src/js/classes/craftingItem');

describe('Test for CraftingItem', () => {
    it('CraftingItem variables', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        assert.equal(item.name, "craftingItem");
        assert.equal(item.craftingTime, 50);
        assert.equal(item.baseCost, 100);
        assert.equal(item.rarity, "rare");
        assert.equal(item.sortingOrder, 0);
        assert.equal(item.craftingRequirements, null);
    });

    it('CraftingItem: toString', () => {
        const item = new craftingItem.CraftingItem("craftingItem2", 501, 1020, "rare", 0);
        assert.equal(item, "craftingItem2, 501minutes, 1020coins. Crafting Requirement: ");

    });

});