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
    console.log("TODO: Display/hide crafting-time ui");
}