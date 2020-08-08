var assert = require('assert');
var recipe = require('../../src/js/normal/recipes');

describe('Normal crafting recipes', () => {
    it('Recipes size', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.equal(recipes.size, 23)
    });

    it('Recipes type', () => {
        var recipes = recipe.getCraftingRecipes();
        assert.ok(recipes instanceof Map);
    });
});