var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var crafting = require('../../src/js/classes/crafting');
var recipe = require('../../src/js/normal/recipes');

describe('Test for Crafting', () => {
    it('Crafting constructor', () => {
        var c = new crafting.Crafting(null);
        assert.equal(c.craftingTime, 30);
    });

    it('Crafting change craftingTime', () => {
        var c = new crafting.Crafting(null);
        assert.equal(c.craftingTime, 30);

        c.setCraftingTime(160);
        assert.equal(c.craftingTime, 160);
    });

    it('Crafting addCraftingItem one item', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        var c = new crafting.Crafting(null);
        c.addCraftingItem(item);
        
        var expected = new Map();
        expected.set(item.name, item);
        assert.deepEqual(c.craftingList, expected);
    });

    it('Crafting addCraftingItem multiple items', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        const item2 = new craftingItem.CraftingItem("craftingItem2", 50, 100, "rare", 0);

        var c = new crafting.Crafting(null);
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

        var c = new crafting.Crafting(null);
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

    it('Crafting getCraftingRequirements: 2 needles', () => {
        var recipes = recipe.getCraftingRecipes();
        var needles = recipes.get('Needles');
        needles.quantity = 2;

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem(needles);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();
        expected.set('Cotton', 12);
        expected.set('Log', 12);
        expected.set('Rock', 24);
        expected.set('String', 4);
        expected.set('Wood', 4);
        expected.set('Ribbon', 2);
        expected.set('Metal', 8);
        expected.set('Needles', 2);

        assert.deepEqual(currentCraft, expected);
    });

    it('Crafting getCraftingRequirements. Non over-lapping crafting items', () => {
        var recipes = recipe.getCraftingRecipes();
        var bronze = recipes.get('Bronze');
        var ribbon = recipes.get('Ribbon');

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem(bronze);
        c.addCraftingItem(ribbon);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('Log', 6);
        expected.set('Rock', 4);
        expected.set('String', 2);
        expected.set('Wood', 2);
        expected.set('Ribbon', 1);
        expected.set('Bronze', 1);

        assert.deepEqual(currentCraft, expected);
    });

    it('Crafting getCraftingRequirements. Over-lapping crafting items', () => {
        var recipes = recipe.getCraftingRecipes();
        var amethyst = recipes.get('Amethyst');
        var pendant = recipes.get('Pendant');

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem(amethyst);
        c.addCraftingItem(pendant);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();
        expected.set('Cotton', 48);
        expected.set('Log', 48);
        expected.set('Rock', 72);
        expected.set('Quartz', 80);
        expected.set('String', 16);
        expected.set('Wood', 16);
        expected.set('Ribbon', 8);
        expected.set('Metal', 16);
        expected.set('Needles', 4);
        expected.set('Sparkles', 2);
        expected.set('Bronze', 6);
        expected.set('Silver', 2);
        expected.set('Amethyst', 8);
        expected.set('Pendant', 1);

        assert.deepEqual(currentCraft, expected);
    });
});