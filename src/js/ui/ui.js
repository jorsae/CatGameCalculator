import { Crafting } from '../classes/crafting';
import { intToString, convertMinutes } from '../utility/utility';
import { isLightTheme, lightTheme } from '../required/themeSettings';

var event = require('./event');
var helper = require('./helper');

export var crafting = null;
export var floorRecipes = null;
var craftingTime = new Map();

export function initialize(recipes, floorRec){
    floorRecipes = floorRec;
    crafting = new Crafting(recipes);
    
    document.getElementById("howToUse").onclick = event.displayHowTo;
    document.getElementById("calculate").onclick = calculate;
    document.getElementById("quickCalculate").onclick = calculate;
    document.getElementById("addFloor").onclick = event.addFloor;
    document.getElementById("clear").onclick = event.clear;
    document.getElementById("copyClipboard").onclick = event.copyClipboard;
    
    populateCraftingItems(crafting.craftingRecipes);
    populateFloors(floorRecipes);
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
        helper.displayPopover("quickCalculate", "Nothing to calculate");
        return;
    }

    crafting.setCraftingTime(userTime);

    clearOutputTable(); // Clears the table from any input
    
    // Sets to one minute crafting mode, if user requested it.
    var oneMinCrafting = document.getElementById("crafting"); // oneMinCrafting.checked = 1min crafting
    setOneMinuteCrafting(oneMinCrafting.checked);

    var reqs = crafting.getCraftingRequirements();
    
    var table = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
    for (const [name, quantity] of reqs.entries()) {
        var item = crafting.craftingRecipes.get(name);
        item.quantity = quantity;
        createOutputTableRow(table, item, crafting.craftingTime, userBoost);
    }
    
    document.getElementById("outputTotalCost").innerText = "Total cost: " + crafting.getTotalCost(userBoost).toLocaleString();

    // Scroll down to the results
    document.getElementById("outputContainer").scrollIntoView();
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

    // Add cost cell
    var cost = item.getCost(craftingTime, boost);
    var cellCost = tableRow.insertCell(2);
    var cellNodeCost = document.createTextNode(intToString(cost));
    cellCost.appendChild(cellNodeCost);

    var craftingText = item.getCraftingMethod(craftingTime);

    // Add crafting method cell
    var cellCrafting = tableRow.insertCell(3);
    var cellNodeCrafting = document.createTextNode(craftingText);
    cellCrafting.appendChild(cellNodeCrafting);
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

    // Input field for how many to craft
    const craftingAmount = createCraftingItemInputField(item.name);
    itemDiv.appendChild(craftingAmount);

    // Creates arrows for increasing/decreasing quantity of items to craft
    const incrementContainer = createCraftingItemArrows(item.name);
    itemDiv.appendChild(incrementContainer);

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
    craftingItemInfo.appendChild(document.createTextNode('Crafting time: ' + convertMinutes(item.craftingTime)));
    
    var craftingItemDescription = document.createTextNode(descriptionText);
    craftingItemInfo.appendChild(craftingItemDescription);
    return craftingItemInfo;
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
    craftingAmount.addEventListener('input', event.craftingAmountUpdate);
    return craftingAmount;
}

function createCraftingItemArrows(name){
    const incrementContainer = document.createElement("span");

    var upArrow = document.createElement("img");
    upArrow.src = "images/arrow-up.png";
    upArrow.setAttribute("alt", "Increases amount of " + name);
    upArrow.addEventListener("click", function() { event.upClick(name); } );
    incrementContainer.appendChild(upArrow);
    
    var downArrow = document.createElement("img");
    downArrow.src = "images/arrow-down.png";
    downArrow.setAttribute("alt", "Decreases amount of " + name);
    downArrow.addEventListener("click", function() { event.downClick(name); } );
    incrementContainer.appendChild(downArrow);
    
    return incrementContainer;
}