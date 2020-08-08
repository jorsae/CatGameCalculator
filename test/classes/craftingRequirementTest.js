var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var craftingRequirement = require('../../src/js/classes/craftingRequirement');

describe('Test for CraftingRequirement', () => {
    it('CraftingRequirement variables', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        const requirement = new craftingRequirement.CraftingRequirement(item, 50);

        assert.equal(requirement.craftingItem, item);
        assert.equal(requirement.quantity, 50);
    });

    it('CraftingRequirement toString', () => {
        const item = new craftingItem.CraftingItem("testItem", 50, 100, "rare", 0);
        const req = new craftingRequirement.CraftingRequirement(item, 52);
        
        assert.equal(req, "testItem: 52");
    });

});