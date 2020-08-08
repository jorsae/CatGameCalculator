export function populateCraftingItems(recipes){
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

// This function creates a crafting-item with all DOM elements needed
function createCraftingItem(tier, item){
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("crafting-item");
    itemDiv.classList.add(item.rarity);

    // Creates button which act as a header and as a dropdown button for more info about the item
    const craftingItemButton = document.createElement("button"); // Button elements for the crafting items
    craftingItemButton.classList.add("crafting-item-button");
    craftingItemButton.innerHTML = item.name + ' <i class="fa fa-angle-double-down"></i>';
    itemDiv.appendChild(craftingItemButton);

    // Creates the p tag that holds item information
    //<p class="crafting-item-info" id="woodInfo"></p>
    const craftingItemInfo = document.createElement("p");
    craftingItemInfo.classList.add("crafting-item-info");
    craftingItemInfo.id = item.name + "Info";
    itemDiv.appendChild(craftingItemInfo);

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
    itemDiv.appendChild(craftingAmount);

    const incrementContainer = document.createElement("span");

    var upArrow = document.createElement("img");
    upArrow.src = "images/arrow-up.png";
    upArrow.addEventListener("click", function() { upClick(item.name); } );
    incrementContainer.appendChild(upArrow);
    
    var downArrow = document.createElement("img");
    downArrow.src = "images/arrow-down.png";
    downArrow.addEventListener("click", function() { downClick(item.name); } );
    incrementContainer.appendChild(downArrow);
    
    itemDiv.appendChild(incrementContainer);

    tier.appendChild(itemDiv);
}

function upClick(name){
    console.log("upClick: " + name);
}

function downClick(name){
    console.log("downClick: " + name);
}