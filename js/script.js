
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

/* =====================================
J3 START
Smooth Navigation Controller
Version : LUMENIX V5.1
===================================== */

const navLinks = document.querySelectorAll("#mainNavigation a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = this.getAttribute("href");

        if (!target || target === "#") {
            event.preventDefault();
            return;
        }

        const section = document.querySelector(target);

        if (section) {

            event.preventDefault();

            section.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

        if (window.innerWidth <= 768) {

            const navigation = document.getElementById("mainNavigation");
            const menuButton = document.getElementById("menuToggle");

            if (navigation && menuButton) {

                navigation.style.display = "none";
                menuButton.innerHTML = "☰ Menu";

            }

        }

    });

});

/* =====================================
J3 END
===================================== */

/* =====================================
J4 START
Active Navigation Highlight System
Version : LUMENIX V5.1
===================================== */

const navigationLinks = document.querySelectorAll("#mainNavigation a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigationLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/* =====================================
J4 END
===================================== */

/* =====================================
J5 START
Hero Explore Button Controller
Version : LUMENIX V5.1
===================================== */

const exploreButton = document.getElementById("exploreButton");
const ecosystemSection = document.getElementById("ecosystem");

if (exploreButton && ecosystemSection) {

    exploreButton.addEventListener("click", function () {

        ecosystemSection.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

}

/* =====================================
J5 END
===================================== */

/* =====================================
J6 START
Header Login Button Controller
Version : LUMENIX V5.1
===================================== */

const loginButton = document.getElementById("loginButton");
const loginSection = document.getElementById("login");

if (loginButton && loginSection) {

    loginButton.addEventListener("click", function () {

        loginSection.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

}

/* =====================================
J6 END
===================================== */

/* =====================================
J7 START
Login Card Controller
Version : LUMENIX V5.1
===================================== */

const loginButtons = [
    "customerLoginBtn",
    "technicianLoginBtn",
    "dealerLoginBtn",
    "employeeLoginBtn",
    "adminLoginBtn"
];

loginButtons.forEach(function (buttonId) {

    const button = document.getElementById(buttonId);

    if (button) {

        button.addEventListener("click", function () {

            alert("Login Module Coming Soon");

        });

    }

});

/* =====================================
J7 END
===================================== */

/* =====================================
J8 START
Service Card Interaction Controller
Version : LUMENIX V5.1
===================================== */


const serviceCards = document.querySelectorAll(".service-card");


serviceCards.forEach(function (card) {


    card.addEventListener("click", function () {


        const serviceName = this.innerText;


        alert(
            serviceName + " Selected. Service Booking Module Coming Soon."
        );


    });


});


/* =====================================
J8 END
===================================== */


