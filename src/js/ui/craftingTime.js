import { getCookie, setCookie } from '../utility/cookie';

export const craftingTimeCookie = "craftingTime";
export const craftingTimeCookieDefaultValue = "false";

export function useCraftingTime(){
    var cookie = getCookie(craftingTimeCookie);
    if(cookie == null){
        setCookie(craftingTimeCookie, craftingTimeCookieDefaultValue, 365);
        return false;
    }
    else{
        if(cookie === craftingTimeCookieDefaultValue){
            return false;
        }
        else{
            return true;
        }
    }
}

export function displayCraftingTime(){
    var useCTime = useCraftingTime();

    // .crafting-mode-container.hide-crafting-mode-container
    var craftingMode = document.getElementById("craftingModeContainer");
    var craftingTime = document.getElementById("craftingTime");
    if(useCTime){
        craftingMode.classList.add("hide-crafting-mode");
        craftingTime.classList.remove("hide-crafting-time");
    }
    else{
        craftingMode.classList.remove("hide-crafting-mode");
        craftingTime.classList.add("hide-crafting-time");
    }
}