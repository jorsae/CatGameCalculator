/**
 * This class holds how to craft an item.
 * One item will have an array of CraftingMethod.
 * i.e: Craft 3x 2 times and Craft: 2x 2times
 */
export class CraftingMethod{
    constructor(itemQuantity, crafts){
        this.itemQuantity = itemQuantity;
        this.crafts = crafts;
    }

    toString(){
        return "Craft: " + this.itemQuantity + "x, " + this.crafts + "times";
    }
}