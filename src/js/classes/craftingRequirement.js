/**
 * This class holds all the CraftingRequirement for a CraftingItem
 */
export class CraftingRequirement{
    constructor(craftingItem, quantity){
        this.craftingItem = craftingItem;
        this.quantity = quantity;
    }

    toString(){
        return this.craftingItem.name + ': ' + this.quantity;
    }
}