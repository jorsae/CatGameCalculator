var assert = require('assert');
var recipe = require('../../src/js/normal/recipes');

describe('Normal crafting recipes', () => {
    it('getCraftingRecipes: Makes sure size of normal crafting recipes is correct', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.strictEqual(recipes.size, 23)
    });

    it('getCraftingRecipes: Makes sure normal crafting recipes is returned as a Map object', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.ok(recipes instanceof Map);
    });
});