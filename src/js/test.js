var crafting = require('../js/classes/crafting');
var recipe = require('../js/normal/recipes');

var recipes = recipe.getCraftingRecipes();

var c = new crafting.Crafting(recipes);
c.addItemToCrafting('Artifact', 2);

console.log(c.craftingRecipes.get('Artifact'));
c.updateCraftingItemMaxCraftingQuantity('Artifact', 2);
console.log(c.craftingRecipes.get('Artifact'));

//var currentCraft = c.getCraftingRequirements();
//console.log(currentCraft);

var cost = c.getTotalCost();
console.log(cost);

/*
console.log(c.craftingRecipes.get('Amethyst'));
var b = c.craftingRecipes.get('Amethyst');
b.maxCraftingQuantity = 5;
console.log(c.craftingRecipes.get('Amethyst'));
*/