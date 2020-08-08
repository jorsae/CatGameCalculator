export class Crafting{
    constructor(craftingRecipes){
        this.craftingRecipes = craftingRecipes;
        this.craftingList = new Map();
        this.craftingTime = 30;
        this.currentCraft = new Map();
    }

    addCraftingItem(item){
        var craftingItem = this.craftingList.get(item.name);
        if(craftingItem === undefined){
            this.craftingList.set(item.name, item);
        }
        else{
            craftingItem.quantity += item.quantity;
            this.craftingList.set(item.name, craftingItem);
        }
    }

    setCraftingTime(time){
        this.craftingTime = time;
    }

    getCraftingRequirements(){
        this.currentCraft.clear();

        for (const [name, craftingItem] of this.craftingList.entries()) {
            this.getItemRequirements(craftingItem, craftingItem.quantity);
            this.addElementToCurrentCraft(craftingItem.name, craftingItem.quantity);

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
}