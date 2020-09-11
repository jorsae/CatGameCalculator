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