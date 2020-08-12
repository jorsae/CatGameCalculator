import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';
var rarity = require('../classes/rarity');

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var floorRecipes = getFloorRecipes();
    initialize(recipes, floorRecipes);
    fillRawMaterials(recipes);
});

/**
 * Fills raw material selectors with name and quantity needed to craft.
 */
function fillRawMaterials(recipes){
    const rawMaterials = document.getElementsByClassName("raw-material"); // Fills raw-material with onclick event for selection
    const rawMaterialHeader = document.getElementsByClassName("crafting-item-header"); // h3 elements for the raw materials

    var index = 0;
    for (const [name, item] of recipes.entries()) {
        if(item.craftingRequirements !== null){
            // Only items with the first crafting requirements being rarity RAW, will be selected.
            // This leaves only the first 3 crafting-items. a, b and c
            var itemRequirement = item.craftingRequirements[0].craftingItem;
            if(itemRequirement.rarity === rarity.Rarity.RAW){
                rawMaterialHeader[index].innerText = itemRequirement.name + ": " + item.craftingRequirements[0].quantity;
                const selectedIndex = index;
                const itemName = itemRequirement.name;
                rawMaterials[index].onclick = function() { setRawMaterial(recipes, itemName) };
                index += 1
            }
        }
    }
}

/**
 * click event for when user selected a raw material.
 */
function setRawMaterial(recipes, selectedItemName){
    const rawMaterials = document.getElementsByClassName("raw-material"); // Fills raw-material with onclick event for selection

    var index = 0;
    for (const [name, item] of recipes.entries()) {
        if(item.craftingRequirements !== null){
            var itemRequirement = item.craftingRequirements[0].craftingItem;
            if(itemRequirement.rarity === rarity.Rarity.RAW){
                var element = rawMaterials[index];
                if(itemRequirement.name === selectedItemName){
                    item.craftingRequirements[0].quantity = 8;
                    element.classList.add("selected-raw-material");
                }
                else{
                    item.craftingRequirements[0].quantity = 4;
                    element.classList.remove("selected-raw-material");
                }
                const h3 = rawMaterials[index].getElementsByTagName("h3")[0];
                h3.innerText = itemRequirement.name + ": " + item.craftingRequirements[0].quantity;
                index += 1;
            }
        }
    }
}