/* ======================================================
   J1 : LOADING SCREEN START
====================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(function () {

            loader.style.display = "none";

        }, 500);

    }, 1000);

});

/* ======================================================
   J1 : LOADING SCREEN END
====================================================== */
/* ======================================================
   J2 : MOBILE MENU FUNCTION
====================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });

}

/* ======================================================
   J2 END
====================================================== */
/* ======================================================
   J16 : ONLINE TECHNICIAN REGISTRATION FORM
====================================================== */

const registrationForm = document.querySelector(".registration-form");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Your registration request has been submitted successfully.");

        registrationForm.reset();

    });

}

/* ======================================================
   J16 END
====================================================== */
/* ======================================================
   J26 : PREMIUM FOOTER
====================================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}

/* ======================================================
   J26 END
====================================================== */

/* ======================================================
   J27 : BUSINESS PARTNER REGISTRATION
====================================================== */

const partnerForm = document.querySelector("#partner-registration .registration-form");

if (partnerForm) {

    partnerForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("Business Partner Registration submitted successfully.");

        partnerForm.reset();

    });

}

/* ======================================================
   J27 END
====================================================== */
/* ======================================================
   J28 : HTML END / GLOBAL FUNCTIONS
====================================================== */


/* Current Year Auto Update */

const yearElement = document.getElementById("current-year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* ======================================================
   J28 END
====================================================== */
