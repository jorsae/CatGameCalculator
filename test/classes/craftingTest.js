var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var crafting = require('../../src/js/classes/crafting');
var recipe = require('../../src/js/normal/recipes');

describe('Crafting', () => {
    it('constructor: Create object with right attributes', () => {
        var c = new crafting.Crafting(null);
        assert.equal(c.craftingTime, 30);
        assert.equal(c.craftingRecipes, null);
        assert.deepEqual(c.craftingList, new Map());
        assert.deepEqual(c.currentCraft, new Map());
    });

    it('setCraftingTime: Can set new crafting time', () => {
        var c = new crafting.Crafting(null);
        assert.equal(c.craftingTime, 30);

        c.setCraftingTime(160);
        assert.equal(c.craftingTime, 160);
    });

    it('addCraftingItem: Adding invalid crafting item', () => {
        var recipes = recipe.getCraftingRecipes();
        
        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Test', 5);
        
        var expected = new Map();
        assert.deepEqual(c.craftingList, expected);
    });

    it('addCraftingItem: Adding one item', () => {
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles');
        
        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Needles', 1);
        
        var expected = new Map();
        expected.set(item.name, item.quantity);
        assert.deepEqual(c.craftingList, expected);
    });

    it('addCraftingItem: Adding multiple items', () => {
        var recipes = recipe.getCraftingRecipes();

        const item = recipes.get('Needles');
        const item2 = recipes.get('Artifact');

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Needles', 1);
        c.addCraftingItem('Artifact', 1);

        var expected = new Map();
        expected.set(item.name, item.quantity);
        expected.set(item2.name, item2.quantity);

        assert.deepEqual(c.craftingList, expected);
    });

    it('addCraftingItem: Adding multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Needles', 5);
        c.addCraftingItem('Needles', 7);
        
        const expectedItem = recipes.get('Needles');
        expectedItem.quantity = 12;
        var expected = new Map();
        expected.set(expectedItem.name, expectedItem.quantity);
        assert.deepEqual(c.craftingList, expected);
        
        c.addCraftingItem('Needles', 10);

        var expected2 = new Map();
        const expectedItem2 = recipes.get('Needles');
        expectedItem2.quantity = 22;
        expected2.set(expectedItem2.name, expectedItem2.quantity);
        assert.deepEqual(c.craftingList, expected2);
    });

    it('setCraftingItem: Adding one item', () => {
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles');
        
        var c = new crafting.Crafting(recipes);
        c.setCraftingItem('Needles', 1);
        
        var expected = new Map();
        expected.set(item.name, item.quantity);
        assert.deepEqual(c.craftingList, expected);
    });

    it('setCraftingItem: Adding multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();

        const item = recipes.get('Needles');
        item.quantity = 4;

        var c = new crafting.Crafting(recipes);
        c.setCraftingItem('Needles', 1);
        c.setCraftingItem('Needles', 4);

        var expected = new Map();
        expected.set(item.name, item.quantity);

        assert.deepEqual(c.craftingList, expected);
    });

    it('getCraftingRequirements: Get crafting recipe for item with quantity higher than 1', () => {
        var recipes = recipe.getCraftingRecipes();
        var needles = recipes.get('Needles');
        needles.quantity = 2;

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Needles', 2);
        
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

    it('getCraftingRequirements: Adding crafting items with no overlapping requirements', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Bronze', 1);
        c.addCraftingItem('Ribbon', 1);
        
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

    it('getCraftingRequirements: Adding multiple crafting items with over-lapping requirements', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Amethyst', 1);
        c.addCraftingItem('Pendant', 1);
        
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

    it('getTotalCost: Get costs for multiple items with no overlapping requirements', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Bronze', 1);
        c.addCraftingItem('Ribbon', 1);
        var cost = c.getTotalCost();

        assert.equal(cost, 500);
    });

    it('getTotalCost: Get costs for multiple items with overlapping requirements', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Amethyst', 1);
        c.addCraftingItem('Pendant', 1);
        var cost = c.getTotalCost();

        assert.equal(cost, 20800);
    });

    it('getTotalCost: Assure time is taken into account properly when calculating cost', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Artifact', 5);
        c.addCraftingItem('Water', 10);
        c.addCraftingItem('Needles', 3);
        c.setCraftingTime(100);
        
        var cost = c.getTotalCost();
        assert.equal(cost, 11943550);

        c.setCraftingTime(4000);
        var cost2 = c.getTotalCost();
        assert.equal(cost2, 797400);
    });
});