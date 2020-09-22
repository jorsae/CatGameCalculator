import { getCraftingRecipes } from './recipes';
import { initialize } from '../ui/ui';
import { getFloorRecipes } from './floorRecipes';

// init function
$(document).ready(function(){
    const recipes = getCraftingRecipes();
    var floorRecipes = getFloorRecipes();
    initialize(recipes, floorRecipes, "normalInventory");
});

function getCraftingMethodLevel(level){
    switch(level){
        case 'casual':
        default:
            return craftingMethodCasual();
        case 'semi-competitive':
            return craftingMethodSemiCompetitive();
        case 'competitive':
            return craftingMethodCompetitive();
    }
}

function craftingMethodCasual(){
    var casual = new Map();
    casual.set('String', 2);
    casual.set('Wood', 2);
    casual.set('Metal', 2);
    return casual;
}

function craftingMethodSemiCompetitive(){
    var semiComp = new Map();
    semiComp.set('String', 4);
    semiComp.set('Wood', 4);
    semiComp.set('Ribbon', 2);
    semiComp.set('Metal', 4);
    semiComp.set('Needles', 2);
    semiComp.set('Bronze', 2);
    return semiComp;
}

function craftingMethodCompetitive(){
    var comp = new Map();
    comp.set('String', 8);
    comp.set('Wood', 8);
    comp.set('Ribbon', 4);
    comp.set('Metal', 8);
    comp.set('Needles', 4);
    comp.set('Bronze', 4);
    comp.set('Amethyst', 2);
    comp.set('Orb', 2);
    return comp;
}