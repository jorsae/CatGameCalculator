var craftingItem = require('../classes/craftingItem');
var craftingRequirement = require('../classes/craftingRequirement');
var rarity = require('../classes/rarity');
/**
 * We wrap adding the crafting recipes in a function so we can call it from window.onload.
 * This makes it so that the javascript is not run at once, so that the html/css can render first.
 */
export function getCraftingRecipes(){
    var craftingRecipes = new Map();
    
    // Base
    const cotton = new craftingItem.CraftingItem("Cotton", "", 0, 0, rarity.Rarity.RAW, 1);
    const log = new craftingItem.CraftingItem("Log", "", 0, 0, rarity.Rarity.RAW, 2);
    const rock = new craftingItem.CraftingItem("Rock", "", 0, 0, rarity.Rarity.RAW, 3);
    const quartz = new craftingItem.CraftingItem("Quartz", "", 0, 0, rarity.Rarity.RAW, 4);
    craftingRecipes.set(cotton.name, cotton);
    craftingRecipes.set(log.name, log);
    craftingRecipes.set(rock.name, rock);
    craftingRecipes.set(quartz.name, quartz);
    
    // Basic Crafting
    var stringReq = [new craftingRequirement.CraftingRequirement(cotton, 3)];
    const string = new craftingItem.CraftingItem("String", "Basic Crafting", 50, 5, rarity.Rarity.COMMON, 5, stringReq);
    craftingRecipes.set(string.name, string);
    
    var woodReq = [new craftingRequirement.CraftingRequirement(log, 3)];
    const wood = new craftingItem.CraftingItem("Wood", "Basic Crafting", 50, 5, rarity.Rarity.COMMON, 6, woodReq);
    craftingRecipes.set(wood.name, wood);
    
    var ribbonReq = [new craftingRequirement.CraftingRequirement(string, 2), new craftingRequirement.CraftingRequirement(wood, 2)];
    const ribbon = new craftingItem.CraftingItem("Ribbon", "Basic Crafting", 100, 15, rarity.Rarity.RARE, 7, ribbonReq);
    craftingRecipes.set(ribbon.name, ribbon);
    
    // Shiny Crafting
    var metalReq = [new craftingRequirement.CraftingRequirement(rock, 3)];
    const metal = new craftingItem.CraftingItem("Metal", "Shiny Crafting", 100, 15, rarity.Rarity.COMMON, 8, metalReq);
    craftingRecipes.set(metal.name, metal);
    
    var needlesReq = [new craftingRequirement.CraftingRequirement(metal, 4), new craftingRequirement.CraftingRequirement(ribbon, 1)];
    const needles = new craftingItem.CraftingItem("Needles", "Shiny Crafting", 200, 30, rarity.Rarity.RARE, 9, needlesReq);
    craftingRecipes.set(needles.name, needles);
    
    var sparklesReq = [new craftingRequirement.CraftingRequirement(needles, 2), new craftingRequirement.CraftingRequirement(ribbon, 2)];
    const sparkles = new craftingItem.CraftingItem("Sparkles", "Shiny Crafting", 300, 60, rarity.Rarity.EPIC, 10, sparklesReq);
    craftingRecipes.set(sparkles.name, sparkles);
    
    // Precious Crafting
    var bronzeReq = [new craftingRequirement.CraftingRequirement(rock, 4)];
    const bronze = new craftingItem.CraftingItem("Bronze", "Precious Crafting", 200, 30, rarity.Rarity.COMMON, 11, bronzeReq);
    craftingRecipes.set(bronze.name, bronze);
    
    var silverReq = [new craftingRequirement.CraftingRequirement(bronze, 3), new craftingRequirement.CraftingRequirement(sparkles, 1)];
    const silver = new craftingItem.CraftingItem("Silver", "Precious Crafting", 300, 120, rarity.Rarity.RARE, 12, silverReq);
    craftingRecipes.set(silver.name, silver);
    
    var goldReq = [new craftingRequirement.CraftingRequirement(silver, 2), new craftingRequirement.CraftingRequirement(sparkles, 2)];
    const gold = new craftingItem.CraftingItem("Gold", "Precious Crafting", 500, 360, rarity.Rarity.EPIC, 13, goldReq);
    craftingRecipes.set(gold.name, gold);
    
    // Jewel Crafting
    var amethystReq = [new craftingRequirement.CraftingRequirement(quartz, 10)];
    const amethyst = new craftingItem.CraftingItem("Amethyst", "Jewel Crafting", 300, 60, rarity.Rarity.COMMON, 14, amethystReq);
    craftingRecipes.set(amethyst.name, amethyst);
    
    var pendantReq = [new craftingRequirement.CraftingRequirement(amethyst, 7), new craftingRequirement.CraftingRequirement(silver, 2)];
    const pendant = new craftingItem.CraftingItem("Pendant", "Jewel Crafting", 500, 180, rarity.Rarity.RARE, 15, pendantReq);
    craftingRecipes.set(pendant.name, pendant);
    
    var necklaceReq = [new craftingRequirement.CraftingRequirement(pendant, 3), new craftingRequirement.CraftingRequirement(gold, 2)];
    const necklace = new craftingItem.CraftingItem("Necklace", "Jewel Crafting", 500, 760, rarity.Rarity.EPIC, 16, necklaceReq);
    craftingRecipes.set(necklace.name, necklace);
    
    // Magic Crafting
    var orbReq = [new craftingRequirement.CraftingRequirement(quartz, 20)];
    const orb = new craftingItem.CraftingItem("Orb", "Magic Crafting", 300, 60, rarity.Rarity.COMMON, 17, orbReq);
    craftingRecipes.set(orb.name, orb);
    
    var waterReq = [new craftingRequirement.CraftingRequirement(orb, 2), new craftingRequirement.CraftingRequirement(silver, 1)];
    const water = new craftingItem.CraftingItem("Water", "Magic Crafting", 800, 360, rarity.Rarity.RARE, 18, waterReq);
    craftingRecipes.set(water.name, water);
    
    var fireReq = [new craftingRequirement.CraftingRequirement(orb, 6), new craftingRequirement.CraftingRequirement(gold, 1)];
    const fire = new craftingItem.CraftingItem("Fire", "Magic Crafting", 1000, 720, rarity.Rarity.EPIC, 19, fireReq);
    craftingRecipes.set(fire.name, fire);
    
    // Ancient Crafting
    var waterstoneReq = [new craftingRequirement.CraftingRequirement(water, 2), new craftingRequirement.CraftingRequirement(ribbon, 10)];
    const waterstone = new craftingItem.CraftingItem("Waterstone", "Ancient Crafting", 1500, 720, rarity.Rarity.RARE, 20, waterstoneReq);
    craftingRecipes.set(waterstone.name, waterstone);
    
    var firestoneReq = [new craftingRequirement.CraftingRequirement(fire, 1), new craftingRequirement.CraftingRequirement(sparkles, 2)];
    const firestone = new craftingItem.CraftingItem("Firestone", "Ancient Crafting", 1500, 720, rarity.Rarity.EPIC, 21, firestoneReq);
    craftingRecipes.set(firestone.name, firestone);
    
    var elementstoneReq = [new craftingRequirement.CraftingRequirement(firestone, 1), new craftingRequirement.CraftingRequirement(waterstone, 1)];
    const elementstone = new craftingItem.CraftingItem("Elementstone", "Ancient Crafting", 5000, 1440, rarity.Rarity.LEGENDARY, 22, elementstoneReq);
    craftingRecipes.set(elementstone.name, elementstone);
    
    // Ruin Crafting
    var artifactReq = [new craftingRequirement.CraftingRequirement(elementstone, 1), new craftingRequirement.CraftingRequirement(necklace, 1)];
    const artifact = new craftingItem.CraftingItem("Artifact", "Ruin Crafting", 10000, 4320, rarity.Rarity.LEGENDARY, 23, artifactReq);
    craftingRecipes.set(artifact.name, artifact);

    return craftingRecipes;
}