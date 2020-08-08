import { Floor } from './classes/floor';
import { getCraftingRecipes } from '../js/normal/recipes';

const mayhem = new Floor("Mayhem", 4, null);
console.log("hello world");
console.log(mayhem.name);

const recipes = getCraftingRecipes();
const item = recipes.get("Needles");