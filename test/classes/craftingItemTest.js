var assert = require('assert');
var craftingMethod = require('../../src/js/classes/craftingMethod');
var craftingItem = require('../../src/js/classes/craftingItem');
var rarity = require('../../src/js/classes/rarity')

describe('Test for CraftingItem', () => {
    it('CraftingItem variables', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.COMMON, 0);
        assert.equal(item.name, "craftingItem");
        assert.equal(item.craftingTime, 50);
        assert.equal(item.baseCost, 100);
        assert.equal(item.rarity, rarity.Rarity.COMMON);
        assert.equal(item.sortingOrder, 0);
        assert.equal(item.quantity, 1);
        assert.equal(item.craftingRequirements, null);
    });

    it('CraftingItem getRarityValue', () => {
        const hidden = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.HIDDEN, 0);
        assert.equal(hidden.getRarityValue(), 0);

        const raw = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.RAW, 0);
        assert.equal(raw.getRarityValue(), 1);

        const common = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.COMMON, 0);
        assert.equal(common.getRarityValue(), 2);

        const def = new craftingItem.CraftingItem("craftingItem", 50, 100, null, 0);
        assert.equal(def.getRarityValue(), 2);

        const rare = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.RARE, 0);
        assert.equal(rare.getRarityValue(), 3);

        const epic = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.EPIC, 0);
        assert.equal(epic.getRarityValue(), 4);

        const legendary = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.LEGENDARY, 0);
        assert.equal(legendary.getRarityValue(), 5);
    });

    it('CraftingItem: getCraftingMethod', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.LEGENDARY, 0);
        const method = [new craftingMethod.CraftingMethod(1, 1)];
        assert.deepEqual(item.getCraftingMethod(30), method);
        // TODO: Write more tests for getCraftingMethod
    });

    it('CraftingItem: toString', () => {
        const item = new craftingItem.CraftingItem("craftingItem2", 501, 1020, rarity.Rarity.COMMON, 0);
        assert.equal(item, "craftingItem2, 501minutes, 1020coins. Crafting Requirement: ");
    });

});