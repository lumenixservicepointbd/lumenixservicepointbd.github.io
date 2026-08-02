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
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-02 : MOBILE MENU + NAVIGATION SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   MOBILE MENU CONTROL
========================================================== */


function navigationControl(){


    const menuToggle =
    select(".menu-toggle");


    const navMenu =
    select(".nav-menu");



    if(menuToggle && navMenu){


        menuToggle.addEventListener(
            "click",
            function(){


                navMenu.classList.toggle(
                    "active"
                );


                menuToggle.classList.toggle(
                    "open"
                );


            }
        );


    }



    closeMobileMenu();


}







/* ==========================================================
   CLOSE MENU AFTER CLICK
========================================================== */


function closeMobileMenu(){


    const navLinks =
    selectAll(".nav-menu a");


    const navMenu =
    select(".nav-menu");



    navLinks.forEach(
        function(link){


            link.addEventListener(
                "click",
                function(){


                    if(navMenu){


                        navMenu.classList.remove(
                            "active"
                        );


                    }


                }
            );


        }
    );


}







/* ==========================================================
   HEADER SCROLL EFFECT
========================================================== */


window.addEventListener(
    "scroll",
    function(){


        const header =
        select("#header");



        if(header){


            if(window.scrollY > 50){


                header.classList.add(
                    "scrolled"
                );


            }
            else{


                header.classList.remove(
                    "scrolled"
                );


            }


        }


    }
);







/* ==========================================================
   ACTIVE NAVIGATION SYSTEM
========================================================== */


function activeNavigation(){


    const sections =
    selectAll("section");


    const navLinks =
    selectAll(".nav-menu a");



    window.addEventListener(
        "scroll",
        function(){


            let current = "";



            sections.forEach(
                function(section){


                    const sectionTop =
                    section.offsetTop - 150;



                    if(
                        window.scrollY >= sectionTop
                    ){


                        current =
                        section.getAttribute(
                            "id"
                        );


                    }


                }
            );



            navLinks.forEach(
                function(link){


                    link.classList.remove(
                        "active"
                    );



                    if(
                        link.getAttribute("href")
                        ===
                        "#"+current
                    ){


                        link.classList.add(
                            "active"
                        );


                    }


                }
            );


        }
    );


}





activeNavigation();







/* ==========================================================
   END OF JPART-02
========================================================== */

/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-03 : SCROLL ANIMATION + REVEAL SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   SCROLL REVEAL INITIALIZATION
========================================================== */


function scrollAnimation(){


    const revealElements =
    selectAll(".reveal");



    if(revealElements.length === 0){

        return;

    }



    const revealObserver =
    new IntersectionObserver(
        function(entries){


            entries.forEach(
                function(entry){


                    if(entry.isIntersecting){


                        entry.target.classList.add(
                            "active"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );


                    }


                }
            );


        },
        {

            threshold:0.15

        }
    );



    revealElements.forEach(
        function(element){


            revealObserver.observe(
                element
            );


        }
    );


}







/* ==========================================================
   FADE UP ANIMATION CONTROL
========================================================== */


function fadeAnimation(){


    const items =
    selectAll(
        ".fade-up"
    );



    items.forEach(
        function(item,index){


            setTimeout(
                function(){


                    item.style.opacity="1";


                    item.style.transform=
                    "translateY(0)";


                },
                index * 100
            );


        }
    );


}







/* ==========================================================
   IMAGE LAZY LOAD SYSTEM
========================================================== */


function imageLazyLoad(){


    const images =
    selectAll(
        "img[data-src]"
    );



    images.forEach(
        function(image){


            image.src =
            image.dataset.src;



            image.removeAttribute(
                "data-src"
            );


        }
    );


}







/* ==========================================================
   SCROLL TO TOP BUTTON
========================================================== */


function scrollTopButton(){


    const button =
    select(
        "#scroll-top"
    );



    if(!button){

        return;

    }



    window.addEventListener(
        "scroll",
        function(){


            if(window.scrollY > 400){


                button.classList.add(
                    "show"
                );


            }
            else{


                button.classList.remove(
                    "show"
                );


            }


        }
    );



    button.addEventListener(
        "click",
        function(){


            window.scrollTo(
                {

                    top:0,

                    behavior:"smooth"

                }
            );


        }
    );


}







/* ==========================================================
   RUN UI EFFECTS
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        fadeAnimation();


        imageLazyLoad();


        scrollTopButton();


    }
);







/* ==========================================================
   END OF JPART-03
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-04 : COUNTER ANIMATION + STATISTICS SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   NUMBER COUNTER FUNCTION
========================================================== */


function animateCounter(element){


    const target =
    Number(
        element.dataset.count
    );



    let current = 0;



    const speed = 
    Math.max(
        20,
        target / 100
    );



    const updateCounter = ()=>{


        current += speed;



        if(current < target){


            element.innerText =
            Math.floor(current);



            requestAnimationFrame(
                updateCounter
            );


        }
        else{


            element.innerText =
            target + "+";


        }


    };



    updateCounter();


}







/* ==========================================================
   COUNTER OBSERVER SYSTEM
========================================================== */


function counterSystem(){


    const counters =
    selectAll(
        "[data-count]"
    );



    if(counters.length === 0){

        return;

    }



    const counterObserver =
    new IntersectionObserver(
        function(entries){


            entries.forEach(
                function(entry){


                    if(entry.isIntersecting){


                        animateCounter(
                            entry.target
                        );


                        counterObserver.unobserve(
                            entry.target
                        );


                    }


                }
            );


        },
        {

            threshold:0.5

        }
    );



    counters.forEach(
        function(counter){


            counterObserver.observe(
                counter
            );


        }
    );


}







/* ==========================================================
   PROGRESS BAR ANIMATION
========================================================== */


function progressAnimation(){


    const progressBars =
    selectAll(
        ".progress-bar"
    );



    progressBars.forEach(
        function(bar){


            const value =
            bar.dataset.progress;



            bar.style.width =
            value + "%";


        }
    );


}







/* ==========================================================
   BUSINESS STATISTICS UPDATE
========================================================== */


function updateBusinessStats(){


    const stats =
    {


        projects:
        12,


        technicians:
        100,


        customers:
        500,


        experience:
        10


    };



    return stats;


}







/* ==========================================================
   INITIALIZE COUNTER SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        counterSystem();


        progressAnimation();


    }
);







/* ==========================================================
   END OF JPART-04
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-05 : FORM VALIDATION + SERVICE REQUEST SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   FORM VALIDATION SYSTEM
========================================================== */


function validateForm(form){


    let valid = true;



    const inputs =
    form.querySelectorAll(
        "input[required], textarea[required], select[required]"
    );



    inputs.forEach(
        function(input){


            if(input.value.trim() === ""){


                input.classList.add(
                    "error"
                );


                valid = false;


            }
            else{


                input.classList.remove(
                    "error"
                );


            }


        }
    );



    return valid;


}







/* ==========================================================
   CONTACT FORM SYSTEM
========================================================== */


function contactFormSystem(){


    const form =
    select(
        ".contact-form"
    );



    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            if(validateForm(form)){


                showMessage(
                    "Your service request has been submitted successfully."
                );


                form.reset();


            }
            else{


                showMessage(
                    "Please complete all required fields."
                );


            }


        }
    );


}







/* ==========================================================
   TECHNICIAN REGISTRATION SYSTEM
========================================================== */


function technicianRegistration(){


    const form =
    select(
        ".technician-form"
    );



    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            if(validateForm(form)){


                showMessage(
                    "Technician registration completed successfully."
                );


                form.reset();


            }


        }
    );


}







/* ==========================================================
   DEALER REGISTRATION SYSTEM
========================================================== */


function dealerRegistration(){


    const form =
    select(
        ".dealer-form"
    );



    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            if(validateForm(form)){


                showMessage(
                    "Dealer application submitted successfully."
                );


                form.reset();


            }


        }
    );


}







/* ==========================================================
   MESSAGE SYSTEM
========================================================== */


function showMessage(message){


    alert(
        message
    );


}







/* ==========================================================
   INPUT CLEAN SYSTEM
========================================================== */


function inputProtection(){


    const inputs =
    selectAll(
        "input, textarea"
    );



    inputs.forEach(
        function(input){


            input.addEventListener(
                "input",
                function(){


                    this.classList.remove(
                        "error"
                    );


                }
            );


        }
    );


}







/* ==========================================================
   INITIALIZE FORM SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        contactFormSystem();


        technicianRegistration();


        dealerRegistration();


        inputProtection();


    }
);







/* ==========================================================
   END OF JPART-05
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-06 : CUSTOMER DASHBOARD + SERVICE TRACKING SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   CUSTOMER DASHBOARD INITIALIZATION
========================================================== */


function customerDashboard(){


    const dashboard =
    select(
        ".customer-dashboard-section"
    );



    if(!dashboard){

        return;

    }



    loadCustomerData();


    serviceTracking();


}







/* ==========================================================
   CUSTOMER DATA SYSTEM
========================================================== */


function loadCustomerData(){


    const customerData =
    {


        name:
        "Customer",


        totalService:
        0,


        completedService:
        0,


        pendingService:
        0


    };



    updateDashboardCards(
        customerData
    );


}







/* ==========================================================
   UPDATE DASHBOARD CARDS
========================================================== */


function updateDashboardCards(data){


    const serviceCount =
    select(
        "#service-count"
    );


    const completeCount =
    select(
        "#complete-count"
    );


    const pendingCount =
    select(
        "#pending-count"
    );



    if(serviceCount){

        serviceCount.innerText =
        data.totalService;

    }



    if(completeCount){

        completeCount.innerText =
        data.completedService;

    }



    if(pendingCount){

        pendingCount.innerText =
        data.pendingService;

    }


}







/* ==========================================================
   SERVICE TRACKING SYSTEM
========================================================== */


function serviceTracking(){


    const status =
    select(
        ".service-status"
    );



    if(!status){

        return;

    }



    const serviceStatus = {


        received:
        true,


        assigned:
        false,


        completed:
        false


    };



    if(serviceStatus.received){


        status.innerText =
        "Request Received";


        status.classList.add(
            "received"
        );


    }


}







/* ==========================================================
   BOOKING CARD CONTROL
========================================================== */


function bookingControl(){


    const buttons =
    selectAll(
        ".booking-btn"
    );



    buttons.forEach(
        function(button){


            button.addEventListener(
                "click",
                function(){


                    showMessage(
                        "Service booking request started."
                    );


                }
            );


        }
    );


}







/* ==========================================================
   CUSTOMER NOTIFICATION SYSTEM
========================================================== */


function customerNotification(message){


    const notification =
    select(
        ".dashboard-notification"
    );



    if(notification){


        notification.innerText =
        message;


        notification.classList.add(
            "active"
        );


    }


}







/* ==========================================================
   INITIALIZE CUSTOMER SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        customerDashboard();


        bookingControl();


    }
);







/* ==========================================================
   END OF JPART-06
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-07 : DEALER + TECHNICIAN NETWORK MANAGEMENT SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   TECHNICIAN NETWORK SYSTEM
========================================================== */


function technicianNetwork(){


    const technicianSection =
    select(
        ".technician-section"
    );



    if(!technicianSection){

        return;

    }



    loadTechnicianData();


}







/* ==========================================================
   TECHNICIAN DATA STRUCTURE
========================================================== */


function loadTechnicianData(){


    const technicians = [


        {


            id:1,


            name:
            "Verified Technician",


            status:
            "Active"


        }


    ];



    return technicians;


}







/* ==========================================================
   TECHNICIAN VERIFICATION
========================================================== */


function verifyTechnician(status){


    if(status === "Active"){


        return {


            verified:true,


            badge:
            "Verified Technician"


        };


    }



    return {


        verified:false,


        badge:
        "Pending Verification"


    };


}







/* ==========================================================
   DEALER NETWORK SYSTEM
========================================================== */


function dealerNetwork(){


    const dealerSection =
    select(
        ".dealer-section"
    );



    if(!dealerSection){

        return;

    }



    loadDealerData();


}







/* ==========================================================
   DEALER DATA STRUCTURE
========================================================== */


function loadDealerData(){


    const dealers = [


        {


            id:1,


            name:
            "LUMENIX Partner Dealer",


            status:
            "Approved"


        }


    ];



    return dealers;


}







/* ==========================================================
   PARTNER STATUS CHECK
========================================================== */


function partnerStatus(status){


    const approved =
    status === "Approved";



    return {


        active:approved,


        message:
        approved
        ?
        "Authorized Partner"
        :
        "Under Review"


    };


}







/* ==========================================================
   NETWORK SEARCH SYSTEM
========================================================== */


function networkSearch(keyword){


    const result =
    {


        keyword:keyword,


        message:
        "Searching LUMENIX Network..."


    };



    return result;


}







/* ==========================================================
   NETWORK INITIALIZATION
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        technicianNetwork();


        dealerNetwork();


    }
);







/* ==========================================================
   END OF JPART-07
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-08 : PRODUCT + INVENTORY MANAGEMENT SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   PRODUCT DATABASE STRUCTURE
========================================================== */


const LUMENIX_PRODUCTS = [


    {


        id:1,


        name:
        "LUMENIX LED Light 5W",


        category:
        "LED",


        stock:
        500,


        status:
        "Available"


    },


    {


        id:2,


        name:
        "LUMENIX LED Light 7W",


        category:
        "LED",


        stock:
        500,


        status:
        "Available"


    },


    {


        id:3,


        name:
        "LUMENIX LED Light 12W",


        category:
        "LED",


        stock:
        500,


        status:
        "Available"


    }


];







/* ==========================================================
   PRODUCT DISPLAY SYSTEM
========================================================== */


function productSystem(){


    const productArea =
    select(
        ".products-grid"
    );



    if(!productArea){

        return;

    }



    displayProducts(
        LUMENIX_PRODUCTS
    );


}







/* ==========================================================
   RENDER PRODUCTS
========================================================== */


function displayProducts(products){


    const productArea =
    select(
        ".products-grid"
    );



    if(!productArea){

        return;

    }



    productArea.innerHTML="";



    products.forEach(
        function(product){


            const card =
            document.createElement(
                "div"
            );



            card.className =
            "product-card";



            card.innerHTML = `

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Category:
                    ${product.category}
                </p>

                <p>
                    Stock:
                    ${product.stock}
                </p>

                <button class="product-btn">
                    View Product
                </button>

            `;



            productArea.appendChild(
                card
            );


        }
    );


}







/* ==========================================================
   PRODUCT SEARCH SYSTEM
========================================================== */


function searchProduct(keyword){


    const result =
    LUMENIX_PRODUCTS.filter(
        function(product){


            return product.name
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            );


        }
    );



    displayProducts(
        result
    );


}







/* ==========================================================
   INVENTORY CONTROL SYSTEM
========================================================== */


function updateStock(id,quantity){


    const product =
    LUMENIX_PRODUCTS.find(
        function(item){


            return item.id === id;


        }
    );



    if(product){


        product.stock =
        quantity;


    }



    return product;


}







/* ==========================================================
   PRODUCT FILTER
========================================================== */


function filterProduct(category){


    const filtered =
    LUMENIX_PRODUCTS.filter(
        function(product){


            return product.category
            ===
            category;


        }
    );



    displayProducts(
        filtered
    );


}







/* ==========================================================
   INITIALIZE PRODUCT SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        productSystem();


    }
);







/* ==========================================================
   END OF JPART-08
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-09 : SERVICE BOOKING + ORDER MANAGEMENT SYSTEM

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   SERVICE DATABASE
========================================================== */


const LUMENIX_SERVICES = [


    {


        id:1,


        name:
        "Electrical Service",


        category:
        "Electrical",


        status:
        "Available"


    },


    {


        id:2,


        name:
        "LED Light Installation",


        category:
        "LED",


        status:
        "Available"


    },


    {


        id:3,


        name:
        "CCTV Installation",


        category:
        "Security",


        status:
        "Available"


    }


];







/* ==========================================================
   BOOKING DATABASE
========================================================== */


let SERVICE_BOOKINGS = [];







/* ==========================================================
   CREATE SERVICE BOOKING
========================================================== */


function createBooking(customer){


    const booking = {


        id:
        Date.now(),


        customer:
        customer.name,


        phone:
        customer.phone,


        service:
        customer.service,


        status:
        "Pending",


        date:
        new Date()
        .toLocaleDateString()


    };



    SERVICE_BOOKINGS.push(
        booking
    );



    return booking;


}







/* ==========================================================
   SERVICE STATUS UPDATE
========================================================== */


function updateBookingStatus(
    bookingID,
    status
){


    const booking =
    SERVICE_BOOKINGS.find(
        function(item){


            return item.id
            ===
            bookingID;


        }
    );



    if(booking){


        booking.status =
        status;


    }



    return booking;


}







/* ==========================================================
   DISPLAY BOOKING LIST
========================================================== */


function displayBookings(){


    const bookingArea =
    select(
        ".booking-list"
    );



    if(!bookingArea){

        return;

    }



    bookingArea.innerHTML="";



    SERVICE_BOOKINGS.forEach(
        function(booking){


            const item =
            document.createElement(
                "div"
            );



            item.className =
            "booking-card";



            item.innerHTML = `

                <h4>
                    ${booking.service}
                </h4>

                <p>
                    Customer:
                    ${booking.customer}
                </p>

                <span>
                    Status:
                    ${booking.status}
                </span>

            `;



            bookingArea.appendChild(
                item
            );


        }
    );


}







/* ==========================================================
   SERVICE SEARCH
========================================================== */


function searchService(keyword){


    return LUMENIX_SERVICES.filter(
        function(service){


            return service.name
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            );


        }
    );


}







/* ==========================================================
   BOOKING FORM SYSTEM
========================================================== */


function bookingFormSystem(){


    const form =
    select(
        ".booking-form"
    );



    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            const data = {


                name:
                form.querySelector(
                    "[name='name']"
                ).value,


                phone:
                form.querySelector(
                    "[name='phone']"
                ).value,


                service:
                form.querySelector(
                    "[name='service']"
                ).value


            };



            createBooking(
                data
            );



            displayBookings();


            form.reset();


        }
    );


}







/* ==========================================================
   INITIALIZE SERVICE SYSTEM
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        bookingFormSystem();


    }
);







/* ==========================================================
   END OF JPART-09
========================================================== */
/* ==========================================================
   LUMENIX VERSION 5 PREMIUM ECOSYSTEM PLATFORM

   JAVASCRIPT MASTER

   JPART-10 : ADMIN PANEL CONTROL SYSTEM FOUNDATION

   VERSION  : V5.0
   OWNER    : MS FARDIN ELECTRIC

========================================================== */



/* ==========================================================
   ADMIN USER DATABASE STRUCTURE
========================================================== */


const LUMENIX_USERS = [


    {


        id:1,


        name:
        "Super Admin",


        role:
        "admin",


        permission:
        [

            "all"

        ]


    },


    {


        id:2,


        name:
        "Manager",


        role:
        "manager",


        permission:
        [

            "service",

            "customer",

            "report"

        ]


    },


    {


        id:3,


        name:
        "Technician",


        role:
        "technician",


        permission:
        [

            "booking",

            "service"

        ]


    }


];







/* ==========================================================
   CURRENT USER SYSTEM
========================================================== */


let CURRENT_USER = null;







/* ==========================================================
   LOGIN SYSTEM FOUNDATION
========================================================== */


function adminLogin(userID){


    const user =
    LUMENIX_USERS.find(
        function(item){


            return item.id === userID;


        }
    );



    if(user){


        CURRENT_USER = user;



        return {


            success:true,


            message:
            "Login Successful",


            user:user


        };


    }



    return {


        success:false,


        message:
        "User Not Found"


    };


}







/* ==========================================================
   ROLE PERMISSION CHECK
========================================================== */


function checkPermission(permission){


    if(!CURRENT_USER){


        return false;


    }



    if(
        CURRENT_USER.permission
        .includes("all")
    ){


        return true;


    }



    return CURRENT_USER.permission
    .includes(
        permission
    );


}







/* ==========================================================
   ADMIN DASHBOARD CONTROL
========================================================== */


function adminDashboard(){


    const dashboard =
    select(
        ".admin-dashboard"
    );



    if(!dashboard){

        return;

    }



    if(!CURRENT_USER){


        dashboard.innerHTML =

        `

        <h3>
        Access Required
        </h3>

        `;


        return;


    }



    dashboard.innerHTML =


    `

    <h2>
    Welcome ${CURRENT_USER.name}
    </h2>


    <p>
    Role:
    ${CURRENT_USER.role}
    </p>

    `;


}







/* ==========================================================
   USER MANAGEMENT SYSTEM
========================================================== */


function getUsers(){


    return LUMENIX_USERS;


}







function addUser(user){


    LUMENIX_USERS.push(
        user
    );



    return user;


}







function removeUser(id){


    const index =
    LUMENIX_USERS.findIndex(
        function(user){


            return user.id === id;


        }
    );



    if(index !== -1){


        return LUMENIX_USERS.splice(
            index,
            1
        );


    }


}







/* ==========================================================
   ADMIN INITIALIZATION
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        adminDashboard();


    }
);







/* ==========================================================
   END OF JPART-10
========================================================== */

