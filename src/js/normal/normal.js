import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var floorRecipes = getFloorRecipes();
    initialize(recipes, floorRecipes);

    /*
    populateCraftingItems(recipes);
    populateFloors(floorRecipes);

    var test = document.getElementById("test");
    for (const [name, item] of recipes.entries()) {
        if(name === 'Ribbon'){
            createCraftingItem(test, item);
        }
    }*/
});