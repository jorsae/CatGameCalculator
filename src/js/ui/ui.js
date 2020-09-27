import { Crafting } from '../classes/crafting';
import { Rarity } from '../classes/rarity';
import { intToString, convertMinutes, jsonToMap } from '../utility/utility';
import { isLightTheme, lightTheme } from '../required/theme';
import { useInventory } from './inventory';
import { displayCraftingTime, useCraftingTime } from './craftingTime';

var event = require('./event');
var helper = require('./helper');

export var crafting = null;
export var floorRecipes = null;
export var inventoryKey = 'normalInventory';
var craftingTime = new Map();
var getCraftingModeLevel = null;

export function initialize(recipes, floorRec, key, getCraftingMode){
    floorRecipes = floorRec;
    crafting = new Crafting(recipes);
    inventoryKey = key;
    getCraftingModeLevel = getCraftingMode;
    
    document.getElementById("howToUse").onclick = event.displayHowTo;
    document.getElementById("calculate").onclick = calculate;
    document.getElementById("goToCalculations").onclick = event.goToCalculations;
    document.getElementById("addFloor").onclick = event.addFloor;
    document.getElementById("clearCrafting").onclick = event.clearCrafting;
    document.getElementById("clearInventory").onclick = event.clearInventory;
    document.getElementById("copyClipboard").onclick = event.copyClipboard;
    var checkboxInventory = document.getElementById("checkboxInventory");
    checkboxInventory.onclick = event.toggleInventory;
    if(useInventory()){
        checkboxInventory.checked = true;
    }
    var checkboxCraftingTime = document.getElementById("checkboxCraftingTime");
    if(checkboxCraftingTime !== null){
        checkboxCraftingTime.onclick = event.toggleCraftingTime;
        if(useCraftingTime()){
            checkboxCraftingTime.checked = true;
            displayCraftingTime();
        }
    }
    
    populateCraftingItems(crafting.craftingRecipes);
    populateFloors(floorRecipes);
    loadInventory();
}

function loadInventory(){
    if(useInventory()){
        document.getElementById("clearInventory").classList.remove('hide-inventory');
    }

    var inventory = localStorage.getItem(inventoryKey);
    if(inventory === null){
        return; // No saved inventory
    }
    crafting.inventory = jsonToMap(inventory);
    for (const [name, quantity] of crafting.inventory.entries()) {
        helper.updateInventoryAmount(name);
    }
}

function setOneMinuteCrafting(oneMin = true){
    if(oneMin){
        if(craftingTime.size <= 0){
            for (const [name, item] of crafting.craftingRecipes.entries()) {
                craftingTime.set(name, item.craftingTime); // Save the time for later
                item.craftingTime = 1; // Set crafting time to 1min
            }
        }
    }
    else{
        if(craftingTime.size > 0){
            for (const [name, item] of crafting.craftingRecipes.entries()) {
                item.craftingTime = craftingTime.get(name);
            }
            craftingTime.clear();
        }
    }
}

function calculate(){
    var mode = document.getElementById("craftingMode");
    if(!useCraftingTime() && mode !== null){
        var oneMinCrafting = document.getElementById("crafting"); // oneMinCrafting.checked = 1min crafting
        var craftingMode = getCraftingModeLevel(mode.value, oneMinCrafting.checked);

        crafting.massUpdateCraftingItemMaxCraftingQuantity(craftingMode);
    }
    else{
        crafting.resetCraftingItemMaxCraftingQuantity();

        var userHours = parseInt(document.getElementById("userTimeHours").value);
        var userMinutes = parseInt(document.getElementById("userTimeMinutes").value);
        var userBoost = parseFloat(document.getElementById("userTimeBoost").value);
        
        var userTime = 0;
        if(!isNaN(userHours)) {
            userTime += userHours * 60;
        }
        if(!isNaN(userMinutes)){
            userTime += userMinutes;
        }
        if(userTime <= 0){
            return; // TODO: Give error message to the user
        }
        
        if(crafting.craftingList.size <= 0){
            helper.displayPopover("calculate", "Nothing to calculate");
            return;
        }
    
        crafting.setCraftingTime(userTime);
    }


    clearOutputTable(); // Clears the table from any input
    
    // Sets to one minute crafting mode, if user requested it.
    var oneMinCrafting = document.getElementById("crafting"); // oneMinCrafting.checked = 1min crafting
    setOneMinuteCrafting(oneMinCrafting.checked);

    var reqs = crafting.getCraftingRequirements(useInventory());
    
    var table = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
    for (const [name, quantity] of reqs.entries()) {
        var item = crafting.craftingRecipes.get(name);
        item.quantity = quantity;

        createOutputTableRow(table, item, crafting.craftingTime, userBoost);
    }
    
    let totalCost = crafting.getTotalCost(userBoost, useInventory());
    document.getElementById("outputTotalCost").innerText = "Total cost: " + totalCost.toLocaleString();

    // Give message if nothing was calculated, because user already have items needed
    if(useInventory()){
        if(crafting.inventory.size > 0 && totalCost <= 0){
            document.getElementById("inventoryMessage").innerText = "You already have all items needed";
        }
        else{
            document.getElementById("inventoryMessage").innerText = "";
        }
    }
    else{
        document.getElementById("inventoryMessage").innerText = "";
    }
}

function clearOutputTable(){
    document.getElementById('outputTable').getElementsByTagName('tbody')[0].innerHTML = "";
}

function createOutputTableRow(table, item, craftingTime, boost){
    var tableRow = table.insertRow();
    if(isLightTheme()){
        tableRow.classList.add(lightTheme);
    }

    // Add item name cell
    var cellItem = tableRow.insertCell(0);
    var cellNodeItem = document.createTextNode(item.name);
    cellItem.appendChild(cellNodeItem);

    // Add quantity cell
    var cellQuantity = tableRow.insertCell(1);
    var cellNodeQuantity = document.createTextNode(item.quantity.toLocaleString());
    cellQuantity.appendChild(cellNodeQuantity);

    // Add input cell
    var cellInput = tableRow.insertCell(2);
    var craftingQuantity = crafting.craftingList.get(item.name);
    var cellInputQuantity = document.createTextNode((craftingQuantity === undefined) ? 0 : craftingQuantity);
    cellInput.appendChild(cellInputQuantity);

    // Add cost cell
    var cost = item.getCost(craftingTime, boost);
    var cellCost = tableRow.insertCell(3);
    var cellNodeCost = document.createTextNode(intToString(cost));
    cellCost.appendChild(cellNodeCost);
    
    // Add crafting method cell
    var cellCrafting = tableRow.insertCell(4);
    if(item.rarity === Rarity.RAW){
        cellCrafting.appendChild(document.createTextNode("Raw material"));
    }
    else{
        var craftingMethod = item.getCraftingMethod(craftingTime);
        if(craftingMethod.length >= 2){
            cellCrafting.appendChild(document.createTextNode(craftingMethod[0]));
            cellCrafting.appendChild(document.createElement("br"));
            cellCrafting.appendChild(document.createTextNode(craftingMethod[1]));
        }
        else{
            cellCrafting.appendChild(document.createTextNode(craftingMethod));
        }
    }

}

function populateFloors(floorRecipes){
    var select = document.getElementById("floors");
    
    for (const [name, item] of floorRecipes.entries()) {
        var option = document.createElement("option");
        option.value = name;
        option.innerHTML = item;
        select.appendChild(option);
    }
}

function populateCraftingItems(recipes){
    var craftingDiv = document.getElementById("craftingContainer");
    if(isLightTheme()){
        craftingDiv.classList.add(lightTheme);
    }

    var lastCategory = null;
    var currentTier = null;
    for (const [name, item] of recipes.entries()) {
        if(item.rarity == 'raw' || item.rarity == 'hidden'){
            continue;
        }

        if(item.category !== lastCategory){
            lastCategory = item.category;
            
            // Create and append header to #craftingContainer
            let header = createCraftingTierHeader(item.category);
            craftingDiv.appendChild(header);
            
            var tier = createCraftingTier();
            craftingDiv.appendChild(tier);
            currentTier = tier;

            createCraftingItem(currentTier, item);
        }
        else{
            createCraftingItem(currentTier, item);
        }
    }
}

function createCraftingTier(){
    var tier = document.createElement("div");
    tier.classList.add("crafting-tier");
    return tier;
}

function createCraftingTierHeader(category){
    var header = document.createElement("h2");
    var textHeader = document.createTextNode(category);
    header.appendChild(textHeader);
    return header;
}

function createCraftingItem(tier, item){
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("crafting-item");
    if(isLightTheme()){
        itemDiv.classList.add(lightTheme);
    }
    
    // Creates button which act as a header and as a dropdown button for more info about the item
    var craftingItemLabel = createCraftingItemLabel(item.name);
    itemDiv.appendChild(craftingItemLabel);

    // Creates the p tag that holds item information
    var craftingItemInfo = createCraftingItemDescription(item);
    itemDiv.appendChild(craftingItemInfo);

    // Displays/hides crafting item description
    craftingItemLabel.onclick = (e) => {
        const displayCraftingItemInfoClass = "display-crafting-item-info";
        // crafting item description is visible
        if(craftingItemInfo.classList.contains(displayCraftingItemInfoClass)){
            craftingItemInfo.classList.remove(displayCraftingItemInfoClass)
        }
        else{
            craftingItemInfo.classList.add(displayCraftingItemInfoClass);
        }
        e.preventDefault();// Stops clicking label toggling input field.
    };

    // Inventory field
    const inventory = createInventory(item.name);
    itemDiv.appendChild(inventory);

    const craftingItem = createCrafting(item.name);
    itemDiv.appendChild(craftingItem);

    tier.appendChild(itemDiv);
}

function createCraftingItemLabel(name){
    const craftingItemButton = document.createElement("label"); // Button elements for the crafting items
    craftingItemButton.setAttribute("for", name);
    craftingItemButton.classList.add("crafting-item-button");
    craftingItemButton.innerHTML = name + ' <i class="fa fa-angle-double-down"></i>';
    return craftingItemButton;
}

function createCraftingItemDescription(item){
    const craftingItemInfo = document.createElement("p");
    craftingItemInfo.classList.add("crafting-item-info");
    craftingItemInfo.id = item.name + "Info";

    var descriptionText = '';
    for(let i = 0; i < item.craftingRequirements.length; i++){
        var text = document.createTextNode(item.craftingRequirements[i]);
        craftingItemInfo.appendChild(text);
        craftingItemInfo.appendChild(document.createElement("br"));
    }
    craftingItemInfo.appendChild(document.createElement("hr"));
    craftingItemInfo.appendChild(document.createTextNode('Cost: ' + item.baseCost));
    craftingItemInfo.appendChild(document.createElement("br"));
    craftingItemInfo.appendChild(document.createTextNode('Time: ' + convertMinutes(item.craftingTime)));
    
    var craftingItemDescription = document.createTextNode(descriptionText);
    craftingItemInfo.appendChild(craftingItemDescription);
    return craftingItemInfo;
}

function createInventory(name){
    const inventoryContainer = document.createElement("span");
    inventoryContainer.classList.add('inventory');
    if(useInventory() === false){
        inventoryContainer.classList.add('hide-inventory');
    }
    
    // Header
    const inventoryHeader = document.createElement("p");
    var inventoryHeaderText = document.createTextNode("Inventory:");
    inventoryHeader.appendChild(inventoryHeaderText);
    inventoryContainer.appendChild(inventoryHeader);

    // Input field
    const inventoryAmount = createCraftingItemInputField(name + 'Inventory');
    inventoryAmount.addEventListener('input', event.inventoryAmountUpdate);
    inventoryContainer.appendChild(inventoryAmount);
    
    const upArrow = createUpArrow(name);
    upArrow.addEventListener("click", function() { event.upClickInventory(name); } );
    inventoryContainer.appendChild(upArrow);
    
    const downArrow = createDownArrow(name);
    downArrow.addEventListener("click", function() { event.downClickInventory(name); } );
    inventoryContainer.appendChild(downArrow);

    return inventoryContainer;
}

function createCrafting(name){
    const craftingContainer = document.createElement("span");
    
    // Header
    const inventoryHeader = document.createElement("p");
    var inventoryHeaderText = document.createTextNode("Crafting:");
    inventoryHeader.appendChild(inventoryHeaderText);
    craftingContainer.appendChild(inventoryHeader);

    // Input field
    const craftingAmount = createCraftingItemInputField(name);
    craftingAmount.addEventListener('input', event.craftingAmountUpdate);
    craftingContainer.appendChild(craftingAmount);
    
    const upArrow = createUpArrow(name);
    upArrow.addEventListener("click", function() { event.upClickCrafting(name); } );
    craftingContainer.appendChild(upArrow);
    
    const downArrow = createDownArrow(name);
    downArrow.addEventListener("click", function() { event.downClickCrafting(name); } );
    craftingContainer.appendChild(downArrow);

    return craftingContainer;
}

function createCraftingItemInputField(name){
    const craftingAmount = document.createElement("input");
    craftingAmount.id = name;
    craftingAmount.classList.add("crafting-item-amount");
    if(isLightTheme()){
        craftingAmount.classList.add(lightTheme);
    }
    craftingAmount.type = "number";
    craftingAmount.value = 0;
    craftingAmount.min = 0;
    craftingAmount.addEventListener("click", function() { this.select(); });
    return craftingAmount;
}

function createUpArrow(name){
    var upArrow = document.createElement("img");
    upArrow.src = "images/arrow-up.png";
    upArrow.setAttribute("alt", "Increases amount of " + name);
    return upArrow;
}

function createDownArrow(name){
    var downArrow = document.createElement("img");
    downArrow.src = "images/arrow-down.png";
    downArrow.setAttribute("alt", "Decreases amount of " + name);
    return downArrow;
}