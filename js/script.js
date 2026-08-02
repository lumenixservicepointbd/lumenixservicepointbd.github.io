/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-01 : FOUNDATION + APP INITIALIZATION

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



"use strict";



/* ==========================================================
   APPLICATION INITIALIZATION
========================================================== */


const LUMENIX_APP = {


    name:
    "LUMENIX Version 5 Premium Ecosystem Platform",


    company:
    "MS FARDIN ELECTRIC",


    version:
    "V5.0",


    status:
    "Production Ready"


};







/* ==========================================================
   DOM READY SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        console.log(
            "LUMENIX V5 System Initialized"
        );


        initializeApp();


    }
);







/* ==========================================================
   MAIN INITIALIZER
========================================================== */


function initializeApp(){


    loadingControl();


    navigationControl();


    scrollAnimation();


}







/* ==========================================================
   GLOBAL SELECTOR FUNCTION
========================================================== */


function select(selector){


    return document.querySelector(selector);


}





function selectAll(selector){


    return document.querySelectorAll(selector);


}







/* ==========================================================
   LOADING SCREEN CONTROL
========================================================== */


function loadingControl(){


    const loader =
    select("#loading-screen");



    if(loader){


        window.addEventListener(
            "load",
            ()=>{


                loader.style.opacity="0";


                setTimeout(()=>{


                    loader.style.display="none";


                },500);



            }
        );


    }


}







/* ==========================================================
   WINDOW LOAD EVENT
========================================================== */


window.addEventListener(
    "load",
    function(){


        document.body.classList.add(
            "loaded"
        );


    }
);







/* ==========================================================
   ERROR HANDLER
========================================================== */


window.addEventListener(
    "error",
    function(event){


        console.error(
            "LUMENIX SYSTEM ERROR:",
            event.message
        );


    }
);







/* ==========================================================
   END OF JPART-01
========================================================== */
