/**
 * This class holds how to craft an item.
 * One item will have an array of CraftingMethod.
 * i.e: Craft 3x 2 times and Craft: 2x 2times
 */
// TODO: Can probably remove this class and move toString() into a CraftingItem.getCraftingMethod
export class CraftingMethod{
    constructor(itemQuantity, crafts){
        this.itemQuantity = itemQuantity;
        this.crafts = crafts;
    }

    toString(){
        var timePlural = (this.crafts === 1) ? "time" : "times";
        return this.itemQuantity + "x " + this.crafts + timePlural;
    }
}