var craftingItem = require('../classes/craftingItem');
var craftingRequirement = require('../classes/craftingRequirement');
var rarity = require('../classes/rarity');

/**
 * This class constructs and stores all the Crafting Items in the game
 */

// ------------------------------------------------------------------------------------------
// DO NOT DELETE THIS. THIS IS THE DEFAULT NAME, CHANGE BACK TO THIS AFTER AN EVENT IS OVER
// ------------------------------------------------------------------------------------------
/*
export const rawMaterialNames = ["Raw Material A", "Raw Material B", "Raw Material C"];
export const craftingItemNames = ["Item A", "Item B", "Item C",
                            "Item: D", "Item E", "Item F",
                            "3 Stars"];
export const prizeNames = [ "Cat 1", "Decoration 2", "Cat 2",
                            "Decoration 2", "Cat 3", "Decoration 3",
                            "Cat 4", "Decoration 4", "Decoration 5",
                            "Decoration 6" ];
*/

// ------------------------------------------------------------------------------------------
// THIS IS THE CURRENT EVENT. IF EVENT IS OVER AND NO NEW IS PUBLISHED. COMMENT THIS OUT
// ------------------------------------------------------------------------------------------
export const rawMaterialNames = ["Star Magic", "Moon Magic", "Smoke Magic"];
export const craftingItemNames = ["Star Book", "Moon Hat", "Smoke Wand",
                            "Tube Potion", "Bottle Potion", "Cauldron",
                            "3 Stars"];
export const prizeNames = [ "Hepzibah", "Brewing Station", "Brew",
                            "Conjuring Table", "Jocasta", "Familiar",
                            "Leroi", "Summoning Circle", "Flying Broomsticks",
                            "Potion Shelf" ];

/**
 * We wrap adding the crafting recipes in a function so we can call it from window.onload.
 * This makes it so that the javascript is not run at once, so that the html/css can render first.
 */
export function getCraftingRecipes(){
    var craftingRecipes = new Map();
    
    // TODO: Make sure the properties of all crafting items is accurate, as they may have been wrongly edited after the CraftingItem ctor changes.
    // TODO: Store categories properly
    const noCategory = '';
    const category1 = 'Tier 1 Crafting';
    const category2 = 'Tier 2 Crafting';
    const category3 = 'Star Crafting';

    // Base
    const rawMaterialA = new craftingItem.CraftingItem(rawMaterialNames[0], noCategory, 0, 0, rarity.Rarity.RAW, 1);
    const rawMaterialB = new craftingItem.CraftingItem(rawMaterialNames[1], noCategory, 0, 0, rarity.Rarity.RAW, 2);
    const rawMaterialC = new craftingItem.CraftingItem(rawMaterialNames[2], noCategory, 0, 0, rarity.Rarity.RAW, 3);
    craftingRecipes.set(rawMaterialA.name, rawMaterialA);
    craftingRecipes.set(rawMaterialB.name, rawMaterialB);
    craftingRecipes.set(rawMaterialC.name, rawMaterialC);
    
    // Tier 1
    const AReq = [new craftingRequirement.CraftingRequirement(rawMaterialA, 4)];
    const A = new craftingItem.CraftingItem(craftingItemNames[0], category1, 20, 15, rarity.Rarity.COMMON, 5, AReq);
    craftingRecipes.set(A.name, A);
    
    const BReq = [new craftingRequirement.CraftingRequirement(rawMaterialB, 4)];
    const B = new craftingItem.CraftingItem(craftingItemNames[1], category1, 20, 15, rarity.Rarity.COMMON, 6, BReq);
    craftingRecipes.set(B.name, B);
    
    const CReq = [new craftingRequirement.CraftingRequirement(rawMaterialC, 4)];
    const C = new craftingItem.CraftingItem(craftingItemNames[2], category1, 20, 15, rarity.Rarity.COMMON, 7, CReq);
    craftingRecipes.set(C.name, C);
    
    // Tier 2
    const DReq = [new craftingRequirement.CraftingRequirement(A, 3), new craftingRequirement.CraftingRequirement(B, 2), new craftingRequirement.CraftingRequirement(C, 2)];
    const D = new craftingItem.CraftingItem(craftingItemNames[3], category2, 150, 15, rarity.Rarity.RARE, 8, DReq);
    craftingRecipes.set(D.name, D);
    
    const EReq = [new craftingRequirement.CraftingRequirement(D, 2), new craftingRequirement.CraftingRequirement(C, 4), new craftingRequirement.CraftingRequirement(B, 4)];
    const E = new craftingItem.CraftingItem(craftingItemNames[4], category2, 200, 30, rarity.Rarity.RARE, 9, EReq);
    craftingRecipes.set(E.name, E);
    
    const FReq = [new craftingRequirement.CraftingRequirement(E, 3), new craftingRequirement.CraftingRequirement(A, 8)];
    const F = new craftingItem.CraftingItem(craftingItemNames[5], category2, 400, 60, rarity.Rarity.RARE, 10, FReq);
    craftingRecipes.set(F.name, F);

    // Tier 3
    const starsReq = [new craftingRequirement.CraftingRequirement(A, 1), new craftingRequirement.CraftingRequirement(B, 1),
                    new craftingRequirement.CraftingRequirement(C, 1), new craftingRequirement.CraftingRequirement(E, 1)];
    const stars = new craftingItem.CraftingItem(craftingItemNames[6], category3, 300, 0, rarity.Rarity.RARE, 11, starsReq);
    craftingRecipes.set(stars.name, stars);

    return craftingRecipes;
}