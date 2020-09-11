import { getCookie, setCookie } from '../utility/cookie';

/**
 * This file contains everything regarding setting, getting cookie for cookie-consent
 */
const cookieName = "CatCookie"; // Name of the cookie we set
const cookieValue = "Yes"; // Value of the cookie when set

// init function
$(document).ready(function(){
    startCookie();
});

/**
 * Sets up cookieAccept event.
 * Call to check if the user have accepted the cookie policy already
 */
function startCookie(){
    document.getElementById("cookieAccept").onclick = cookieAccept;
    checkCookie();
}

/**
 * Check if the user have already accepted the cookie policy
*/
function checkCookie(){
    var cookie = getCookie(cookieName);
    if(cookie !== cookieValue){
        var cookieBanner = document.getElementById("cookiePolicyBanner");
        cookieBanner.style.display = "flex";
    }
}

/**
 * User accepted the cookie policy
 */
function cookieAccept(){
    setCookie(cookieName, cookieValue, 365);
    var cookieBanner = document.getElementById("cookiePolicyBanner");
    cookieBanner.style.display = "none";
}