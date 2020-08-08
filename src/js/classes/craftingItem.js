var craftingMethod = require('./craftingMethod');
var rarity = require('./rarity');
/**
 * This is a CraftingItem.
 * i.e: String, Cotton, Firestone, etc.
 */
export class CraftingItem{
    constructor(name, craftingTime, baseCost, rarity, sortingOrder, quantity = 1, craftingRequirements = null){
        this.name = name;
        this.craftingTime = craftingTime;
        this.baseCost = baseCost;
        this.rarity = rarity;
        this.sortingOrder = sortingOrder
        this.quantity = quantity;

        this.craftingRequirements = craftingRequirements;
    }

    getRarityValue(){
        switch(this.rarity){
            case rarity.Rarity.HIDDEN:
                return 0;
            case rarity.Rarity.RAW:
                return 1;
            default:
            case rarity.Rarity.COMMON:
                return 2;
            case rarity.Rarity.RARE:
                return 3;
            case rarity.Rarity.EPIC:
                return 4;
            case rarity.Rarity.LEGENDARY:
                return 5;
        }
    }

    getCraftingMethod(time){
        var crafts = 1; // How many crafts you can do in the time given. Rounded down. Minimum 1
        if(this.craftingTime < time){
            crafts = Math.floor(time / this.craftingTime);
        }

        // You can do more crafts, than items needed. Ergo: 1 item, per craft
        if(crafts > this.quantity){
            crafts = this.quantity;
            return [new craftingMethod.CraftingMethod(1, this.quantity)];
        }
        // You can only do 1 craft. Ergo: x items, 1 craft
        if(crafts === 1){
            return [new craftingMethod.CraftingMethod(this.quantity, 1)];
        }

        var maxQuantity = Math.ceil(this.quantity / crafts);
        var minQuantity = maxQuantity - 1;

        for(var i = 1; i <= crafts; i++){
            var max = maxQuantity * i;
            var min = minQuantity * (crafts - i);
            if((max+min) === this.quantity){
                return [new craftingMethod.CraftingMethod(maxQuantity, i), new craftingMethod.CraftingMethod(minQuantity, (crafts-i))];
            }
        }

        return [];
    }

    getCost(craftingMethods){
        var totalCost = 0;
        for(var i = 0; i < craftingMethods.length; i++){
            totalCost += (this.baseCost / 4) * (Math.pow(craftingMethods[i].itemQuantity, 2) + 3 * craftingMethods[i].itemQuantity) * craftingMethods[i].crafts;
        }
        return totalCost;
    }

    toString(){
        var craftReq = "";
        if(this.craftingRequirements !== null){
            for(var i = 0; i < this.craftingRequirements.length; i++){
                craftReq += this.craftingRequirements[i].craftingItem.name + ' : ' + this.craftingRequirements[i].quantity + " ";
            }
        }
        return this.name + ", " + this.craftingTime + "minutes, " + this.baseCost + "coins. Crafting Requirement: " + craftReq;
    }
}