var assert = require('assert');
var craftingMethod = require('../../src/js/classes/craftingMethod');
var craftingItem = require('../../src/js/classes/craftingItem');
var rarity = require('../../src/js/classes/rarity');
const { AssertionError } = require('assert');

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

    it('CraftingItem: getCraftingMethod basic', () => {
        // 50min to craft, needs 19 in 30minutes. Craft 19x 1times
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, rarity.Rarity.LEGENDARY, 1, null, quantity=19);
        const method = [new craftingMethod.CraftingMethod(19, 1)];
        assert.deepEqual(item.getCraftingMethod(30), method);
        
        // 2min to craft, needs 30 in 30minutes. Craft: 2x 15times
        const item2 = new craftingItem.CraftingItem("craftingItem", 2, 100, rarity.Rarity.LEGENDARY, 2, null, quantity=30);
        const method2 = [new craftingMethod.CraftingMethod(2, 15)];
        assert.deepEqual(item2.getCraftingMethod(30), method2)
    });

    it('CraftingItem: getCraftingMethod advanced', () => {
        // 3min to craft, needs 19 in 20minutes. Craft: 4x 1time, 3x 5times.
        const item = new craftingItem.CraftingItem("craftingItem", 3, 100, rarity.Rarity.LEGENDARY, 1, null, quantity=19);
        const method = [new craftingMethod.CraftingMethod(4, 1), new craftingMethod.CraftingMethod(3, 5)];
        assert.deepEqual(item.getCraftingMethod(20), method);
        
        // 7min to craft, needs 29 in 12minutes. Craft: 8x 1time, 7x 3times.
        const item2 = new craftingItem.CraftingItem("craftingItem", 7, 100, rarity.Rarity.LEGENDARY, 1, null, quantity=29);
        const method2 = [new craftingMethod.CraftingMethod(8, 1), new craftingMethod.CraftingMethod(7, 3)];
        assert.deepEqual(item2.getCraftingMethod(28), method2);
    });

    it('CraftingItem: toString', () => {
        const item = new craftingItem.CraftingItem("craftingItem2", 501, 1020, rarity.Rarity.COMMON, 0);
        assert.equal(item, "craftingItem2, 501minutes, 1020coins. Crafting Requirement: ");
    });

});