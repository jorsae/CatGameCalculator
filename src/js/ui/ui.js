import { Crafting } from '../classes/crafting';
import { intToString, convertMinutes } from '../utility/utility';

var crafting = null;
var floorRecipes = null;
var craftingTime = new Map();

export function initialize(recipes, floorRec){
    floorRecipes = floorRec;
    crafting = new Crafting(recipes);

    document.getElementById("calculate").onclick = calculate;
    document.getElementById("quickCalculate").onclick = calculate;
    document.getElementById("addFloor").onclick = addFloor;
    document.getElementById("clear").onclick = clear;
    document.getElementById("copyClipboard").onclick = copyClipboard;
    document.getElementById("howToUse").onclick = displayHowTo;

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
        for (const [name, item] of crafting.craftingRecipes.entries()) {
            item.craftingTime = craftingTime.get(name);
        }
        craftingTime.clear();
    }
}

/**
 * Function that sets up click events to display/hide How-to guide
 */
function displayHowTo(){
    const guideContainer = document.getElementById("guideContainer");
    if(guideContainer.classList.contains("guide-container-height")){
        guideContainer.classList.remove("guide-container-height");
    }
    else{
        guideContainer.classList.add("guide-container-height");
    }
}

/**
 * Puts the output table to the users clipboard.
 * We can only copy to clipboard things that are on the website itself.
 * We create a invisible div and create a clone of the table, without the first column.
 * We then copy that table and then remove the div so everything is deleted afterwards.
 */
function copyClipboard(){
    var table = document.createElement("table");

    // Add table header
    var tableHeader = document.querySelectorAll("#outputTable tr th");
    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tableRow = document.createElement("tr");
    thead.appendChild(tableRow);
    for(var i = 0; i < tableHeader.length; i++){
        var clone = tableHeader[i].cloneNode(true);
        tableRow.appendChild(clone);
    }
    thead.appendChild(tableRow);

    // Add table data
    var tableData = document.querySelectorAll("#outputTable tr td");
    var tbody = document.createElement("tbody");
    var tableRow = document.createElement("tr");
    for(var i = 0; i < tableData.length; i++){
        var clone = tableData[i].cloneNode(true);
        tableRow.appendChild(tableData[i].cloneNode(true));
        if((i % 4) === 3 && i !== 0){
            tbody.appendChild(tableRow);
            tableRow = document.createElement("tr");
        }
    }
    table.appendChild(tbody);

    // "Invisible" div to store the table we created
    var tableDiv = document.createElement("div");
    tableDiv.style = "position: absolute; top: -9999999px; opacity: 0;";
    tableDiv.appendChild(table);
    document.body.appendChild(tableDiv);

    // Puts the table in the users clipboard
    var range = document.createRange();  
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    
    document.body.removeChild(tableDiv);

    displayPopover('copyClipboard', 'Copied!');
}

function clear(){
    for (const [name, quantity] of crafting.craftingList.entries()) {
        increaseCraftingAmount(name, -quantity);
    }
    displayPopover("clear", "Cleared!");
}

function addFloor(){
    var floorElement = document.getElementById("floors");
    var floorValue = floorElement.value;
    var floor = floorRecipes.get(floorValue);

    if(floor === undefined){
        displayPopover("addFloor", "Can't add floor");
        return;
    }
    
    for(var i = 0; i < floor.requirements.length; i++){
        var itemName = floor.requirements[i][0];
        var quantity = floor.requirements[i][1];
        increaseCraftingAmount(itemName, quantity);
    }
    
    displayPopover("addFloor", "Added floor: \"" + floor + "\"");
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
        displayPopover("calculate", "Nothing to calculate");
        displayPopover("quickCalculate", "Nothing to calculate");
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

    // Add item name cell
    var cellItem = tableRow.insertCell(0);
    var cellNodeItem = document.createTextNode(item.name);
    cellItem.appendChild(cellNodeItem);

    // Add quantity cell
    var cellQuantity = tableRow.insertCell(1);
    var cellNodeQuantity = document.createTextNode(item.quantity.toLocaleString());
    cellQuantity.appendChild(cellNodeQuantity);

    // Add cost cell
    var cost = item.getCost(item.getCraftingMethod(craftingTime), boost);
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
    itemDiv.classList.add(item.rarity);
    
    // Creates button which act as a header and as a dropdown button for more info about the item
    var craftingItemLabel = createCraftingItemLabel(item.name);
    itemDiv.appendChild(craftingItemLabel);

    // Creates the p tag that holds item information
    var craftingItemInfo = createCraftingItemDescription(item);
    itemDiv.appendChild(craftingItemInfo);

    // Displays/hides crafting item description
    craftingItemLabel.onclick = () => {
        const displayCraftingItemInfoClass = "display-crafting-item-info";
        // crafting item description is visible
        if(craftingItemInfo.classList.contains(displayCraftingItemInfoClass)){
            craftingItemInfo.classList.remove(displayCraftingItemInfoClass)
        }
        else{
            craftingItemInfo.classList.add(displayCraftingItemInfoClass);
        }
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
    craftingAmount.type = "number";
    craftingAmount.value = 0;
    craftingAmount.min = 0;
    craftingAmount.addEventListener("click", function() { this.select(); });
    craftingAmount.addEventListener('input', craftingAmountUpdate);
    return craftingAmount;
}

function createCraftingItemArrows(name){
    const incrementContainer = document.createElement("span");

    var upArrow = document.createElement("img");
    upArrow.src = "images/arrow-up.png";
    upArrow.setAttribute("alt", "Increases amount of " + name);
    upArrow.addEventListener("click", function() { upClick(name); } );
    incrementContainer.appendChild(upArrow);
    
    var downArrow = document.createElement("img");
    downArrow.src = "images/arrow-down.png";
    downArrow.setAttribute("alt", "Decreases amount of " + name);
    downArrow.addEventListener("click", function() { downClick(name); } );
    incrementContainer.appendChild(downArrow);
    
    return incrementContainer;
}

function craftingAmountUpdate(e){
    var value = parseInt(e.target.value);
    crafting.setCraftingItem(e.target.id, value);
    updateCraftingAmount(e.target.id);
}

function upClick(name){
    increaseCraftingAmount(name, 1);
}

function downClick(name){
    increaseCraftingAmount(name, -1);
}

function increaseCraftingAmount(name, quantity){
    crafting.addCraftingItem(name, quantity);
    updateCraftingAmount(name)
}

function updateCraftingAmount(name){
    var value = crafting.craftingList.get(name);
    if(value === undefined){
        value = 0;
    }
    document.getElementById(name).value = value;
}

/**
 * Helper function that displays a popover on a selected item.
 * Note:
 *  For the popover to automatically close, the DOM element must have data-toggle="popover"
 *  data-placement is also nice to have :eyes:
 */
function displayPopover(id, content){
    var popElement = $('#' + id);
    popElement.attr('data-content', content);
    popElement.popover("show");
}