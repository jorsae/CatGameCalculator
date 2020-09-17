var assert = require('assert');
var craftingMethod = require('../../src/js/classes/craftingMethod');
var craftingItem = require('../../src/js/classes/craftingItem');
var craftingRequirement = require('../../src/js/classes/craftingRequirement');
var rarity = require('../../src/js/classes/rarity');
var eventRecipe = require('../../src/js/event/recipes');

describe('CraftingItem', () => {
    it('constructor: Create object with right attributes', () => {
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 50, rarity.Rarity.COMMON, 0);
        assert(item.name === "craftingItem");
        assert(item.category === "category");
        assert(item.baseCost === 100);
        assert(item.craftingTime === 50);
        assert(item.rarity === rarity.Rarity.COMMON);
        assert(item.sortingOrder === 0);
        assert(item.quantity === 1);
        assert(item.craftingRequirements === null);
    });

    it('getRarityValue: Testing rarity value for all possible rarities', () => {
        const hidden = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.HIDDEN, 0);
        assert(hidden.getRarityValue() === 0);

        const raw = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.RAW, 0);
        assert(raw.getRarityValue() === 1);

        const common = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.COMMON, 0);
        assert(common.getRarityValue() === 2);

        const def = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, null, 0);
        assert(def.getRarityValue() === 2);

        const rare = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.RARE, 0);
        assert(rare.getRarityValue() === 3);

        const epic = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.EPIC, 0);
        assert(epic.getRarityValue() === 4);

        const legendary = new craftingItem.CraftingItem("craftingItem", "category", 50, 100, rarity.Rarity.LEGENDARY, 0);
        assert(legendary.getRarityValue() === 5);
    });

    it('getCraftingMethod: Crafting method with only 1 step', () => {
        // 50min to craft, needs 19 in 30minutes. Craft 19x 1times
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 50, rarity.Rarity.LEGENDARY, 1, null, quantity=19);
        const method = [new craftingMethod.CraftingMethod(19, 1)];
        assert.deepStrictEqual(item.getCraftingMethod(30), method);
        
        // 2min to craft, needs 30 in 30minutes. Craft: 2x 15times
        const item2 = new craftingItem.CraftingItem("craftingItem", "category", 100, 2, rarity.Rarity.LEGENDARY, 2, null, quantity=30);
        const method2 = [new craftingMethod.CraftingMethod(2, 15)];
        assert.deepStrictEqual(item2.getCraftingMethod(30), method2)
    });

    it('getCraftingMethod: Crafting method with 2 steps', () => {
        // 3min to craft, needs 19 in 20minutes. Craft: 4x 1time, 3x 5times.
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 3, rarity.Rarity.LEGENDARY, 1, null, quantity=19);
        const method = [new craftingMethod.CraftingMethod(4, 1), new craftingMethod.CraftingMethod(3, 5)];
        assert.deepStrictEqual(item.getCraftingMethod(20), method);
        
        // 7min to craft, needs 29 in 12minutes. Craft: 8x 1time, 7x 3times.
        const item2 = new craftingItem.CraftingItem("craftingItem", "category", 100, 7, rarity.Rarity.LEGENDARY, 1, null, quantity=29);
        const method2 = [new craftingMethod.CraftingMethod(8, 1), new craftingMethod.CraftingMethod(7, 3)];
        assert.deepStrictEqual(item2.getCraftingMethod(28), method2);
    });

    it('getCraftingMethod: Crafting method with quantity less than max', () => {
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 3, rarity.Rarity.LEGENDARY, 1, null, quantity=2);
        const method = [new craftingMethod.CraftingMethod(2, 1)];
        assert.deepStrictEqual(item.getCraftingMethod(1e6, 3), method);
    });

    it('getCraftingMethod: Crafting method with max', () => {
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 3, rarity.Rarity.LEGENDARY, 1, null, quantity=19);
        const method = [new craftingMethod.CraftingMethod(3, 6), new craftingMethod.CraftingMethod(1, 1)];
        assert.deepStrictEqual(item.getCraftingMethod(1e6, 3), method);
    });

    it('getCraftingMethod: Crafting method with quantity a multiple of max', () => {
        const item = new craftingItem.CraftingItem("craftingItem", "category", 100, 3, rarity.Rarity.LEGENDARY, 1, null, quantity=18);
        const method = [new craftingMethod.CraftingMethod(3, 6)];
        assert.deepStrictEqual(item.getCraftingMethod(1e6, 3), method);
    });

    it('toString: Without crafting requirements', () => {
        const item = new craftingItem.CraftingItem("craftingItem2", "category", 1020, 501, rarity.Rarity.COMMON, 0);
        assert(item.toString() === "[category/common] craftingItem2(1): 1020coins, 501min. Crafting Requirement: ");
    });
    
    it('toString: With 1 crafting requirement', () => {
        const item2 = new craftingItem.CraftingItem("reqItem", "low category", 50, 15, rarity.Rarity.COMMON, 0);
        const itemReq = [new craftingRequirement.CraftingRequirement(item2, 3)];
        const item = new craftingItem.CraftingItem("craftingItem2", "category", 1020, 501, rarity.Rarity.COMMON, 0, itemReq);
        assert(item.toString() === "[category/common] craftingItem2(1): 1020coins, 501min. Crafting Requirement: reqItem: 3");
    });

    it('toString: Item has 3quantity and with 1 crafting requirement', () => {
        const item2 = new craftingItem.CraftingItem("reqItem", "low category", 50, 15, rarity.Rarity.COMMON, 0);
        const itemReq = [new craftingRequirement.CraftingRequirement(item2, 3)];
        const item = new craftingItem.CraftingItem("craftingItem2", "category", 1020, 501, rarity.Rarity.COMMON, 0, itemReq, 3);
        assert(item.toString() === "[category/common] craftingItem2(3): 1020coins, 501min. Crafting Requirement: reqItem: 9");
    });

    it('toString: With multiple crafting requirements', () => {
        const itemReq1 = new craftingItem.CraftingItem("reqItem1", "low category1", 100, 15, rarity.Rarity.COMMON, 0);
        const itemReq2 = new craftingItem.CraftingItem("reqItem2", "low category2", 50, 15, rarity.Rarity.COMMON, 0);
        const itemReq = [new craftingRequirement.CraftingRequirement(itemReq1, 3), new craftingRequirement.CraftingRequirement(itemReq2, 1)];
        const item = new craftingItem.CraftingItem("craftingItem2", "category", 1020, 501, rarity.Rarity.COMMON, 0, itemReq);
        assert(item.toString() === "[category/common] craftingItem2(1): 1020coins, 501min. Crafting Requirement: reqItem1: 3, reqItem2: 1");
    });

    it('getCost: Assure boost is NOT affecting "3 Stars"', () =>{
        var recipes = eventRecipe.getCraftingRecipes();

        var stars = recipes.get('3 Stars');
        stars.quantity = 4;

        assert(stars.getCost(30, 252) === 1200);
    });
});