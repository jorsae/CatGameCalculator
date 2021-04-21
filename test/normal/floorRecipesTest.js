var assert = require('assert');
var floorRecipe = require('../../src/js/normal/floorRecipes');

describe('Floor Recipes', () => {
    it('getFloorRecipes: Makes sure size of normal floor recipes is correct', () => {
        var floorRecipes = floorRecipe.getFloorRecipes();
        assert.strictEqual(floorRecipes.size, 68)
    });

    it('getFloorRecipes: Makes sure floor recipes is returned as a Map object', () => {
        var recipes = floorRecipe.getFloorRecipes();
        assert.ok(recipes instanceof Map);
    });
});