import { getCraftingRecipes } from './recipes';
import { Crafting } from '../classes/crafting';
import { populateCraftingItems, populateFloors } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var crafting = new Crafting(recipes);
    var floorRecipes = getFloorRecipes();

    populateCraftingItems(recipes);
    populateFloors(floorRecipes);
    /*var test = document.getElementById("test");
    for (const [name, item] of recipes.entries()) {
        if(name === 'Ribbon'){
            createCraftingItem(test, item);
        }
    }*/
});