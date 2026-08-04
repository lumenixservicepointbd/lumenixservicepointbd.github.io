
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

/* =====================================
J9 START
Service Booking Controller
Version : LUMENIX V5.1
===================================== */


const selectServiceBtn = document.getElementById("selectServiceBtn");
const selectLocationBtn = document.getElementById("selectLocationBtn");
const bookNowBtn = document.getElementById("bookNowBtn");


if(selectServiceBtn){

    selectServiceBtn.addEventListener("click", function(){

        alert("Please select your required service.");

    });

}


if(selectLocationBtn){

    selectLocationBtn.addEventListener("click", function(){

        alert("Location selection module coming soon.");

    });

}


if(bookNowBtn){

    bookNowBtn.addEventListener("click", function(){

        alert("Your service booking request is being prepared.");

    });

}


/* =====================================
J9 END
===================================== */

/* =====================================
J10 START
Technician Network Controller
Version : LUMENIX V5.1
===================================== */


const findTechnicianBtn = document.getElementById("findTechnicianBtn");


if(findTechnicianBtn){

    findTechnicianBtn.addEventListener("click", function(){

        alert("Finding verified LUMENIX technicians in your area.");

    });

}


/* =====================================
J10 END
===================================== */

/* =====================================
J11 START
Dealer Network Controller
Version : LUMENIX V5.1
===================================== */


const becomeDealerBtn = document.getElementById("becomeDealerBtn");
const dealerLoginBtn2 = document.getElementById("dealerLoginBtn2");
const findDealerBtn = document.getElementById("findDealerBtn");


if(becomeDealerBtn){

    becomeDealerBtn.addEventListener("click", function(){

        alert("Dealer Registration Module Coming Soon.");

    });

}


if(dealerLoginBtn2){

    dealerLoginBtn2.addEventListener("click", function(){

        alert("Dealer Login Module Coming Soon.");

    });

}


if(findDealerBtn){

    findDealerBtn.addEventListener("click", function(){

        alert("Finding verified LUMENIX dealers.");

    });

}


/* =====================================
J11 END
===================================== */

/* =====================================
J12 START
Technical Training Centre Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Training Logo Check
========================== */

const trainingLogo = document.querySelector(".training-logo img");


if(trainingLogo){

    trainingLogo.addEventListener("load", function(){

        console.log("Training Centre Logo Loaded Successfully");

    });


    trainingLogo.addEventListener("error", function(){

        console.log("Training Centre Logo Not Found. Check images/training-logo.png");

    });

}



/* ==========================
Training Module Buttons
========================== */


const studentRegisterBtn = document.getElementById("studentRegisterBtn");

const viewCoursesBtn = document.getElementById("viewCoursesBtn");

const joinNetworkBtn = document.getElementById("joinNetworkBtn");



if(studentRegisterBtn){

    studentRegisterBtn.addEventListener("click", function(){

        alert("Student Registration Module Coming Soon.");

    });

}




if(viewCoursesBtn){

    viewCoursesBtn.addEventListener("click", function(){

        alert("Course Management Module Coming Soon.");

    });

}




if(joinNetworkBtn){

    joinNetworkBtn.addEventListener("click", function(){

        alert("Graduate Network Module Coming Soon.");

    });

}



/* =====================================
J12 END
===================================== */

/* =====================================
J13 START
Business Growth Flow Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Growth Flow Card Controller
========================== */


const growthCards = document.querySelectorAll(".growth-card");


growthCards.forEach(function(card){


    card.addEventListener("click", function(){


        const growthTitle = this.querySelector("h3");


        if(growthTitle){


            alert(
                growthTitle.innerText + 
                " Selected. Growth Module Coming Soon."
            );


        }


    });


});



/* =====================================
J13 END
===================================== */

/* =====================================
J14 START
Trust & Platform Feature Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Trust Card Interaction
========================== */


const trustCards = document.querySelectorAll(".trust-card");


trustCards.forEach(function(card){


    card.addEventListener("click", function(){


        const featureTitle = this.querySelector("h3");


        if(featureTitle){


            alert(
                featureTitle.innerText +
                " Information Module Coming Soon."
            );


        }


    });


});



/* =====================================
J14 END
===================================== */
/* =====================================
J15 START
Customer Service Booking Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Booking Buttons Controller
========================== */


const selectServiceBtn = document.getElementById("selectServiceBtn");

const selectLocationBtn = document.getElementById("selectLocationBtn");

const bookNowBtn = document.getElementById("bookNowBtn");



if(selectServiceBtn){

    selectServiceBtn.addEventListener("click", function(){

        alert(
            "Service Selection Opened."
        );

    });

}



if(selectLocationBtn){

    selectLocationBtn.addEventListener("click", function(){

        alert(
            "Location Selection Module Coming Soon."
        );

    });

}



if(bookNowBtn){

    bookNowBtn.addEventListener("click", function(){

        alert(
            "Your Service Booking Request Has Been Received."
        );

    });

}



/* =====================================
J15 END
===================================== */


/* =====================================
J16 START
Technician & Dealer Registration Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Registration Buttons
========================== */


const technicianRegisterBtn = document.getElementById("technicianRegisterBtn");

const dealerRegisterBtn = document.getElementById("dealerRegisterBtn");



if(technicianRegisterBtn){

    technicianRegisterBtn.addEventListener("click", function(){

        alert(
            "Technician Registration Module Coming Soon."
        );

    });

}



if(dealerRegisterBtn){

    dealerRegisterBtn.addEventListener("click", function(){

        alert(
            "Dealer Registration Module Coming Soon."
        );

    });

}



/* =====================================
J16 END
===================================== */

/* =====================================
J17 START
Product & Business Showcase Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Product Card Controller
========================== */


const productCards = document.querySelectorAll(".product-card");


productCards.forEach(function(card){


    card.addEventListener("click", function(){


        const productTitle = this.querySelector("h3");


        if(productTitle){


            alert(
                productTitle.innerText +
                " Selected. Product Details Coming Soon."
            );


        }


    });


});



/* =====================================
J17 END
===================================== */

/* =====================================
J18 START
Statistics & Achievement Controller
Version : LUMENIX V5.1
===================================== */


/* ==========================
Statistics Counter Effect
========================== */


const statsCards = document.querySelectorAll(".stats-card");


statsCards.forEach(function(card){


    card.addEventListener("click", function(){


        const number = this.querySelector("h3");

        const title = this.querySelector("p");


        if(number && title){


            alert(
                title.innerText +
                " : " +
                number.innerText
            );


        }


    });


});



/* =====================================
J18 END
===================================== */






