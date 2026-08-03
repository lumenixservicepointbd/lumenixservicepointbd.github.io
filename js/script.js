
/* =====================================
J1 START
Core System Initialization
Version : LUMENIX V5.1 Premium
===================================== */

"use strict";


/* ==========================
System Information
========================== */

const SYSTEM = {

    company: "MS FARDIN ELECTRIC",

    brand: "LUMENIX",

    version: "V5.1 Premium",

    platform: "LUMENIX Ecosystem Web App"

};



/* ==========================
Application Start
========================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("================================");

    console.log(SYSTEM.company);

    console.log(SYSTEM.brand);

    console.log(SYSTEM.platform);

    console.log("Version :", SYSTEM.version);

    console.log("System Successfully Loaded");

    console.log("================================");


    initializeSystem();

});



/* ==========================
Main Function
========================== */

function initializeSystem() {

    console.log("Initializing Components...");

    console.log("Ready.");

}



/* ==========================
Future Modules
========================== */

// Navigation

// Login

// Dashboard

// Customer

// Technician

// Dealer

// Project

// Inventory

// Accounts

// Reports

// Admin



/* =====================================
J1 END
===================================== */

/* =====================================
J2 START
Mobile Navigation Menu Controller
===================================== */


const menuButton = document.getElementById("menuToggle");

const navigation = document.getElementById("mainNavigation");


if (menuButton && navigation) {

    navigation.style.display = "none";


    menuButton.addEventListener("click", function () {

        if (navigation.style.display === "block") {

            navigation.style.display = "none";

            menuButton.innerHTML = "☰ Menu";

        } else {

            navigation.style.display = "block";

            menuButton.innerHTML = "✕ Close";

        }

    });

}



/* =====================================
J2 END
===================================== */


