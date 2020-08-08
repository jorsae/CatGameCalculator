export class Crafting{
    constructor(){
        this.craftingList = new Map();
        this.craftingTime = 30;
    }

    addCraftingItem(item){
        var craftingItem = this.craftingList.get(item.name);
        if(craftingItem === undefined){
            this.craftingList.set(item.name, item);
        }
        else{
            craftingItem.quantity += item.quantity;
            this.craftingList.set(item.name, craftingItem);
        }
    }

    setCraftingTime(time){
        this.craftingTime = time;
    }
}