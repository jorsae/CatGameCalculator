var assert = require('assert');
var recipe = require('../../src/js/event/recipes');

describe('Event crafting recipes', () => {
    it('getCraftingRecipes: Makes sure size of event crafting recipes is correct', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.strictEqual(recipes.size, 10);
    });

    it('getCraftingRecipes: Makes sure event crafting recipes is returned as a Map object', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.ok(recipes instanceof Map);
    });
});