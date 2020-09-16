import { getCookie, setCookie } from '../utility/cookie';

export const useInventoryCookie = 'useInventory';
export const inventoryCookieDefaultValue = "false";

export function useInventory(){
    var cookie = getCookie(useInventoryCookie);
    if(cookie == null){
        setCookie(useInventoryCookie, inventoryCookieDefaultValue, 365);
        return false;
    }
    else{
        if(cookie === inventoryCookieDefaultValue){
            return false;
        }
        else{
            return true;
        }
    }
}

export function displayInventory(){
    var display = useInventory();

    var inventories = document.getElementsByClassName('inventory');
    for(var i = 0; i < inventories.length; i++){
        if(display){
            inventories[i].classList.remove('hide-inventory');
        }
        else{
            inventories[i].classList.add('hide-inventory');
        }
    }

    document.getElementById("clearInventory").classList.toggle('hide-inventory');
}