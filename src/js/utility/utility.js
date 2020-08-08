/**
 * Converts int to abbreviated number.
 * 1,005,123 => 1m, etc.
 */
export function intToString (num, fixed=0) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
    return e;
}

/**
 * Recursive function that will fetch all crafting requirements from a given item.
 * TODO: It should not be needed to have currentCraft as a parameter.
 */
export function getCraftingRequirements(item, craftingRecipes, currentCraft, parentQuantity = 1){
    if(item.craftingRequirements === null){
        return;
    }

    // Adds all the requirements
    for(var i = 0; i < item.craftingRequirements.length; i++){
        var name = item.craftingRequirements[i].craftingItem.name;
        var quantity = item.craftingRequirements[i].quantity * parentQuantity;
        
        var nameMap = currentCraft.get(name);
        if(nameMap === undefined){
            var craftingItem = craftingRecipes.get(name);
            getCraftingRequirements(craftingItem, craftingRecipes, currentCraft, quantity);
            currentCraft.set(name, quantity);
        }
        else{
            var craftingItem = craftingRecipes.get(name);
            getCraftingRequirements(craftingItem, craftingRecipes, currentCraft, quantity);
            var oldQuantity = currentCraft.get(name);
            currentCraft.set(name, oldQuantity + quantity);
        }
    }
    return currentCraft;
}