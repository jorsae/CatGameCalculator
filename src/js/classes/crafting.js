export class Crafting{
    constructor(craftingRecipes){
        this.craftingRecipes = craftingRecipes;
        this.craftingList = new Map();
        this.craftingTime = 30;
        this.currentCraft = new Map();
        this.inventory = new Map();
    }

    addItemToCrafting(name, quantity, maxCraftingQuantity=-1){
        var item = this.craftingRecipes.get(name);
        if(item === undefined){
            // TODO: Throw error as this item does not exist as a crafting recipe. Also write test for this
            return;
        }

        var props = this.craftingList.get(name);
        if(props === undefined){
            if(quantity === 0){
                this.craftingList.delete(name);
            }
            else{
                this.craftingList.set(name, {'quantity': quantity, 'maxCraftingQuantity': maxCraftingQuantity});
            }
        }
        else{
            var totalQuantity = props.quantity + quantity;
            if(totalQuantity === 0){
                this.craftingList.delete(name);
            }
            else{
                this.craftingList.set(name, {'quantity': totalQuantity, 'maxCraftingQuantity': maxCraftingQuantity});
            }
        }
    }

    setItemToCrafting(name, quantity, maxCraftingQuantity=-1){
        var item = this.craftingRecipes.get(name);
        if(item === undefined){
            // TODO: Throw error as this item does not exist as a crafting recipe. Also write test for this
            return;
        }

        if(quantity === 0){
            this.craftingList.delete(name);
        }
        else{
            this.craftingList.set(name, {'quantity': quantity, 'maxCraftingQuantity': maxCraftingQuantity});
        }
    }

    addItemToInventory(name, quantity){
        var item = this.craftingRecipes.get(name);
        if(item === undefined){
            // TODO: Throw error as this item does not exist as a crafting recipe. Also write test for this
            return;
        }

        var oldQuantity = this.inventory.get(name);
        if(oldQuantity === undefined){
            if(quantity === 0){
                this.inventory.delete(name);
            }
            else{
                this.inventory.set(name, quantity);
            }
        }
        else{
            var totalQuantity = oldQuantity + quantity;
            if(totalQuantity === 0){
                this.inventory.delete(name);
            }
            else{
                this.inventory.set(name, oldQuantity + quantity);
            }
        }
    }

    setItemToInventory(name, quantity){
        var item = this.craftingRecipes.get(name);
        if(item === undefined){
            // TODO: Throw error as this item does not exist as a crafting recipe. Also write test for this
            return;
        }

        if(quantity === 0){
            this.inventory.delete(name);
        }
        else{
            this.inventory.set(name, quantity);
        }
    }

    setCraftingTime(time){
        this.craftingTime = time;
    }

    getCraftingRequirements(useInventory=true){
        this.currentCraft.clear();
        
        for (const [name, props] of this.craftingList.entries()) {
            var item = this.craftingRecipes.get(name);
            item.quantity = props.quantity;

            this.getItemRequirements(item, item.quantity);
            this.addElementToCurrentCraft(item.name, item.quantity);
        }
        
        if(useInventory){
            // Remove items from craft if we have them in inventory
            for (const [name, quantity] of this.currentCraft.entries()) {
                var inventoryQuantity = this.inventory.get(name);
                if(inventoryQuantity !== undefined){
                    var item = this.craftingRecipes.get(name);
                    this.subtractItemRequirements(item, inventoryQuantity);
                    this.addElementToCurrentCraft(item.name, -inventoryQuantity);
                }
            }
        }

        // Sort items into array sorting
        var sorting = [];
        for (const [name, quantity] of this.currentCraft.entries()) {
            var item = this.craftingRecipes.get(name);
            item.quantity = quantity;
            sorting.push(item);
        }
        sorting.sort(function(x, y){
            return x.sortingOrder - y.sortingOrder;
        });

        // Clear currentCraft and re-add items that are now sorted
        this.currentCraft.clear();
        for(var item of sorting){
            this.addElementToCurrentCraft(item.name, item.quantity);
        }

        return this.currentCraft;
    }

    /**
     * Recursive function that will fetch all crafting requirements from a given item.
     * TODO: It should not be needed to have currentCraft as a parameter.
     */
    subtractItemRequirements(item, parentQuantity = 1){
        if(item.craftingRequirements === null){
            return;
        }

        // Adds all the requirements
        for(var i = 0; i < item.craftingRequirements.length; i++){
            var name = item.craftingRequirements[i].craftingItem.name;
            var quantity = item.craftingRequirements[i].quantity * parentQuantity;
            
            var craftingItem = this.craftingRecipes.get(name);
            this.subtractItemRequirements(craftingItem, quantity);
            this.addElementToCurrentCraft(name, -quantity);
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
            if(value > 0){
                this.currentCraft.set(key, value);
            }
        }
        else{
            var oldValue = this.currentCraft.get(key);
            var newValue = oldValue + value;
            if(newValue < 0){
                this.currentCraft.delete(key);
            }
            else{
                this.currentCraft.set(key, newValue);
            }
        }
    }

    getTotalCost(boost=1.00, useInventory=true){
        var totalCost = 0;
        for (const [name, quantity] of this.getCraftingRequirements(useInventory)) {
            var item = this.craftingRecipes.get(name);
            item.quantity = quantity;
            totalCost += item.getCost(this.craftingTime, boost);
        }
        return totalCost;
    }
}