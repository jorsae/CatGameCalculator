/**
 * Entry point for menu js
 */
$(document).ready(function(){
    startMenu();
});

/**
 * Register the hamburger menu click event
 * Writes the version number
 */
function startMenu(){
    document.getElementById("versionNumber").innerText = "Version: " + __VERSION__;
    registerHamburgerMenu();
}

/**
 * Sets up the hamburgerMenu events
 */
function registerHamburgerMenu(){
    document.getElementById("hamburgerMenu").onclick = hamburgerMenu;
}

/**
 * Show or hides the hamburger menu, depending on the current state
 */
function hamburgerMenu(){
    var x = document.getElementById("topNav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}