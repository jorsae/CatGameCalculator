var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var crafting = require('../../src/js/classes/crafting');

describe('Test for Crafting', () => {
    it('Crafting constructor', () => {
        var c = new crafting.Crafting();
        assert.equal(c.craftingTime, 30);
    });

    it('Crafting change craftingTime', () => {
        var c = new crafting.Crafting();
        assert.equal(c.craftingTime, 30);

        c.setCraftingTime(160);
        assert.equal(c.craftingTime, 160);
    });

    it('Crafting addCraftingItem one item', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        var c = new crafting.Crafting();
        c.addCraftingItem(item);
        
        var expected = new Map();
        expected.set(item.name, item);
        assert.deepEqual(c.craftingList, expected);
    });

    it('Crafting addCraftingItem multiple items', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        const item2 = new craftingItem.CraftingItem("craftingItem2", 50, 100, "rare", 0);

        var c = new crafting.Crafting();
        c.addCraftingItem(item);
        c.addCraftingItem(item2);

        var expected = new Map();
        expected.set(item.name, item);
        expected.set(item2.name, item2);

        assert.deepEqual(c.craftingList, expected);
    });

    it('Crafting addCraftingItem multiple items with same key', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0, null, 5);
        const item2 = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0, null, 7);
        const item3 = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0, null, 10);

        var c = new crafting.Crafting();
        c.addCraftingItem(item);
        c.addCraftingItem(item2);
        
        var expected = new Map();
        const expectedItem = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0, null, 12);
        expected.set(expectedItem.name, expectedItem);
        assert.deepEqual(c.craftingList, expected);
        
        var expected2 = new Map();
        const expectedItem2 = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0, null, 22);
        expected2.set(expectedItem2.name, expectedItem2);
        c.addCraftingItem(item3);
        assert.deepEqual(c.craftingList, expected2);
    });
});