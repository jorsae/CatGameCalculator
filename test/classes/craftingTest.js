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
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles');
        
        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Needles', 1);
        
        var expected = new Map();
        expected.set(item.name, item.quantity);
        assert.deepEqual(c.craftingList, expected);
    });

    it('Crafting addCraftingItem multiple items', () => {
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

    it('Crafting addCraftingItem multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles')
        item.quantity = 5;
        const item2 = recipes.get('Needles')
        item2.quantity = 7;
        const item3 = recipes.get('Needles')
        item3.quantity = 10;

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

    it('Crafting getCraftingRequirements: 2 needles', () => {
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

    it('Crafting getCraftingRequirements. Non over-lapping crafting items', () => {
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

    it('Crafting getCraftingRequirements. Over-lapping crafting items', () => {
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

    it('Crafting getTotalCost. Non-lapping crafting-items', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Bronze', 1);
        c.addCraftingItem('Ribbon', 1);
        var cost = c.getTotalCost();

        assert.equal(cost, 500);
    });

    it('Crafting getTotalCost. Over-lapping crafting-items', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addCraftingItem('Amethyst', 1);
        c.addCraftingItem('Pendant', 1);
        var cost = c.getTotalCost();

        assert.equal(cost, 20800);
    });

    it('Crafting getTotalCost. Assure time is calculated properly', () =>{
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