export class Crafting{
    constructor(craftingRecipes){
        this.craftingRecipes = craftingRecipes;
        this.craftingList = new Map();
        this.craftingTime = 30;
        this.currentCraft = new Map();
    }

    addCraftingItem(name, quantity){
        var item = this.craftingRecipes.get(name);
        if(item === undefined){
            // TODO: Throw error as this item does not exist as a crafting recipe. Also write test for this
            return;
        }

        var oldQuantity = this.craftingList.get(name);
        if(oldQuantity === undefined){
            this.craftingList.set(name, quantity);
        }
        else{
            this.craftingList.set(name, oldQuantity + quantity);
        }
    }

    setCraftingTime(time){
        this.craftingTime = time;
    }

    getCraftingRequirements(){
        this.currentCraft.clear();
        
        for (const [name, quantity] of this.craftingList.entries()) {
            var item = this.craftingRecipes.get(name);
            item.quantity = quantity;
            this.getItemRequirements(item, item.quantity);
            this.addElementToCurrentCraft(item.name, item.quantity);
        }

        return this.currentCraft;
    }

    /**
     * Recursive function that will fetch all crafting requirements from a given item.
     * TODO: It should not be needed to have currentCraft as a parameter.
     */
    getItemRequirements(item, parentQuantity = 1){
        if(item.craftingRequirements === null){
            return;
        }

        // Adds all the requirements
        for(var i = 0; i < item.craftingRequirements.length; i++){
            var name = item.craftingRequirements[i].craftingItem.name;
            var quantity = item.craftingRequirements[i].quantity * parentQuantity;
            
            var craftingItem = this.craftingRecipes.get(name);
            this.getItemRequirements(craftingItem, quantity);
            this.addElementToCurrentCraft(name, quantity);
        }
        return this.currentCraft;
    }
        
    /**
     * Adds key and value to a map.
     * If the key already exists, increase the value
     */
    addElementToCurrentCraft(key, value){
        var name = this.currentCraft.get(key);
        if(name === undefined){
            this.currentCraft.set(key, value);
        }
        else{
            var oldValue = this.currentCraft.get(key);
            this.currentCraft.set(key, oldValue + value);
        }
    }

    getTotalCost(){
        var totalCost = 0;
        for (const [name, quantity] of this.getCraftingRequirements()) {
            var item = this.craftingRecipes.get(name);
            item.quantity = quantity;
            totalCost += item.getCost(item.getCraftingMethod(this.craftingTime));
        }
        return totalCost;
    }
}