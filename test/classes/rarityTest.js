var assert = require('assert');
var rarity = require('../../src/js/classes/rarity');

describe('Rarity', () => {
    it('rarity: Tests all rarities string value is correct', () => {
        assert.strictEqual(rarity.Rarity.HIDDEN, 'hidden');
        assert.strictEqual(rarity.Rarity.RAW, 'raw');
        assert.strictEqual(rarity.Rarity.COMMON, 'common');
        assert.strictEqual(rarity.Rarity.RARE, 'rare');
        assert.strictEqual(rarity.Rarity.EPIC, 'epic');
        assert.strictEqual(rarity.Rarity.LEGENDARY, 'legendary');
    });
});