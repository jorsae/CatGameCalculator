import { jsonToMap } from '../utility/utility';

var key = "normal";

// init function
$(document).ready(function(){
    document.getElementById("tt").onclick = test;

    // TODO: This is not gonna be used untill everything is done
    // normal.html and event.html, should have this in the GET request to auto-fill the form for the user
    var key = findGetParameter('key'); // normal or event
    console.log(key);
});

function test(){
    var craftingType = document.getElementById("craftingType").value;
    console.log(craftingType);

    var craftingItems = loadCraftingItems(craftingType + "Crafting");
    console.log("craftingItems: ");
    console.log(craftingItems);

    var inventoryItems = loadCraftingItems(craftingType + "Inventory");
    console.log("Inventory: ");
    console.log(inventoryItems);
}

function loadCraftingItems(craftingKey){
    var savedCrafting = localStorage.getItem(craftingKey);
    if(savedCrafting === null){
        return new Map(); // No saved inventory
    }
    return jsonToMap(savedCrafting);
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}