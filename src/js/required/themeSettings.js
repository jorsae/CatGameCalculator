export const lightTheme = "light-theme";
export const lightThemeCookie = "lightTheme";
export const lightThemeCookieDefaultValue = "false";

/**
 * Check if the user already have a theme set
*/
export function isLightTheme(){
    var cookie = getCookie(lightThemeCookie);
    if(cookie == null){
        setCookie(lightThemeCookie, lightThemeCookieDefaultValue, 365);
        return false;
    }
    else{
        if(cookie === lightThemeCookieDefaultValue){
            return false;
        }
        else{
            return true;
        }
    }
}

/**
 * TODO: Move this to a utility class
 * Sets a cookie
 */
export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * TODO: Move this to a utility class
 * Gets a cookie by name
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}