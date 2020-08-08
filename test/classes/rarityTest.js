var assert = require('assert');
var rarity = require('../../src/js/classes/rarity');

describe('Rarity', () => {
    it('rarity: Tests all rarities string value is correct', () => {
        assert.equal(rarity.Rarity.HIDDEN, 'hidden');
        assert.equal(rarity.Rarity.RAW, 'raw');
        assert.equal(rarity.Rarity.COMMON, 'common');
        assert.equal(rarity.Rarity.RARE, 'rare');
        assert.equal(rarity.Rarity.EPIC, 'epic');
        assert.equal(rarity.Rarity.LEGENDARY, 'legendary');
    });
});