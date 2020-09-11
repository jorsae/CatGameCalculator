var assert = require('assert');
var rarity = require('../../src/js/classes/rarity');

describe('Rarity', () => {
    it('rarity: Tests all rarities string value is correct', () => {
        assert(rarity.Rarity.HIDDEN === 'hidden');
        assert(rarity.Rarity.RAW === 'raw');
        assert(rarity.Rarity.COMMON === 'common');
        assert(rarity.Rarity.RARE === 'rare');
        assert(rarity.Rarity.EPIC === 'epic');
        assert(rarity.Rarity.LEGENDARY === 'legendary');
    });
});