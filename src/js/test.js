import { Floor } from './classes/floor';
import { getCraftingRecipes } from '../js/normal/recipes';
import { Crafting } from './classes/crafting';

const mayhem = new Floor("Mayhem", 4, null);
console.log("hello world");
console.log(mayhem.name);

const recipes = getCraftingRecipes();
var crafting = new Crafting(recipes);
crafting.addCraftingItem('Needles', 3);
crafting.addCraftingItem('Water', 3);
crafting.addCraftingItem('Fire', 6);
crafting.addCraftingItem('Pendant', 2);
crafting.addCraftingItem('Elementstone', 1);

var reqs = crafting.getCraftingRequirements();
console.log('Requirements: ');
for (const [name, quantity] of reqs.entries()) {
    console.log(name + ': ' + quantity);
}
var cost = crafting.getTotalCost();
console.log('cost: ' + cost);