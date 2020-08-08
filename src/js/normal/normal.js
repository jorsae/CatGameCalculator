import { getCraftingRecipes } from './recipes';
import { Crafting } from '../classes/crafting';
import { createCraftingItem } from '../ui/ui';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var crafting = new Crafting(recipes);

    var test = document.getElementById("test");
    for (const [name, item] of recipes.entries()) {
        if(name === 'Ribbon'){
            createCraftingItem(test, item);
        }
    }
});