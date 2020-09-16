import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var floorRecipes = getFloorRecipes();
    initialize(recipes, floorRecipes, "normalInventory");
});