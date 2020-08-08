import { getCraftingRecipes } from './recipes';
import { initialize, populateCraftingItems, populateFloors } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    initialize(recipes);
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