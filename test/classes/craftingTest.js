var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var crafting = require('../../src/js/classes/crafting');
var recipe = require('../../src/js/normal/recipes');

describe('Crafting', () => {
    it('constructor: Create object with right attributes', () => {
        var c = new crafting.Crafting(null);
        assert.strictEqual(c.craftingTime, 30);
        assert.strictEqual(c.craftingRecipes, null);
        assert.deepStrictEqual(c.craftingList, new Map());
        assert.deepStrictEqual(c.currentCraft, new Map());
    });

    it('setCraftingTime: Can set new crafting time', () => {
        var c = new crafting.Crafting(null);
        assert.strictEqual(c.craftingTime, 30);

        c.setCraftingTime(160);
        assert.strictEqual(c.craftingTime, 160);
    });

    it('addItemToCrafting: Adding invalid crafting item', () => {
        var recipes = recipe.getCraftingRecipes();
        
        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Test', 5);
        
        var expected = new Map();
        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('addItemToCrafting: Adding one item', () => {
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles');
        
        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 1);
        
        var expected = new Map();
        expected.set(item.name, item.quantity);
        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('addItemToCrafting: Adding multiple items', () => {
        var recipes = recipe.getCraftingRecipes();

        const item = recipes.get('Needles');
        const item2 = recipes.get('Artifact');

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 1);
        c.addItemToCrafting('Artifact', 1);

        var expected = new Map();
        expected.set(item.name, item.quantity);
        expected.set(item2.name, item2.quantity);

        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('addItemToCrafting: Adding multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 5);
        c.addItemToCrafting('Needles', 7);
        
        const expectedItem = recipes.get('Needles');
        expectedItem.quantity = 12;
        var expected = new Map();
        expected.set(expectedItem.name, expectedItem.quantity);
        assert.deepStrictEqual(c.craftingList, expected);
        
        c.addItemToCrafting('Needles', 10);

        var expected2 = new Map();
        const expectedItem2 = recipes.get('Needles');
        expectedItem2.quantity = 22;
        expected2.set(expectedItem2.name, expectedItem2.quantity);
        assert.deepStrictEqual(c.craftingList, expected2);
    });

    it('setItemToCrafting: Adding one item', () => {
        var recipes = recipe.getCraftingRecipes();
        const item = recipes.get('Needles');
        
        var c = new crafting.Crafting(recipes);
        c.setItemToCrafting('Needles', 1);
        
        var expected = new Map();
        expected.set(item.name, item.quantity);
        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('setItemToCrafting: Adding multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();

        const item = recipes.get('Needles');
        item.quantity = 4;

        var c = new crafting.Crafting(recipes);
        c.setItemToCrafting('Needles', 1);
        c.setItemToCrafting('Needles', 4);

        var expected = new Map();
        expected.set(item.name, item.quantity);

        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('setItemToCrafting: Adding one item, then setting it to 0, removes the item', () => {
        var recipes = recipe.getCraftingRecipes();
        
        var c = new crafting.Crafting(recipes);
        c.setItemToCrafting('Needles', 1);
        c.setItemToCrafting('Needles', 0);
        
        var expected = new Map();
        assert.deepStrictEqual(c.craftingList, expected);
    });

    it('addItemToInventory: Adding multiple items with same key', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToInventory('Needles', 5);
        c.addItemToInventory('Needles', 7);
        
        const expectedItem = recipes.get('Needles');
        expectedItem.quantity = 12;
        var expected = new Map();
        expected.set(expectedItem.name, expectedItem.quantity);
        assert.deepStrictEqual(c.inventory, expected);
        
        c.addItemToInventory('Needles', 10);

        var expected2 = new Map();
        const expectedItem2 = recipes.get('Needles');
        expectedItem2.quantity = 22;
        expected2.set(expectedItem2.name, expectedItem2.quantity);
        assert.deepStrictEqual(c.inventory, expected2);
    });

    it('setItemToInventory: Adding one item, then setting it to 0, removes the item', () => {
        var recipes = recipe.getCraftingRecipes();
        
        var c = new crafting.Crafting(recipes);
        c.setItemToInventory('Needles', 1);
        c.setItemToInventory('Needles', 0);
        
        var expected = new Map();
        assert.deepStrictEqual(c.inventory, expected);
    });

    it('getCraftingRequirements: Get crafting recipe for item with quantity higher than 1', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 2);
        
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

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Adding crafting items with no overlapping requirements', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Bronze', 1);
        c.addItemToCrafting('Ribbon', 1);
        
        var currentCraft = c.getCraftingRequirements();

        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('Log', 6);
        expected.set('Rock', 4);
        expected.set('String', 2);
        expected.set('Wood', 2);
        expected.set('Ribbon', 1);
        expected.set('Bronze', 1);

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Adding multiple crafting items with over-lapping requirements', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Amethyst', 1);
        c.addItemToCrafting('Pendant', 1);
        
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

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Get crafting recipe for 2items, but have 1item in inventory', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 2);
        c.addItemToInventory('Needles', 1);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('Log', 6);
        expected.set('Rock', 12);
        expected.set('String', 2);
        expected.set('Wood', 2);
        expected.set('Ribbon', 1);
        expected.set('Metal', 4);
        expected.set('Needles', 1);

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Get crafting recipe for 2items, but have more in inventory', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 2);
        c.addItemToInventory('Needles', 3);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Make sure items with negative quantity because of inventory, does not show up', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Ribbon', 1);
        c.addItemToInventory('Wood', 9999);
        
        var currentCraft = c.getCraftingRequirements();
        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('String', 2);
        expected.set('Ribbon', 1);

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getCraftingRequirements: Make sure inventory is ignored for crafting requirements', () => {
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Ribbon', 1);
        c.addItemToInventory('Ribbon', 1);
        
        var currentCraft = c.getCraftingRequirements(false);
        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('Log', 6);
        expected.set('String', 2);
        expected.set('Wood', 2);
        expected.set('Ribbon', 1);

        assert.deepStrictEqual(currentCraft, expected);
    });

    it('getTotalCost: Get costs for multiple items with no overlapping requirements', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Bronze', 1);
        c.addItemToCrafting('Ribbon', 1);
        var cost = c.getTotalCost();

        assert.strictEqual(cost, 500);
    });

    it('getTotalCost: Get costs for multiple items with overlapping requirements', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Amethyst', 1);
        c.addItemToCrafting('Pendant', 1);
        var cost = c.getTotalCost();

        assert.strictEqual(cost, 20800);
    });

    it('getTotalCost: Assure boost is calculated correctly with items', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Amethyst', 1);
        c.addItemToCrafting('Pendant', 1);
        var cost = c.getTotalCost(boost=1.5);

        assert.strictEqual(cost, 13870);
    });

    it('getTotalCost: Assure boost is calculated correctly with lots of items', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Artifact', 18);
        c.addItemToCrafting('Elementstone', 5);
        c.setCraftingTime(3600);
        var cost = c.getTotalCost(boost=1.5);

        assert.strictEqual(cost, 4315637);
    });

    it('getTotalCost: Assure time is taken into account properly when calculating cost', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Artifact', 5);
        c.addItemToCrafting('Water', 10);
        c.addItemToCrafting('Needles', 3);
        c.setCraftingTime(100);
        
        var cost = c.getTotalCost();
        assert.strictEqual(cost, 11943550);

        c.setCraftingTime(4000);
        var cost2 = c.getTotalCost();
        assert.strictEqual(cost2, 797400);
    });

    it('getTotalCost: Get costs for multiple items while having them in inventory', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Amethyst', 1);
        c.addItemToCrafting('Pendant', 1);
        
        c.addItemToInventory('Amethyst', 1);
        c.addItemToInventory('Pendant', 1);

        var cost = c.getTotalCost();

        assert.strictEqual(cost, 0);
    });

    it('getTotalCost: Get costs for multiple items while having underlying items in inventory', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 1);
        
        c.addItemToInventory('Metal', 4);

        var cost = c.getTotalCost();

        assert.strictEqual(cost, 500);
    });

    it('getTotalCost: Make sure inventory is ignored and does affect cost', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.addItemToCrafting('Needles', 3);
        
        c.addItemToInventory('Needles', 4);

        var cost = c.getTotalCost(useInventory=false);

        assert.strictEqual(cost, 0);
    });

    it('updateCraftingItemMaxCraftingQuantity: Make sure maxCraftingQuantity is updated', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.updateCraftingItemMaxCraftingQuantity('Needles', 3);

        var needles = c.craftingRecipes.get('Needles');
        assert.strictEqual(needles.maxCraftingQuantity, 3);
    });

    it('updateCraftingItemMaxCraftingQuantity: Make sure maxCraftingQuantity updates even during multiple updates', () =>{
        var recipes = recipe.getCraftingRecipes();

        var c = new crafting.Crafting(recipes);
        c.updateCraftingItemMaxCraftingQuantity('Needles', 3);
        
        var needles = c.craftingRecipes.get('Needles');
        assert.strictEqual(needles.maxCraftingQuantity, 3);
        
        c.updateCraftingItemMaxCraftingQuantity('Needles', 6);
        var needles2 = c.craftingRecipes.get('Needles');
        assert.strictEqual(needles2.maxCraftingQuantity, 6);
    });

    it('massUpdateCraftingItemMaxCraftingQuantity: Make sure all maxCraftingQuantity are updated on all items in Map', () =>{
        var recipes = recipe.getCraftingRecipes();

        var updates = new Map();
        updates.set('Needles', 2);
        updates.set('Ribbon', 4);

        var c = new crafting.Crafting(recipes);
        c.massUpdateCraftingItemMaxCraftingQuantity(updates);

        var needles = c.craftingRecipes.get('Needles');
        assert.strictEqual(needles.maxCraftingQuantity, 2);
        var ribbon = c.craftingRecipes.get('Ribbon');
        assert.strictEqual(ribbon.maxCraftingQuantity, 4);
    });

    it('massUpdateCraftingItemMaxCraftingQuantity: Make sure maxCraftingQuantity is reset on previously set items', () =>{
        var recipes = recipe.getCraftingRecipes();

        var updates = new Map();
        updates.set('String', 55);
        updates.set('Log', 3);

        var c = new crafting.Crafting(recipes);
        c.updateCraftingItemMaxCraftingQuantity('Metal', 6);

        var metal = c.craftingRecipes.get('Metal');
        assert.strictEqual(metal.maxCraftingQuantity, 6);
        
        c.massUpdateCraftingItemMaxCraftingQuantity(updates);
        var metal2 = c.craftingRecipes.get('Metal');
        assert.strictEqual(metal2.maxCraftingQuantity, -1);

        var string = c.craftingRecipes.get('String');
        assert.strictEqual(string.maxCraftingQuantity, 55);

        var log = c.craftingRecipes.get('Log');
        assert.strictEqual(log.maxCraftingQuantity, 3);
    });
});