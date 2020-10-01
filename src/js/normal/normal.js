import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var floorRecipes = getFloorRecipes();
    initialize(recipes, floorRecipes, "normal", getCraftingModeLevel);
});

function getCraftingModeLevel(level, oneMinuteCrafting){
    switch(level){
        case 'casual':
        default:
            return craftingModeCasual(oneMinuteCrafting);
        case 'semi-competitive':
            return craftingModeSemiCompetitive(oneMinuteCrafting);
        case 'competitive':
            return craftingModeCompetitive(oneMinuteCrafting);
    }
}

function craftingModeCasual(oneMinuteCrafting){
    var casual = new Map();
    if(oneMinuteCrafting){
        casual.set('String', 4);
        casual.set('Wood', 4);
        casual.set('Ribbon', 2);
        casual.set('Metal', 4);
    }
    else{
        casual.set('String', 2);
        casual.set('Wood', 2);
        casual.set('Metal', 2);
    }
    return casual;
}

function craftingModeSemiCompetitive(oneMinuteCrafting){
    var semiComp = new Map();
    if(oneMinuteCrafting){
        semiComp.set('String', 6);
        semiComp.set('Wood', 6);
        semiComp.set('Ribbon', 3);
        semiComp.set('Metal', 8);
        semiComp.set('Needles', 2);
        semiComp.set('Sparkles', 1);
        semiComp.set('Bronze', 3);
        semiComp.set('Orb', 2);
    }
    else{
        semiComp.set('String', 4);
        semiComp.set('Wood', 4);
        semiComp.set('Ribbon', 2);
        semiComp.set('Metal', 4);
        semiComp.set('Bronze', 2);
    }
    return semiComp;
}

function craftingModeCompetitive(oneMinuteCrafting){
    var comp = new Map();
    if(oneMinuteCrafting){
        comp.set('String', 10);
        comp.set('Wood', 10);
        comp.set('Ribbon', 5);
        comp.set('Metal', 12);
        comp.set('Needles', 3);
        comp.set('Bronze', 4);
        comp.set('Amethyst', 2);
        comp.set('Orb', 2);
    }
    else{
        comp.set('String', 8);
        comp.set('Wood', 8);
        comp.set('Ribbon', 4);
        comp.set('Metal', 8);
        comp.set('Needles', 4);
        comp.set('Bronze', 4);
        comp.set('Amethyst', 2);
        comp.set('Orb', 2);
    }
    return comp;
}