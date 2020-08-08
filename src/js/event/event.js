import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    console.log(recipes);
    var floorRecipes = getFloorRecipes();
    console.log(floorRecipes);
    initialize(recipes, floorRecipes);
});