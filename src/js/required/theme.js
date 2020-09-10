import { isLightTheme, lightTheme, lightThemeCookie, lightThemeCookieDefaultValue, setCookie } from './themeSettings';

/**
 * This file contains everything regarding colour theme
 */

// init function
$(document).ready(function(){
    var lightTheme = isLightTheme();
    setTheme();
    
    var checkboxLightTheme = document.getElementById("checkboxLightTheme");
    checkboxLightTheme.onclick = toggleLightTheme;
    checkboxLightTheme.checked = lightTheme;
});

function toggleLightTheme(){
    var checkboxLightTheme = document.getElementById("checkboxLightTheme");
    if(checkboxLightTheme.checked){
        setCookie(lightThemeCookie, "true", 365);
    }
    else{
        setCookie(lightThemeCookie, lightThemeCookieDefaultValue, 365);
    }
    setTheme();
}

function setTheme(){
    var light = isLightTheme();
    var body = document.getElementsByTagName("body")
    setThemeArray(body, light);

    var ths = document.getElementsByTagName("th");
    setThemeArray(ths, light);

    var craftingItem = document.getElementsByClassName("crafting-item");
    setThemeArray(craftingItem, light);

    var craftingItemAmount = document.getElementsByClassName("crafting-item-amount");
    setThemeArray(craftingItemAmount, light);
    
    var cookiePolicy = document.getElementsByClassName("cookie-policy");
    setThemeArray(cookiePolicy, light);

    var craftingContainer = document.getElementsByClassName("crafting-container");
    setThemeArray(craftingContainer, light);

    var outputContainer = document.getElementsByClassName("output-container");
    setThemeArray(outputContainer, light);

    var cookiePolicyClose = document.getElementsByClassName("cookie-policy-close");
    setThemeArray(cookiePolicyClose, light);

    var rawMaterial = document.getElementsByClassName("raw-material");
    setThemeArray(rawMaterial, light);

    var rawMaterialSelected = document.getElementsByClassName("selected-raw-material");
    setThemeArray(rawMaterialSelected, light);
}

function setThemeArray(elements, light){
    for(var i = 0; i < elements.length; i++){
        if(light){
            elements[i].classList.add(lightTheme);
        }
        else{
            elements[i].classList.remove(lightTheme);
        }
    }
}