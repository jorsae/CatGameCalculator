import { Floor } from './classes/floor';
import { getCraftingRequirements } from '../js/utility/utility';
import { getCraftingRecipes } from '../js/normal/recipes';

const mayhem = new Floor("Mayhem", 4, null);
console.log("hello world");
console.log(mayhem.name);

const recipes = getCraftingRecipes();
const item = recipes.get("Needles");

var currentCraft = new Map();
getCraftingRequirements(item, recipes, currentCraft);
console.log(currentCraft);