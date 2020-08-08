export function populateCraftingItems(parentElement, recipes){
    // TODO: This should call createCraftingItem for each element in the recipes that is not RAW or HIDDEN rarity.
    // it should also create the rest of the elements needed, fr example for each caategory.
}

// This function creates a crafting-item with all DOM elements needed
export function createCraftingItem(element, item){
    // Creates button which act as a header and as a dropdown button for more info about the item
    const craftingItemButton = document.createElement("button"); // Button elements for the crafting items
    craftingItemButton.classList.add("crafting-item-button");
    craftingItemButton.innerHTML = item.name + ' <i class="fa fa-angle-double-down"></i>';
    element.appendChild(craftingItemButton);

    // Creates the p tag that holds item information
    //<p class="crafting-item-info" id="woodInfo"></p>
    const craftingItemInfo = document.createElement("p");
    craftingItemInfo.classList.add("crafting-item-info");
    craftingItemInfo.id = item.name + "Info";
    element.appendChild(craftingItemInfo);

    // Input field for how many to craft
    // <input id="WoodAmount" class="crafting-item-amount" aria-label="Amount of wood you want to craft"
    //type="number" value="0" min="0" onclick="this.select()"></input>
    const craftingAmount = document.createElement("input");
    craftingAmount.id = item.name + "Amount";
    craftingAmount.classList.add("crafting-item-amount");
    craftingAmount.type = "number";
    craftingAmount.value = 0;
    craftingAmount.min = 0;
    craftingAmount.addEventListener("click", function() { this.select(); });
    element.appendChild(craftingAmount);

    const incrementContainer = document.createElement("span");

    var upArrow = document.createElement("img");
    upArrow.src = "images/arrow-up.png";
    upArrow.addEventListener("click", function() { upClick(item.name); } );
    incrementContainer.appendChild(upArrow);
    
    var downArrow = document.createElement("img");
    downArrow.src = "images/arrow-down.png";
    downArrow.addEventListener("click", function() { downClick(item.name); } );
    incrementContainer.appendChild(downArrow);
    
    element.appendChild(incrementContainer);
}

function upClick(name){
    console.log("upClick: " + name);
}

function downClick(name){
    console.log("downClick: " + name);
}