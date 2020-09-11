var assert = require('assert');
var craftingItem = require('../../src/js/classes/craftingItem');
var craftingRequirement = require('../../src/js/classes/craftingRequirement');

describe('CraftingRequirement', () => {
    it('constructor: Create object with right attributes', () => {
        const item = new craftingItem.CraftingItem("craftingItem", 50, 100, "rare", 0);
        const requirement = new craftingRequirement.CraftingRequirement(item, 50);

        assert(requirement.craftingItem === item);
        assert(requirement.quantity === 50);
    });

    it('toString: Returns expected string', () => {
        const item = new craftingItem.CraftingItem("testItem", 50, 100, "rare", 0);
        const req = new craftingRequirement.CraftingRequirement(item, 52);
        
        assert(req.toString() === "testItem: 52");
    });

});