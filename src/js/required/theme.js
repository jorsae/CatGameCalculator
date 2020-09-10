import { isDarkTheme, darkTheme } from './themeSettings';

/**
 * This file contains everything regarding colour theme
 */
const cookieName = "theme"; // Name of the cookie we set
const defaultValue = "true"; // Value of the cookie when set

// init function
$(document).ready(function(){
    checkCookie();
    swapTheme();
});

/**
 * Check if the user already have a theme set
*/
function checkCookie(){
    var cookie = getCookie(cookieName);
    console.log(cookie);
    if(cookie === undefined){
        setCookie(cookieName, defaultValue, 365);
        console.log("cookie set");
    }
    else{
        if(cookie === defaultValue){
            isDarkTheme = true;
        }
        else{
            isDarkTheme = false;
        }
    }
}

export function swapTheme(){
    var body = document.getElementsByTagName("body")
    swapThemeArray(body);

    var ths = document.getElementsByTagName("th");
    swapThemeArray(ths);

    var craftingItem = document.getElementsByClassName("crafting-item");
    swapThemeArray(craftingItem);
    
    var cookiePolicy = document.getElementsByClassName("cookie-policy");
    swapThemeArray(cookiePolicy);

    var craftingContainer = document.getElementsByClassName("crafting-container");
    swapThemeArray(craftingContainer);

    var outputContainer = document.getElementsByClassName("output-container");
    swapThemeArray(outputContainer);

    var cookiePolicyClose = document.getElementsByClassName("cookie-policy-close");
    swapThemeArray(cookiePolicyClose);
}

function swapThemeArray(elements){
    for(var i = 0; i < elements.length; i++){
        console.log(elements[i]);
        elements[i].classList.toggle(darkTheme);
    }
}

/**
 * TODO: Move this to a utility class
 * Sets a cookie
 */
function setCookie(name, value, days) {
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
