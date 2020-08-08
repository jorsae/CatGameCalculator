import { getCraftingRecipes } from './recipes';
import { Crafting } from '../classes/crafting';
import { populateCraftingItems } from '../ui/ui';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var crafting = new Crafting(recipes);

    populateCraftingItems(recipes);
    /*var test = document.getElementById("test");
    for (const [name, item] of recipes.entries()) {
        if(name === 'Ribbon'){
            createCraftingItem(test, item);
        }
    }*/
});