import { crafting, floorRecipes } from './ui';
import { useInventory, useInventoryCookie, inventoryCookieDefaultValue, displayInventory } from './inventory';
import { useCraftingTime, craftingTimeCookie, craftingTimeCookieDefaultValue, displayCraftingTime } from './craftingTime';
import { setCookie } from '../utility/cookie';

var helper = require('./helper');

/**
 * Function that sets up click events to display/hide How-to guide
 */
export function displayHowTo(){
    const guideContainer = document.getElementById("guideContainer");
    guideContainer.classList.toggle("guide-container-height");
}

/**
 * Scrolls view to crafting-time-container
 */
export function goToCalculations(){
    document.getElementsByClassName("crafting-time-container")[0].scrollIntoView();
}

/**
 * Adds all crafting-item required for the floor selected.
 */
export function addFloor(){
    var floorElement = document.getElementById("floors");
    var floorValue = floorElement.value;
    var floor = floorRecipes.get(floorValue);

    if(floor === undefined){
        helper.displayPopover("addFloor", "Can't add floor");
        return;
    }
    
    for(var i = 0; i < floor.requirements.length; i++){
        var itemName = floor.requirements[i][0];
        var quantity = floor.requirements[i][1];
        helper.increaseCraftingAmount(itemName, quantity);
    }
    
    helper.displayPopover("addFloor", "Added floor: \"" + floor + "\"");
}

/**
 * Clears all "Crafting" crafting-item inputted by the user
 */
export function clearCrafting(){
    for (const [name, quantity] of crafting.craftingList.entries()) {
        helper.increaseCraftingAmount(name, -quantity);
    }

    var popupText = useInventory() ? "Cleared crafting!" : "Cleared!";
    helper.displayPopover("clearCrafting", popupText);
}

/**
* Clears all Inventory crafting-items inputted by the user
 */
export function clearInventory(){
    for (const [name, quantity] of crafting.inventory.entries()) {
        helper.increaseInventoryAmount(name, -quantity);
    }
    helper.displayPopover("clearInventory", "Inventory was cleared!");
}

/**
 * Puts the output table to the users clipboard.
 * We can only copy to clipboard things that are on the website itself.
 * We create a invisible div and create a clone of the table, without the first column.
 * We then copy that table and then remove the div so everything is deleted afterwards.
 */
export function copyClipboard(){
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

    helper.displayPopover('copyClipboard', 'Copied!');
}

/**
 * User clicks "up-arrow" to increase value of a crafting-item to craft
 */
export function upClickCrafting(name){
    helper.increaseCraftingAmount(name, 1);
}

/**
 * User clicks "down-arrow" to decrease value of a crafting-item to craft
 */
export function downClickCrafting(name){
    helper.increaseCraftingAmount(name, -1);
}

/**
 * User manually inputs a value for a crafting-item to craft
 */
export function craftingAmountUpdate(e){
    var value = parseInt(e.target.value);
    crafting.setItemToCrafting(e.target.id, value);
    helper.updateCraftingAmount(e.target.id);
}

/**
 * User clicks "up-arrow" to increase value of a crafting-item to inventory
 */
export function upClickInventory(name){
    helper.increaseInventoryAmount(name, 1);
}

/**
 * User clicks "down-arrow" to decrease value of a crafting-item to inventory
 */
export function downClickInventory(name){
    helper.increaseInventoryAmount(name, -1);
}

/**
 * User manually inputs a value for a crafting-item to inventory
 */
export function inventoryAmountUpdate(e){
    var id = e.target.id.slice(0, -9);
    var value = parseInt(e.target.value);
    crafting.setItemToInventory(id, value);
    helper.updateInventoryAmount(id);
}

/**
 * Toggles if inventory should be used or not
 */
export function toggleInventory(){
    if(useInventory()){
        setCookie(useInventoryCookie, inventoryCookieDefaultValue, 365);
    }
    else{
        setCookie(useInventoryCookie, "true", 365);
    }
    displayInventory();
}

/**
 * Toggles if crafting-time should be enabled or not
 */
export function toggleCraftingTime(){
    if(useCraftingTime()){
        setCookie(craftingTimeCookie, craftingTimeCookieDefaultValue, 365);
    }
    else{
        setCookie(craftingTimeCookie, "true", 365);
    }
    displayCraftingTime();
}