import { getCraftingRecipes } from './recipes';
import { Crafting } from '../classes/crafting';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var crafting = new Crafting(recipes);

    for (const [name, quantity] of recipes.entries()) {
        console.log(name + ': ' + quantity);
    }
});