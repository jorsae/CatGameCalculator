import { crafting, craftingKey, inventoryKey } from './ui';
import { mapToJson } from '../utility/utility';

/**
 * Helper function that displays a popover on a selected item.
 * Note:
 *  For the popover to automatically close, the DOM element must have data-toggle="popover"
 *  data-placement is also nice to have :eyes:
 */
export function displayPopover(id, content){
    var popElement = $('#' + id);
    popElement.attr('data-content', content);
    popElement.popover("show");
}

/**
 * Increases the quantity of a crafting-item to craft.
 * Note: This can also be used to decrease, by "increasing" it with a negative number.
 */
export function increaseCraftingAmount(name, quantity){
    crafting.addItemToCrafting(name, quantity);
    updateCraftingAmount(name);
}

/**
 * Updates the DOM element with the current quantity of the given crafting-item
 */
export function updateCraftingAmount(name){
    var value = crafting.craftingList.get(name);
    if(value === undefined){
        value = 0;
    }
    document.getElementById(name).value = value;
    localStorage.setItem(craftingKey, mapToJson(crafting.craftingList));
}

/**
 * Increases the quantity of a crafting-item to craft.
 * Note: This can also be used to decrease, by "increasing" it with a negative number.
 */
export function increaseInventoryAmount(name, quantity){
    crafting.addItemToInventory(name, quantity);
    updateInventoryAmount(name);
}

/**
 * Updates the DOM element with the current quantity of the given crafting-item
 */
export function updateInventoryAmount(name){
    var value = crafting.inventory.get(name);
    if(value === undefined){
        value = 0;
    }
    document.getElementById(name + 'Inventory').value = value;
    localStorage.setItem(inventoryKey, mapToJson(crafting.inventory));
}