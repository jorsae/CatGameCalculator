var assert = require('assert');
var utility = require('../../src/js/utility/utility');
var recipe = require('../../src/js/normal/recipes');

describe('utility test', () => {
    it('intToString positive number', () => {
        var result1d = utility.intToString(0);
        assert.equal(result1d, '0');

        var result2d = utility.intToString(16);
        assert.equal(result2d, '16');

        var result4d = utility.intToString(1512);
        assert.equal(result4d, '1.5k');

        var result5d = utility.intToString(52312);
        assert.equal(result5d, '52.3k');

        var result6d = utility.intToString(103212);
        assert.equal(result6d, '103.2k');

        var result7d = utility.intToString(7299912);
        assert.equal(result7d, '7.3m');
    });

    it('intToString negative number', () => {
        var result2d = utility.intToString(-16);
        assert.equal(result2d, '-16');

        var result4d = utility.intToString(-1512);
        assert.equal(result4d, '-1.5k');

        var result5d = utility.intToString(-52312);
        assert.equal(result5d, '-52.3k');

        var result6d = utility.intToString(-103212);
        assert.equal(result6d, '-103.2k');

        var result7d = utility.intToString(-7299912);
        assert.equal(result7d, '-7.3m');
    });

    it('getCraftingRequirements', () => {
        const recipes = recipe.getCraftingRecipes();
        const item = recipes.get("Needles");

        var currentCraft = new Map();
        utility.getCraftingRequirements(item, recipes, currentCraft);
        
        var expected = new Map();
        expected.set('Cotton', 6);
        expected.set('Log', 6);
        expected.set('Metal', 4);
        expected.set('Ribbon', 1);
        expected.set('Rock', 12);
        expected.set('String', 2);
        expected.set('Wood', 2);
        assert.deepEqual(currentCraft, expected);
    });
});