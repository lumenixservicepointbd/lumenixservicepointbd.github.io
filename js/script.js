// =======================================================
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// WEBSITE VERSION : V3 FINAL
// PREMIUM JAVASCRIPT
// =======================================================


// ==============================
// SMOOTH SCROLL
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const targetId = this.getAttribute("href");

        if(targetId !== "#"){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }

    });

});



// ==============================
// PAGE LOADING EFFECT
// ==============================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});



// ==============================
// BACK TO TOP BUTTON
// ==============================

const topBtn = document.createElement("button");


topBtn.innerHTML = "⬆";


topBtn.className = "top-btn";


document.body.appendChild(topBtn);



window.addEventListener("scroll",()=>{


    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }


});



topBtn.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});




// ==============================
// ACTIVE MENU
// ==============================


const navLinks = document.querySelectorAll("nav a");


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        navLinks.forEach(item=>{

            item.classList.remove("active");

        });


        link.classList.add("active");


    });


});




// ==============================
// CARD SCROLL ANIMATION
// ==============================


const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });


},{

    threshold:0.15

});



cards.forEach(card=>{


    observer.observe(card);


});




// ==============================
// IMAGE LAZY LOAD SUPPORT
// ==============================


const images = document.querySelectorAll("img");


images.forEach(img=>{


    img.loading = "lazy";


});


// ==============================
// WEBSITE READY MESSAGE
// ==============================


console.log(
"Lumenix Service Point BD V3 Final Loaded Successfully"
);
// =======================================================
// V2-JS-0001 : CORE SYSTEM UPGRADE
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// SAFE PAGE READY SYSTEM
// ==============================

document.addEventListener("DOMContentLoaded",()=>{


    document.body.classList.add("js-ready");


});




// ==============================
// PREMIUM LOADING CONTROL
// ==============================

window.addEventListener("load",()=>{


    const loader = document.querySelector(".loader-screen");


    if(loader){


        setTimeout(()=>{


            loader.classList.add("hide");


        },800);


    }


});




// ==============================
// ENHANCED BACK TO TOP
// ==============================

const premiumTopBtn = document.querySelector(".top-btn");


if(premiumTopBtn){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 500){


            premiumTopBtn.classList.add("active");


        }

        else{


            premiumTopBtn.classList.remove("active");


        }


    });


}




// ==============================
// TECHNICIAN FORM READY SYSTEM
// ==============================

const technicianForm =
document.querySelector("#technicianForm");


if(technicianForm){


    technicianForm.addEventListener("submit",(e)=>{


        e.preventDefault();


        alert(
        "Your registration request has been submitted successfully. Our team will contact you."
        );


    });


}




// ==============================
// SERVICE CARD HOVER SUPPORT
// ==============================

const serviceCards =
document.querySelectorAll(".card");


serviceCards.forEach(card=>{


    card.addEventListener("mouseenter",()=>{


        card.classList.add("hover-active");


    });


    card.addEventListener("mouseleave",()=>{


        card.classList.remove("hover-active");


    });


});




// ==============================
// SYSTEM STATUS
// ==============================

console.log(
"V2-JS-0001 Core System Upgrade Activated Successfully"
);

// =======================================================
// V2-JS-0002 : TECHNICIAN REGISTRATION SYSTEM
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// TECHNICIAN FORM VALIDATION
// ==============================


const techForm = document.getElementById("technicianForm");


if(techForm){


    techForm.addEventListener("submit", function(e){


        e.preventDefault();



        const name =
        document.getElementById("techName")?.value.trim();



        const phone =
        document.getElementById("techPhone")?.value.trim();



        const category =
        document.getElementById("techCategory")?.value;



        const address =
        document.getElementById("techAddress")?.value.trim();



        // Required Check


        if(!name || !phone || !category || !address){


            showTechMessage(
            "⚠️ অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
            "error"
            );


            return;


        }



        // Mobile Validation


        const bdMobile =
        /^(01)[3-9]\d{8}$/;



        if(!bdMobile.test(phone)){


            showTechMessage(
            "⚠️ সঠিক বাংলাদেশি মোবাইল নাম্বার প্রদান করুন।",
            "error"
            );


            return;


        }



        // Success


        showTechMessage(
        "✅ আপনার Technician Registration Request সফলভাবে জমা হয়েছে। আমাদের টিম যাচাই করে যোগাযোগ করবে।",
        "success"
        );



        techForm.reset();



    });


}




// ==============================
// MESSAGE SYSTEM
// ==============================


function showTechMessage(message,type){


    let box =
    document.querySelector(".tech-message");



    if(!box){


        box =
        document.createElement("div");


        box.className =
        "tech-message";


        document.body.appendChild(box);


    }



    box.innerHTML = message;



    box.classList.remove("success","error");



    box.classList.add(type);



    setTimeout(()=>{


        box.classList.remove(type);


    },5000);



}




// ==============================
// CATEGORY SELECT SUPPORT
// ==============================


const categorySelect =
document.getElementById("techCategory");



if(categorySelect){


    categorySelect.addEventListener("change",function(){


        console.log(
        "Selected Technician Category:",
        this.value
        );


    });


}




// ==============================
// DOCUMENT UPLOAD CHECK
// ==============================


const nidUpload =
document.getElementById("nidUpload");


if(nidUpload){


    nidUpload.addEventListener("change",function(){


        if(this.files.length > 0){


            console.log(
            "Technician document uploaded"
            );


        }


    });


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0002 Technician Registration System Activated Successfully"
);

// =======================================================
// V2-JS-0003 : CUSTOMER SERVICE BOOKING SYSTEM
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// SERVICE BOOKING FORM CONTROL
// ==============================


const bookingForm =
document.getElementById("serviceBookingForm");



if(bookingForm){


    bookingForm.addEventListener("submit", function(e){


        e.preventDefault();



        const customerName =
        document.getElementById("customerName")?.value.trim();



        const customerPhone =
        document.getElementById("customerPhone")?.value.trim();



        const serviceType =
        document.getElementById("serviceType")?.value;



        const customerAddress =
        document.getElementById("customerAddress")?.value.trim();



        // Required Field Check


        if(
            !customerName ||
            !customerPhone ||
            !serviceType ||
            !customerAddress
        ){


            showBookingMessage(
            "⚠️ সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
            "error"
            );


            return;


        }



        // Bangladesh Mobile Validation


        const bdMobile =
        /^(01)[3-9]\d{8}$/;



        if(!bdMobile.test(customerPhone)){


            showBookingMessage(
            "⚠️ সঠিক মোবাইল নাম্বার প্রদান করুন।",
            "error"
            );


            return;


        }




        // Booking Success


        showBookingMessage(
        "✅ আপনার সার্ভিস রিকোয়েস্ট গ্রহণ করা হয়েছে। আমাদের টিম দ্রুত যোগাযোগ করবে।",
        "success"
        );



        bookingForm.reset();



        console.log({

            Customer: customerName,

            Phone: customerPhone,

            Service: serviceType,

            Address: customerAddress

        });



    });


}




// ==============================
// BOOKING MESSAGE SYSTEM
// ==============================


function showBookingMessage(message,type){


    let messageBox =
    document.querySelector(".booking-message");



    if(!messageBox){


        messageBox =
        document.createElement("div");


        messageBox.className =
        "booking-message";


        document.body.appendChild(messageBox);


    }



    messageBox.innerHTML = message;



    messageBox.classList.remove(
    "success",
    "error"
    );


    messageBox.classList.add(type);



    setTimeout(()=>{


        messageBox.classList.remove(type);


    },5000);



}




// ==============================
// SERVICE CATEGORY TRACKING
// ==============================


const serviceSelect =
document.getElementById("serviceType");



if(serviceSelect){


    serviceSelect.addEventListener(
    "change",
    function(){


        console.log(
        "Selected Service:",
        this.value
        );


    });


}




// ==============================
// AREA INFORMATION SUPPORT
// ==============================


const areaInput =
document.getElementById("customerArea");



if(areaInput){


    areaInput.addEventListener(
    "change",
    function(){


        console.log(
        "Customer Area:",
        this.value
        );


    });


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0003 Customer Service Booking System Activated Successfully"
);
// =======================================================
// V2-JS-0004 : TECHNICIAN ASSIGNMENT SYSTEM
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// TECHNICIAN DATABASE STRUCTURE
// ==============================


const technicianDatabase = [

    {
        id:"LSP-T001",
        name:"Technician Demo 01",
        category:[
            "Electrical",
            "LED Light"
        ],
        area:"Gazipur",
        status:"Available"
    },


    {
        id:"LSP-T002",
        name:"Technician Demo 02",
        category:[
            "Plumbing",
            "Water Pump"
        ],
        area:"Gazipur",
        status:"Available"
    },


    {
        id:"LSP-T003",
        name:"Technician Demo 03",
        category:[
            "AC",
            "CCTV"
        ],
        area:"Dhaka",
        status:"Busy"
    }

];




// ==============================
// TECHNICIAN SEARCH FUNCTION
// ==============================


function findTechnician(service,area){


    const availableTechnician =
    technicianDatabase.find(function(tech){


        return (

            tech.category.includes(service)

            &&

            tech.area === area

            &&

            tech.status === "Available"

        );


    });



    return availableTechnician || null;


}




// ==============================
// ASSIGN TECHNICIAN
// ==============================


function assignTechnician(service,area){


    const technician =
    findTechnician(service,area);



    if(technician){


        console.log(
            "Assigned Technician:",
            technician.name,
            technician.id
        );


        return technician;


    }


    else{


        console.log(
        "No available technician found"
        );


        return null;


    }


}




// ==============================
// BOOKING DATA CONNECTION
// ==============================


function processServiceRequest(
    customerName,
    service,
    area
){


    const assigned =
    assignTechnician(service,area);



    if(assigned){


        return {

            status:"Assigned",

            technician:
            assigned.name,

            technicianID:
            assigned.id

        };


    }


    else{


        return {

            status:"Pending",

            message:
            "Technician will be assigned soon."

        };


    }


}




// ==============================
// TECHNICIAN STATUS UPDATE
// ==============================


function updateTechnicianStatus(
    technicianID,
    newStatus
){


    const technician =
    technicianDatabase.find(
        tech=>tech.id===technicianID
    );



    if(technician){


        technician.status =
        newStatus;


        console.log(
        "Technician Status Updated:",
        technicianID,
        newStatus
        );


    }


}




// ==============================
// TEST SYSTEM
// ==============================


console.log(
processServiceRequest(
"Customer Demo",
"Electrical",
"Gazipur"
)
);




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0004 Technician Assignment System Activated Successfully"
);
// =======================================================
// V2-JS-0005 : PAYMENT & COMMISSION MANAGEMENT SYSTEM
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// PAYMENT DATABASE STRUCTURE
// ==============================


const paymentDatabase = [];




// ==============================
// CREATE PAYMENT RECORD
// ==============================


function createPaymentRecord(
    customerName,
    serviceName,
    totalAmount,
    technicianID,
    commissionRate
){


    const commission =
    (totalAmount * commissionRate) / 100;



    const technicianPayment =
    totalAmount - commission;



    const paymentRecord = {


        transactionID:
        "LSP-PAY-" + Date.now(),


        customerName:
        customerName,


        service:
        serviceName,


        totalAmount:
        totalAmount,


        companyCommission:
        commission,


        technicianAmount:
        technicianPayment,


        technicianID:
        technicianID,


        paymentStatus:
        "Pending",


        technicianPaymentStatus:
        "Unpaid",


        date:
        new Date().toLocaleString()


    };



    paymentDatabase.push(paymentRecord);



    console.log(
    "Payment Record Created:",
    paymentRecord
    );



    return paymentRecord;


}




// ==============================
// CUSTOMER PAYMENT CONFIRMATION
// ==============================


function confirmCustomerPayment(transactionID){


    const payment =
    paymentDatabase.find(
        item=>item.transactionID===transactionID
    );



    if(payment){


        payment.paymentStatus =
        "Paid";



        console.log(
        "Customer Payment Confirmed"
        );


    }


}




// ==============================
// TECHNICIAN PAYMENT PROCESS
// ==============================


function payTechnician(transactionID){


    const payment =
    paymentDatabase.find(
        item=>item.transactionID===transactionID
    );



    if(payment && payment.paymentStatus==="Paid"){


        payment.technicianPaymentStatus =
        "Paid";



        console.log(
        "Technician Payment Completed:",
        payment.technicianAmount
        );


    }


    else{


        console.log(
        "Payment verification required"
        );


    }


}




// ==============================
// PAYMENT HISTORY VIEW
// ==============================


function getPaymentHistory(){


    return paymentDatabase;


}




// ==============================
// DEMO PAYMENT TEST
// ==============================


const demoPayment =
createPaymentRecord(

    "Customer Demo",

    "Electrical Service",

    1000,

    "LSP-T001",

    20

);



console.log(demoPayment);




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0005 Payment & Commission Management System Activated Successfully"
);
// =======================================================
// V2-JS-0006 : NOTIFICATION & COMMUNICATION SYSTEM
// LUMENIX SERVICE POINT BD
// =======================================================


// ==============================
// NOTIFICATION DATABASE
// ==============================


const notificationDatabase = [];




// ==============================
// CREATE NOTIFICATION
// ==============================


function createNotification(
    receiverType,
    receiverName,
    message
){


    const notification = {


        id:
        "LSP-NOTIFY-" + Date.now(),


        receiverType:
        receiverType,


        receiverName:
        receiverName,


        message:
        message,


        status:
        "Unread",


        date:
        new Date().toLocaleString()


    };



    notificationDatabase.push(notification);



    console.log(
    "Notification Created:",
    notification
    );


    return notification;


}




// ==============================
// CUSTOMER BOOKING CONFIRMATION
// ==============================


function sendCustomerBookingConfirmation(
    customerName,
    serviceName
){


    const message =

    `প্রিয় ${customerName},

আপনার ${serviceName} সার্ভিস রিকোয়েস্ট Lumenix Service Point BD গ্রহণ করেছে।

আমাদের টিম যাচাই করে দ্রুত যোগাযোগ করবে।

ধন্যবাদ।`;



    return createNotification(
        "Customer",
        customerName,
        message
    );


}




// ==============================
// TECHNICIAN ASSIGNMENT ALERT
// ==============================


function sendTechnicianAssignmentNotification(
    technicianName,
    serviceName,
    customerArea
){


    const message =

    `প্রিয় ${technicianName},

আপনার জন্য একটি নতুন সার্ভিস কাজ নির্ধারণ করা হয়েছে।

Service:
${serviceName}

Area:
${customerArea}

অনুগ্রহ করে Customer Support-এর সাথে যোগাযোগ করে কাজ সম্পন্ন করুন।`;



    return createNotification(
        "Technician",
        technicianName,
        message
    );


}




// ==============================
// PAYMENT CONFIRMATION
// ==============================


function sendPaymentConfirmation(
    customerName,
    amount
){


    const message =

    `প্রিয় ${customerName},

আপনার পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে।

Amount:
৳${amount}

Lumenix Service Point BD-এর সাথে থাকার জন্য ধন্যবাদ।`;



    return createNotification(
        "Customer",
        customerName,
        message
    );


}




// ==============================
// ADMIN ALERT SYSTEM
// ==============================


function sendAdminAlert(message){


    return createNotification(
        "Admin",
        "Lumenix Admin",
        message
    );


}




// ==============================
// WHATSAPP MESSAGE GENERATOR
// ==============================


function generateWhatsAppMessage(
    name,
    service,
    phone
){


    const message =

`Hello ${name},

Your ${service} request has been received by Lumenix Service Point BD.

We will contact you shortly.

Thank You.`;



    const whatsappURL =

    "https://wa.me/880" 
    + phone.substring(1)
    +
    "?text="
    +
    encodeURIComponent(message);



    return whatsappURL;


}




// ==============================
// NOTIFICATION STATUS UPDATE
// ==============================


function markNotificationRead(id){


    const notification =

    notificationDatabase.find(
        item=>item.id===id
    );



    if(notification){


        notification.status =
        "Read";


    }


}




// ==============================
// VIEW NOTIFICATION HISTORY
// ==============================


function getNotifications(){


    return notificationDatabase;


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0006 Notification & Communication System Activated Successfully"
);
// =======================================================
// V2-JS-0007 : ADMIN CONTROL SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// ADMIN DATABASE
// ==============================


const adminDatabase = {

    bookings: [],

    technicians: [],

    payments: []

};




// ==============================
// ADD NEW BOOKING
// ==============================


function addBooking(
    customerName,
    serviceName,
    customerPhone,
    area
){


    const booking = {


        bookingID:
        "LSP-BK-" + Date.now(),


        customerName:
        customerName,


        service:
        serviceName,


        phone:
        customerPhone,


        area:
        area,


        status:
        "Pending",


        createdAt:
        new Date().toLocaleString()


    };



    adminDatabase.bookings.push(booking);



    console.log(
    "New Booking Added:",
    booking
    );


    return booking;


}




// ==============================
// UPDATE BOOKING STATUS
// ==============================


function updateBookingStatus(
    bookingID,
    status
){


    const booking =

    adminDatabase.bookings.find(
        item=>item.bookingID===bookingID
    );



    if(booking){


        booking.status = status;


        console.log(
        "Booking Status Updated:",
        status
        );


    }


}




// ==============================
// TECHNICIAN APPROVAL SYSTEM
// ==============================


function approveTechnician(
    technicianID,
    technicianName
){


    const technician = {


        technicianID:
        technicianID,


        name:
        technicianName,


        status:
        "Approved",


        approvedDate:
        new Date().toLocaleString()


    };



    adminDatabase.technicians.push(
        technician
    );



    console.log(
    "Technician Approved:",
    technician
    );


    return technician;


}




// ==============================
// TECHNICIAN STATUS CONTROL
// ==============================


function updateTechnicianStatus(
    technicianID,
    status
){


    const technician =

    adminDatabase.technicians.find(
        item=>item.technicianID===technicianID
    );



    if(technician){


        technician.status = status;


    }


}



// ==============================
// PAYMENT VERIFICATION
// ==============================


function verifyPayment(
    transactionID,
    amount
){


    const payment = {


        transactionID:
        transactionID,


        amount:
        amount,


        status:
        "Verified",


        verifiedDate:
        new Date().toLocaleString()


    };



    adminDatabase.payments.push(
        payment
    );



    console.log(
    "Payment Verified:",
    payment
    );


    return payment;


}




// ==============================
// SERVICE CONTROL PANEL
// ==============================


function serviceControl(
    bookingID,
    action
){


    const booking =

    adminDatabase.bookings.find(
        item=>item.bookingID===bookingID
    );



    if(booking){


        booking.adminAction =
        action;



        console.log(
        "Admin Action:",
        action
        );


    }


}




// ==============================
// ADMIN DASHBOARD DATA
// ==============================


function getAdminDashboard(){


    return {


        totalBookings:
        adminDatabase.bookings.length,


        totalTechnicians:
        adminDatabase.technicians.length,


        totalPayments:
        adminDatabase.payments.length


    };


}




// ==============================
// SYSTEM STATUS
// ==============================


console.log(
"V2-JS-0007 Admin Control System Activated Successfully"
);
// =======================================================
// V2-JS-0008 : SERVICE TRACKING SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// SERVICE TRACKING DATABASE
// ==============================


const serviceTrackingDatabase = [];




// ==============================
// CREATE SERVICE JOB
// ==============================


function createServiceJob(
    bookingID,
    customerName,
    serviceName,
    technicianID
){


    const serviceJob = {


        serviceID:
        "LSP-SRV-" + Date.now(),


        bookingID:
        bookingID,


        customerName:
        customerName,


        service:
        serviceName,


        technicianID:
        technicianID,


        status:
        "Assigned",


        startTime:
        null,


        completeTime:
        null,


        createdAt:
        new Date().toLocaleString()


    };



    serviceTrackingDatabase.push(
        serviceJob
    );



    console.log(
    "Service Job Created:",
    serviceJob
    );


    return serviceJob;


}




// ==============================
// UPDATE SERVICE STATUS
// ==============================


function updateServiceStatus(
    serviceID,
    status
){


    const service =

    serviceTrackingDatabase.find(
        item=>item.serviceID===serviceID
    );



    if(service){


        service.status = status;



        if(status==="Started"){

            service.startTime =
            new Date().toLocaleString();

        }



        if(status==="Completed"){

            service.completeTime =
            new Date().toLocaleString();

        }



        console.log(
        "Service Status Updated:",
        status
        );


    }


}




// ==============================
// TECHNICIAN CHECK IN
// ==============================


function technicianCheckIn(
    serviceID
){


    const service =

    serviceTrackingDatabase.find(
        item=>item.serviceID===serviceID
    );



    if(service){


        service.status =
        "Technician Arrived";


        console.log(
        "Technician Checked In"
        );


    }


}




// ==============================
// SERVICE COMPLETION
// ==============================


function completeService(
    serviceID
){


    const service =

    serviceTrackingDatabase.find(
        item=>item.serviceID===serviceID
    );



    if(service){


        service.status =
        "Completed";


        service.completeTime =
        new Date().toLocaleString();



        console.log(
        "Service Completed Successfully"
        );


    }


}




// ==============================
// CUSTOMER SERVICE HISTORY
// ==============================


function getCustomerHistory(
    customerName
){


    return serviceTrackingDatabase.filter(

        item=>
        item.customerName===customerName

    );


}




// ==============================
// TECHNICIAN JOB HISTORY
// ==============================


function getTechnicianJobs(
    technicianID
){


    return serviceTrackingDatabase.filter(

        item=>
        item.technicianID===technicianID

    );


}




// ==============================
// ACTIVE SERVICE LIST
// ==============================


function getActiveServices(){


    return serviceTrackingDatabase.filter(

        item=>
        item.status!=="Completed"

    );


}




// ==============================
// SERVICE REPORT
// ==============================


function generateServiceReport(){


    return {


        totalService:

        serviceTrackingDatabase.length,


        completed:

        serviceTrackingDatabase.filter(

            item=>item.status==="Completed"

        ).length,


        pending:

        serviceTrackingDatabase.filter(

            item=>item.status!=="Completed"

        ).length


    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0008 Service Tracking System Activated Successfully"
);
// =======================================================
// V2-JS-0009 : CUSTOMER ACCOUNT & SERVICE HISTORY SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// CUSTOMER DATABASE
// ==============================


const customerDatabase = [];




// ==============================
// CREATE CUSTOMER PROFILE
// ==============================


function createCustomerProfile(
    name,
    phone,
    address
){


    const customer = {


        customerID:
        "LSP-CUS-" + Date.now(),


        name:
        name,


        phone:
        phone,


        address:
        address,


        totalService:
        0,


        totalPayment:
        0,


        loyaltyPoint:
        0,


        serviceHistory:
        [],


        createdAt:
        new Date().toLocaleString()


    };



    customerDatabase.push(customer);



    console.log(
    "Customer Profile Created:",
    customer
    );


    return customer;


}




// ==============================
// ADD SERVICE HISTORY
// ==============================


function addCustomerServiceHistory(
    customerID,
    serviceName,
    amount
){


    const customer =

    customerDatabase.find(

        item=>item.customerID===customerID

    );



    if(customer){


        const service = {


            serviceID:
            "LSP-CS-" + Date.now(),


            serviceName:
            serviceName,


            amount:
            amount,


            date:
            new Date().toLocaleString()


        };



        customer.serviceHistory.push(
            service
        );



        customer.totalService++;


        customer.totalPayment += amount;



        customer.loyaltyPoint += 10;



        console.log(
        "Customer Service History Added:",
        service
        );


    }


}




// ==============================
// UPDATE CUSTOMER ADDRESS
// ==============================


function updateCustomerAddress(
    customerID,
    newAddress
){


    const customer =

    customerDatabase.find(

        item=>item.customerID===customerID

    );



    if(customer){


        customer.address =
        newAddress;


    }


}




// ==============================
// CUSTOMER PAYMENT HISTORY
// ==============================


function getCustomerPaymentHistory(
    customerID
){


    const customer =

    customerDatabase.find(

        item=>item.customerID===customerID

    );



    if(customer){


        return customer.serviceHistory.map(

            service=>({

                service:
                service.serviceName,

                amount:
                service.amount,

                date:
                service.date

            })

        );


    }


}




// ==============================
// CUSTOMER PROFILE VIEW
// ==============================


function getCustomerProfile(
    customerID
){


    return customerDatabase.find(

        item=>item.customerID===customerID

    );


}




// ==============================
// LOYALTY POINT SYSTEM
// ==============================


function getCustomerLoyaltyPoint(
    customerID
){


    const customer =

    customerDatabase.find(

        item=>item.customerID===customerID

    );



    if(customer){


        return customer.loyaltyPoint;


    }


    return 0;


}




// ==============================
// ALL CUSTOMER LIST
// ==============================


function getAllCustomers(){


    return customerDatabase;


}




// ==============================
// DEMO CUSTOMER TEST
// ==============================


const demoCustomer =

createCustomerProfile(

    "Demo Customer",

    "01700000000",

    "Gazipur"

);



console.log(demoCustomer);




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0009 Customer Account & Service History System Activated Successfully"
);
// =======================================================
// V2-JS-0010 : REVIEW & RATING SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// REVIEW DATABASE
// ==============================


const reviewDatabase = [];




// ==============================
// CREATE CUSTOMER REVIEW
// ==============================


function createCustomerReview(
    customerName,
    serviceName,
    rating,
    feedback
){


    const review = {


        reviewID:
        "LSP-REV-" + Date.now(),


        customerName:
        customerName,


        service:
        serviceName,


        rating:
        rating,


        feedback:
        feedback,


        status:
        "Pending",


        date:
        new Date().toLocaleString()


    };



    reviewDatabase.push(review);



    console.log(
    "Customer Review Added:",
    review
    );



    return review;


}




// ==============================
// TECHNICIAN RATING SYSTEM
// ==============================


function rateTechnician(
    technicianID,
    customerName,
    rating,
    comment
){


    const technicianReview = {


        reviewID:
        "LSP-TECH-REV-" + Date.now(),


        technicianID:
        technicianID,


        customerName:
        customerName,


        rating:
        rating,


        comment:
        comment,


        date:
        new Date().toLocaleString()


    };



    reviewDatabase.push(
        technicianReview
    );



    console.log(
    "Technician Rating Added:",
    technicianReview
    );


    return technicianReview;


}




// ==============================
// COMPLAINT MANAGEMENT
// ==============================


function createComplaint(
    customerName,
    issue
){


    const complaint = {


        complaintID:
        "LSP-CMP-" + Date.now(),


        customerName:
        customerName,


        issue:
        issue,


        status:
        "Open",


        createdAt:
        new Date().toLocaleString()


    };



    reviewDatabase.push(
        complaint
    );



    console.log(
    "Complaint Created:",
    complaint
    );


    return complaint;


}




// ==============================
// UPDATE COMPLAINT STATUS
// ==============================


function updateComplaintStatus(
    complaintID,
    status
){


    const complaint =

    reviewDatabase.find(

        item=>item.complaintID===complaintID

    );



    if(complaint){


        complaint.status =
        status;


        console.log(
        "Complaint Updated:",
        status
        );


    }


}




// ==============================
// SERVICE QUALITY SCORE
// ==============================


function calculateServiceScore(){


    const ratings =

    reviewDatabase.filter(

        item=>item.rating

    );



    if(ratings.length===0){

        return 0;

    }



    const total =

    ratings.reduce(

        (sum,item)=>

        sum + Number(item.rating),

        0

    );



    return (

        total / ratings.length

    ).toFixed(1);


}




// ==============================
// GET ALL REVIEWS
// ==============================


function getAllReviews(){


    return reviewDatabase;


}




// ==============================
// APPROVE REVIEW
// ==============================


function approveReview(
    reviewID
){


    const review =

    reviewDatabase.find(

        item=>item.reviewID===reviewID

    );



    if(review){


        review.status =
        "Approved";


    }


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0010 Review & Rating System Activated Successfully"
);
// =======================================================
// V2-JS-0011 : TECHNICIAN PARTNER MANAGEMENT SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// TECHNICIAN PARTNER DATABASE
// ==============================


const technicianDatabase = [];




// ==============================
// CREATE TECHNICIAN PROFILE
// ==============================


function createTechnicianProfile(
    name,
    phone,
    skillCategory,
    experience
){


    const technician = {


        technicianID:
        "LSP-TECH-" + Date.now(),


        name:
        name,


        phone:
        phone,


        skillCategory:
        skillCategory,


        experience:
        experience,


        verificationStatus:
        "Pending",


        partnerStatus:
        "Active",


        completedJobs:
        0,


        totalCommission:
        0,


        ratingScore:
        0,


        joinedDate:
        new Date().toLocaleString()


    };



    technicianDatabase.push(
        technician
    );



    console.log(
    "Technician Profile Created:",
    technician
    );


    return technician;


}




// ==============================
// TECHNICIAN VERIFICATION
// ==============================


function verifyTechnician(
    technicianID
){


    const technician =

    technicianDatabase.find(

        item=>item.technicianID===technicianID

    );



    if(technician){


        technician.verificationStatus =
        "Verified";



        console.log(
        "Technician Verified"
        );


    }


}




// ==============================
// UPDATE TECHNICIAN SKILL
// ==============================


function updateTechnicianSkill(
    technicianID,
    skill
){


    const technician =

    technicianDatabase.find(

        item=>item.technicianID===technicianID

    );



    if(technician){


        technician.skillCategory =
        skill;


    }


}




// ==============================
// ADD COMPLETED JOB
// ==============================


function addTechnicianJob(
    technicianID,
    commissionAmount
){


    const technician =

    technicianDatabase.find(

        item=>item.technicianID===technicianID

    );



    if(technician){


        technician.completedJobs++;


        technician.totalCommission +=
        commissionAmount;



        console.log(
        "Technician Job Updated"
        );


    }


}




// ==============================
// UPDATE TECHNICIAN RATING
// ==============================


function updateTechnicianRating(
    technicianID,
    rating
){


    const technician =

    technicianDatabase.find(

        item=>item.technicianID===technicianID

    );



    if(technician){


        technician.ratingScore =
        rating;



    }


}




// ==============================
// BLOCK / SUSPEND TECHNICIAN
// ==============================


function suspendTechnician(
    technicianID,
    reason
){


    const technician =

    technicianDatabase.find(

        item=>item.technicianID===technicianID

    );



    if(technician){


        technician.partnerStatus =
        "Suspended";


        technician.suspendReason =
        reason;



    }


}




// ==============================
// GET TECHNICIAN PROFILE
// ==============================


function getTechnicianProfile(
    technicianID
){


    return technicianDatabase.find(

        item=>item.technicianID===technicianID

    );


}




// ==============================
// GET ALL VERIFIED TECHNICIANS
// ==============================


function getVerifiedTechnicians(){


    return technicianDatabase.filter(

        item=>

        item.verificationStatus==="Verified"

    );


}




// ==============================
// TECHNICIAN PERFORMANCE REPORT
// ==============================


function getTechnicianPerformance(
    technicianID
){


    const technician =

    getTechnicianProfile(
        technicianID
    );



    if(technician){


        return {


            completedJobs:
            technician.completedJobs,


            commission:
            technician.totalCommission,


            rating:
            technician.ratingScore,


            status:
            technician.partnerStatus



        };


    }


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0011 Technician Partner Management System Activated Successfully"
);
// =======================================================
// V2-JS-0012 : SERVICE BOOKING FORM & CUSTOMER REQUEST SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// SERVICE BOOKING DATABASE
// ==============================


const bookingRequestDatabase = [];




// ==============================
// AVAILABLE SERVICE CATEGORY
// ==============================


const serviceCategories = [

    "Electrical Service",

    "LED Light Service",

    "Plumbing Service",

    "CCTV Service",

    "AC Service",

    "IPS Service",

    "Water Pump & Motor",

    "Solar Service",

    "Painting Service",

    "Thai Glass & Aluminium",

    "Interior Design - Wood",

    "Interior Design - Gypsum",

    "Home Maintenance"

];




// ==============================
// CREATE SERVICE REQUEST
// ==============================


function createServiceBooking(
    customerName,
    phone,
    serviceCategory,
    address,
    problemDetails
){


    if(!serviceCategories.includes(serviceCategory)){


        console.log(
        "Invalid Service Category"
        );


        return false;


    }



    const booking = {


        bookingID:

        "LSP-BOOK-" + Date.now(),


        customerName:

        customerName,


        phone:

        phone,


        service:

        serviceCategory,


        address:

        address,


        problem:

        problemDetails,


        status:

        "Pending",


        assignedTechnician:

        null,


        createdAt:

        new Date().toLocaleString()


    };



    bookingRequestDatabase.push(
        booking
    );



    console.log(
    "Service Booking Created:",
    booking
    );



    return booking;


}




// ==============================
// ASSIGN TECHNICIAN
// ==============================


function assignTechnicianToBooking(
    bookingID,
    technicianID
){


    const booking =

    bookingRequestDatabase.find(

        item=>item.bookingID===bookingID

    );



    if(booking){


        booking.assignedTechnician =
        technicianID;


        booking.status =
        "Technician Assigned";



    }


}




// ==============================
// UPDATE BOOKING STATUS
// ==============================


function updateBookingRequestStatus(
    bookingID,
    status
){


    const booking =

    bookingRequestDatabase.find(

        item=>item.bookingID===bookingID

    );



    if(booking){


        booking.status =
        status;



    }


}




// ==============================
// CUSTOMER BOOKING LIST
// ==============================


function getCustomerBookings(
    phone
){


    return bookingRequestDatabase.filter(

        item=>

        item.phone===phone

    );


}




// ==============================
// ADMIN ALL BOOKINGS
// ==============================


function getAllServiceBookings(){


    return bookingRequestDatabase;


}




// ==============================
// CANCEL BOOKING
// ==============================


function cancelServiceBooking(
    bookingID
){


    const booking =

    bookingRequestDatabase.find(

        item=>item.bookingID===bookingID

    );



    if(booking){


        booking.status =
        "Cancelled";



    }


}




// ==============================
// BOOKING SUMMARY
// ==============================


function getBookingSummary(){


    return {


        totalBooking:

        bookingRequestDatabase.length,


        pending:

        bookingRequestDatabase.filter(

            item=>item.status==="Pending"

        ).length,


        completed:

        bookingRequestDatabase.filter(

            item=>item.status==="Completed"

        ).length



    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0012 Service Booking Form & Customer Request System Activated Successfully"
);
// =======================================================
// V2-JS-0013 : SEARCH & FILTER SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// SEARCH SERVICE
// ==============================


function searchService(
    keyword
){


    const searchText =

    keyword.toLowerCase();



    return serviceCategories.filter(

        service =>

        service.toLowerCase()
        .includes(searchText)

    );


}




// ==============================
// SEARCH TECHNICIAN
// ==============================


function searchTechnician(
    keyword
){


    const searchText =

    keyword.toLowerCase();



    return technicianDatabase.filter(

        technician =>


        technician.name
        .toLowerCase()
        .includes(searchText)

        ||

        technician.skillCategory
        .toLowerCase()
        .includes(searchText)


    );


}




// ==============================
// FILTER VERIFIED TECHNICIAN
// ==============================


function filterVerifiedTechnician(){


    return technicianDatabase.filter(

        technician =>

        technician.verificationStatus
        ===
        "Verified"

    );


}




// ==============================
// FILTER BY SERVICE CATEGORY
// ==============================


function filterTechnicianBySkill(
    skill
){


    return technicianDatabase.filter(

        technician =>


        technician.skillCategory
        ===
        skill


    );


}




// ==============================
// AREA BASED SERVICE FILTER
// ==============================


const serviceAreaDatabase = [


    {

        area:"Gazipur",

        available:true

    },


    {

        area:"Dhaka",

        available:true

    },


    {

        area:"Narayanganj",

        available:false

    }


];




// ==============================
// CHECK SERVICE AREA
// ==============================


function checkServiceArea(
    area
){


    const result =

    serviceAreaDatabase.find(

        item =>

        item.area
        .toLowerCase()
        ===
        area.toLowerCase()

    );



    return result || {

        area:area,

        available:false

    };


}




// ==============================
// FILTER ACTIVE TECHNICIAN
// ==============================


function getActiveTechnicians(){


    return technicianDatabase.filter(

        technician =>


        technician.partnerStatus
        ===
        "Active"


    );


}




// ==============================
// CUSTOMER QUICK SEARCH
// ==============================


function searchCustomer(
    phone
){


    return customerDatabase.find(

        customer =>

        customer.phone
        ===
        phone


    );


}




// ==============================
// GLOBAL SEARCH
// ==============================


function globalSearch(
    keyword
){


    return {


        services:

        searchService(keyword),



        technicians:

        searchTechnician(keyword),



        customers:

        customerDatabase.filter(

            customer =>

            customer.name
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            )

        )


    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0013 Search & Filter System Activated Successfully"
);
// =======================================================
// V2-JS-0014 : NOTIFICATION & ALERT SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// NOTIFICATION DATABASE
// ==============================


const notificationDatabase = [];




// ==============================
// CREATE NOTIFICATION
// ==============================


function createNotification(
    receiverType,
    receiverID,
    title,
    message
){


    const notification = {


        notificationID:

        "LSP-NOT-" + Date.now(),


        receiverType:

        receiverType,


        receiverID:

        receiverID,


        title:

        title,


        message:

        message,


        status:

        "Unread",


        createdAt:

        new Date().toLocaleString()


    };



    notificationDatabase.push(
        notification
    );



    console.log(
    "New Notification:",
    notification
    );


    return notification;


}




// ==============================
// CUSTOMER BOOKING ALERT
// ==============================


function sendBookingAlert(
    customerID,
    bookingID
){


    return createNotification(

        "Customer",

        customerID,

        "Booking Confirmed",

        "আপনার Service Booking ID "
        + bookingID
        + " সফলভাবে গ্রহণ করা হয়েছে।"

    );


}




// ==============================
// TECHNICIAN ASSIGNMENT ALERT
// ==============================


function sendTechnicianAssignmentAlert(
    technicianID,
    bookingID
){


    return createNotification(

        "Technician",

        technicianID,

        "New Service Assigned",

        "নতুন Service Request Assigned হয়েছে। Booking ID: "
        + bookingID

    );


}




// ==============================
// PAYMENT CONFIRMATION ALERT
// ==============================


function sendPaymentConfirmation(
    customerID,
    amount
){


    return createNotification(

        "Customer",

        customerID,

        "Payment Received",

        "আপনার ৳"
        + amount
        + " Payment সফলভাবে গ্রহণ করা হয়েছে।"

    );


}




// ==============================
// SERVICE COMPLETION ALERT
// ==============================


function sendServiceCompleteAlert(
    customerID,
    serviceID
){


    return createNotification(

        "Customer",

        customerID,

        "Service Completed",

        "আপনার Service ID "
        + serviceID
        + " সম্পন্ন হয়েছে।"

    );


}




// ==============================
// ADMIN ALERT
// ==============================


function sendAdminAlert(
    message
){


    return createNotification(

        "Admin",

        "ADMIN-001",

        "System Alert",

        message

    );


}




// ==============================
// MARK NOTIFICATION READ
// ==============================


function markNotificationRead(
    notificationID
){


    const notification =

    notificationDatabase.find(

        item =>

        item.notificationID
        ===
        notificationID

    );



    if(notification){


        notification.status =
        "Read";


    }


}




// ==============================
// GET USER NOTIFICATIONS
// ==============================


function getUserNotifications(
    receiverID
){


    return notificationDatabase.filter(

        item =>

        item.receiverID
        ===
        receiverID

    );


}




// ==============================
// GET UNREAD NOTIFICATION
// ==============================


function getUnreadNotifications(
    receiverID
){


    return notificationDatabase.filter(

        item =>

        item.receiverID
        ===
        receiverID

        &&

        item.status
        ===
        "Unread"

    );


}




// ==============================
// SYSTEM ACTIVITY LOG
// ==============================


const systemActivityLog = [];



function addSystemLog(
    activity
){


    systemActivityLog.push({

        activity:

        activity,


        time:

        new Date().toLocaleString()

    });


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0014 Notification & Alert System Activated Successfully"
);
// =======================================================
// V2-JS-0015 : ADMIN DASHBOARD CONTROL SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// ADMIN DASHBOARD DATA
// ==============================


function getAdminDashboard(){


    return {


        company:

        "Lumenix Service Point BD",


        parentCompany:

        "MS FARDIN ELECTRIC",



        customers:

        customerDatabase.length,



        technicians:

        technicianDatabase.length,



        bookings:

        bookingRequestDatabase.length,



        completedServices:

        serviceTrackingDatabase.filter(

            item=>

            item.status==="Completed"

        ).length,



        pendingServices:

        serviceTrackingDatabase.filter(

            item=>

            item.status!=="Completed"

        ).length


    };


}




// ==============================
// CUSTOMER REPORT
// ==============================


function getCustomerReport(){


    return {


        totalCustomer:

        customerDatabase.length,


        activeCustomer:

        customerDatabase.filter(

            item=>

            item.totalService>0

        ).length



    };


}




// ==============================
// TECHNICIAN REPORT
// ==============================


function getTechnicianReport(){


    return {


        totalTechnician:

        technicianDatabase.length,


        verifiedTechnician:

        technicianDatabase.filter(

            item=>

            item.verificationStatus==="Verified"

        ).length,



        activeTechnician:

        technicianDatabase.filter(

            item=>

            item.partnerStatus==="Active"

        ).length


    };


}




// ==============================
// BOOKING REPORT
// ==============================


function getBookingReport(){


    return {


        totalBooking:

        bookingRequestDatabase.length,



        pending:

        bookingRequestDatabase.filter(

            item=>

            item.status==="Pending"

        ).length,



        assigned:

        bookingRequestDatabase.filter(

            item=>

            item.status==="Technician Assigned"

        ).length,



        completed:

        bookingRequestDatabase.filter(

            item=>

            item.status==="Completed"

        ).length



    };


}




// ==============================
// REVENUE TRACKING STRUCTURE
// ==============================


function getRevenueReport(){


    let totalRevenue = 0;



    customerDatabase.forEach(

        customer=>{


            totalRevenue +=

            customer.totalPayment || 0;


        }

    );



    return {


        totalRevenue:

        totalRevenue,


        currency:

        "BDT"



    };


}




// ==============================
// SERVICE PERFORMANCE REPORT
// ==============================


function getServicePerformance(){


    return {


        totalReviews:

        reviewDatabase.length,



        averageRating:

        calculateServiceScore(),



        complaints:

        reviewDatabase.filter(

            item=>

            item.complaintID

        ).length



    };


}




// ==============================
// ADMIN ACTIVITY LOG
// ==============================


function getAdminActivityLog(){


    return systemActivityLog;


}




// ==============================
// COMPLETE ADMIN SUMMARY
// ==============================


function getCompleteAdminSummary(){


    return {


        dashboard:

        getAdminDashboard(),



        customers:

        getCustomerReport(),



        technicians:

        getTechnicianReport(),



        bookings:

        getBookingReport(),



        revenue:

        getRevenueReport(),



        performance:

        getServicePerformance()



    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0015 Admin Dashboard Control System Activated Successfully"
);
// =======================================================
// V2-JS-0016 : PAYMENT GATEWAY & COMMISSION MANAGEMENT SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// PAYMENT DATABASE
// ==============================


const paymentDatabase = [];




// ==============================
// PAYMENT METHODS
// ==============================


const officialPaymentMethods = [

    "bKash Corporate",

    "Nagad Corporate",

    "Rocket Corporate",

    "DBBL Nexus",

    "Bank Transfer"

];




// ==============================
// CREATE PAYMENT RECORD
// ==============================


function createPaymentRecord(
    customerID,
    bookingID,
    amount,
    paymentMethod,
    transactionID
){


    if(!officialPaymentMethods.includes(paymentMethod)){


        console.log(
        "Invalid Payment Method"
        );


        return false;


    }



    const payment = {


        paymentID:

        "LSP-PAY-" + Date.now(),



        customerID:

        customerID,



        bookingID:

        bookingID,



        amount:

        amount,



        paymentMethod:

        paymentMethod,



        transactionID:

        transactionID,



        verificationStatus:

        "Pending",



        createdAt:

        new Date().toLocaleString()


    };



    paymentDatabase.push(payment);



    console.log(
    "Payment Record Created:",
    payment
    );


    return payment;


}




// ==============================
// VERIFY PAYMENT
// ==============================


function verifyPayment(
    paymentID
){


    const payment =

    paymentDatabase.find(

        item=>

        item.paymentID===paymentID

    );



    if(payment){


        payment.verificationStatus =
        "Verified";


        console.log(
        "Payment Verified"
        );


    }


}




// ==============================
// COMMISSION CALCULATION
// ==============================


function calculateCommission(
    serviceAmount,
    commissionRate
){


    const commission =

    (serviceAmount * commissionRate) / 100;



    const technicianPay =

    serviceAmount - commission;



    return {


        totalAmount:

        serviceAmount,


        companyCommission:

        commission,


        technicianPayment:

        technicianPay



    };


}




// ==============================
// TECHNICIAN PAYMENT RECORD
// ==============================


const technicianPaymentDatabase = [];



function createTechnicianPayment(
    technicianID,
    bookingID,
    amount
){


    const technicianPayment = {


        paymentID:

        "LSP-TECH-PAY-" + Date.now(),



        technicianID:

        technicianID,



        bookingID:

        bookingID,



        amount:

        amount,



        status:

        "Pending",



        date:

        new Date().toLocaleString()


    };



    technicianPaymentDatabase.push(
        technicianPayment
    );



    return technicianPayment;


}




// ==============================
// COMPLETE TECHNICIAN PAYMENT
// ==============================


function completeTechnicianPayment(
    paymentID
){


    const payment =

    technicianPaymentDatabase.find(

        item=>

        item.paymentID===paymentID

    );



    if(payment){


        payment.status =
        "Paid";


        payment.paidDate =
        new Date().toLocaleString();


    }


}




// ==============================
// CUSTOMER PAYMENT HISTORY
// ==============================


function getCustomerPayments(
    customerID
){


    return paymentDatabase.filter(

        item=>

        item.customerID===customerID

    );


}




// ==============================
// TRANSACTION REPORT
// ==============================


function getPaymentReport(){


    return {


        totalTransactions:

        paymentDatabase.length,



        verifiedPayments:

        paymentDatabase.filter(

            item=>

            item.verificationStatus==="Verified"

        ).length,



        pendingPayments:

        paymentDatabase.filter(

            item=>

            item.verificationStatus==="Pending"

        ).length



    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0016 Payment Gateway & Commission Management System Activated Successfully"
);
// =======================================================
// V2-JS-0017 : TECHNICIAN LOCATION & SERVICE AREA MANAGEMENT SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// LOCATION DATABASE
// ==============================


const technicianLocationDatabase = [];




// ==============================
// ADD TECHNICIAN LOCATION
// ==============================


function addTechnicianLocation(
    technicianID,
    area,
    latitude,
    longitude
){


    const location = {


        locationID:

        "LSP-LOC-" + Date.now(),


        technicianID:

        technicianID,


        area:

        area,


        latitude:

        latitude,


        longitude:

        longitude,


        availability:

        "Available",


        updatedAt:

        new Date().toLocaleString()


    };



    technicianLocationDatabase.push(
        location
    );



    console.log(
    "Technician Location Added:",
    location
    );


    return location;


}




// ==============================
// UPDATE TECHNICIAN LOCATION
// ==============================


function updateTechnicianLocation(
    technicianID,
    area,
    latitude,
    longitude
){


    const technician =

    technicianLocationDatabase.find(

        item=>

        item.technicianID===technicianID

    );



    if(technician){


        technician.area = area;


        technician.latitude = latitude;


        technician.longitude = longitude;


        technician.updatedAt =
        new Date().toLocaleString();



    }


}




// ==============================
// TECHNICIAN AVAILABILITY STATUS
// ==============================


function updateTechnicianAvailability(
    technicianID,
    status
){


    const technician =

    technicianLocationDatabase.find(

        item=>

        item.technicianID===technicianID

    );



    if(technician){


        technician.availability =
        status;


    }


}




// ==============================
// SEARCH TECHNICIAN BY AREA
// ==============================


function getTechnicianByArea(
    area
){


    return technicianLocationDatabase.filter(

        item=>

        item.area.toLowerCase()

        ===

        area.toLowerCase()

    );


}




// ==============================
// AVAILABLE TECHNICIAN LIST
// ==============================


function getAvailableTechnicians(
    area
){


    return technicianLocationDatabase.filter(

        item=>

        item.area.toLowerCase()

        ===

        area.toLowerCase()

        &&

        item.availability==="Available"


    );


}




// ==============================
// SERVICE AREA DATABASE
// ==============================


const serviceAreaDatabase = [


    {

        area:
        "Gazipur",

        status:
        "Active"


    },


    {

        area:
        "Dhaka",

        status:
        "Active"


    },


    {

        area:
        "Narayanganj",

        status:
        "Coming Soon"


    }


];




// ==============================
// CHECK SERVICE COVERAGE
// ==============================


function checkAreaCoverage(
    area
){


    return serviceAreaDatabase.find(

        item=>

        item.area.toLowerCase()

        ===

        area.toLowerCase()

    )
    ||
    {

        area:area,

        status:"Not Available"

    };


}




// ==============================
// EMERGENCY TECHNICIAN SEARCH
// ==============================


function findEmergencyTechnician(
    area
){


    const available =

    getAvailableTechnicians(area);



    if(available.length > 0){


        return available[0];


    }



    return null;


}




// ==============================
// LOCATION REPORT
// ==============================


function getLocationReport(){


    return {


        totalLocation:

        technicianLocationDatabase.length,


        availableTechnician:

        technicianLocationDatabase.filter(

            item=>

            item.availability==="Available"

        ).length


    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0017 Technician Location & Service Area Management System Activated Successfully"
);
// =======================================================
// V2-JS-0018 : SECURITY & DATA VALIDATION SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// CLEAN DATA FUNCTION
// ==============================


function cleanInput(
    data
){


    if(typeof data !== "string"){

        return data;

    }


    return data

    .trim()

    .replace(
        /[<>]/g,
        ""
    );


}




// ==============================
// MOBILE NUMBER VALIDATION
// ==============================


function validateMobileNumber(
    mobile
){


    const pattern =

    /^01[3-9]\d{8}$/;



    return pattern.test(
        mobile
    );


}




// ==============================
// EMAIL VALIDATION
// ==============================


function validateEmail(
    email
){


    const pattern =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return pattern.test(
        email
    );


}




// ==============================
// REQUIRED FIELD CHECK
// ==============================


function validateRequiredFields(
    fields
){


    for(
        let field of fields
    ){


        if(
            field === "" ||
            field === null ||
            field === undefined
        ){


            return false;


        }


    }


    return true;


}




// ==============================
// DUPLICATE CUSTOMER CHECK
// ==============================


function checkDuplicateCustomer(
    phone
){


    return customerDatabase.some(

        customer =>

        customer.phone === phone

    );


}




// ==============================
// DUPLICATE TECHNICIAN CHECK
// ==============================


function checkDuplicateTechnician(
    phone
){


    return technicianDatabase.some(

        technician =>

        technician.phone === phone

    );


}




// ==============================
// SECURE CUSTOMER DATA
// ==============================


function secureCustomerData(
    customer
){


    return {


        name:

        cleanInput(
            customer.name
        ),


        phone:

        cleanInput(
            customer.phone
        ),


        address:

        cleanInput(
            customer.address
        )


    };


}




// ==============================
// SECURE BOOKING DATA
// ==============================


function secureBookingData(
    booking
){


    return {


        customerName:

        cleanInput(
            booking.customerName
        ),


        phone:

        cleanInput(
            booking.phone
        ),


        service:

        cleanInput(
            booking.service
        ),


        address:

        cleanInput(
            booking.address
        )


    };


}




// ==============================
// LOGIN ACCESS CONTROL BASE
// ==============================


function checkUserAccess(
    role
){


    const allowedRoles = [

        "Admin",

        "Technician",

        "Customer"

    ];



    return allowedRoles.includes(
        role
    );


}




// ==============================
// SECURITY LOG
// ==============================


const securityLog = [];



function addSecurityLog(
    activity
){


    securityLog.push({


        activity:

        activity,


        time:

        new Date().toLocaleString()


    });


}




// ==============================
// GET SECURITY REPORT
// ==============================


function getSecurityReport(){


    return {


        totalSecurityLogs:

        securityLog.length,


        systemStatus:

        "Active"


    };


}




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0018 Security & Data Validation System Activated Successfully"
);
// =======================================================
// V2-JS-0019 : DATABASE STORAGE & BACKUP SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// SAVE DATA TO LOCAL STORAGE
// ==============================


function saveSystemData(){


    const systemData = {


        customers:

        customerDatabase,


        technicians:

        technicianDatabase,


        bookings:

        bookingRequestDatabase,


        payments:

        paymentDatabase,


        technicianPayments:

        technicianPaymentDatabase,


        reviews:

        reviewDatabase,


        notifications:

        notificationDatabase,


        locations:

        technicianLocationDatabase,


        savedDate:

        new Date().toLocaleString()


    };



    localStorage.setItem(

        "Lumenix_System_Data",

        JSON.stringify(systemData)

    );



    console.log(
    "System Data Saved Successfully"
    );


}




// ==============================
// LOAD DATA FROM STORAGE
// ==============================


function loadSystemData(){


    const savedData =

    localStorage.getItem(
        "Lumenix_System_Data"
    );



    if(savedData){


        const data =

        JSON.parse(savedData);



        console.log(
        "System Data Loaded:",
        data
        );



        return data;


    }


    return null;


}




// ==============================
// CUSTOMER BACKUP
// ==============================


function backupCustomerData(){


    localStorage.setItem(

        "Lumenix_Customers_Backup",

        JSON.stringify(
            customerDatabase
        )

    );


}




// ==============================
// TECHNICIAN BACKUP
// ==============================


function backupTechnicianData(){


    localStorage.setItem(

        "Lumenix_Technician_Backup",

        JSON.stringify(
            technicianDatabase
        )

    );


}




// ==============================
// BOOKING BACKUP
// ==============================


function backupBookingData(){


    localStorage.setItem(

        "Lumenix_Booking_Backup",

        JSON.stringify(
            bookingRequestDatabase
        )

    );


}




// ==============================
// RESTORE BACKUP DATA
// ==============================


function restoreBackup(
    backupName
){


    const data =

    localStorage.getItem(
        backupName
    );



    if(data){


        return JSON.parse(
            data
        );


    }



    return null;


}




// ==============================
// DELETE STORED DATA
// ==============================


function clearSystemStorage(){


    localStorage.removeItem(

        "Lumenix_System_Data"

    );


    console.log(
    "System Storage Cleared"
    );


}




// ==============================
// STORAGE STATUS
// ==============================


function getStorageStatus(){


    const data =

    localStorage.getItem(
        "Lumenix_System_Data"
    );



    return {


        storageAvailable:

        data ? true : false,


        lastBackup:

        data ?

        JSON.parse(data).savedDate

        :

        "No Backup Found"


    };


}




// ==============================
// AUTO BACKUP
// ==============================


setInterval(

()=>{


    saveSystemData();


},

60000

);




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0019 Database Storage & Backup System Activated Successfully"
);
// =======================================================
// V2-JS-0020 : FINAL WEBSITE INTEGRATION & PERFORMANCE SYSTEM
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// =======================================================


// ==============================
// SYSTEM INITIALIZATION
// ==============================


function initializeLumenixSystem(){


    console.log(
    "Initializing Lumenix Service Point BD System..."
    );



    checkSystemHealth();


    loadSystemData();


    saveSystemData();



    console.log(
    "Lumenix System Ready"
    );


}




// ==============================
// SYSTEM HEALTH CHECK
// ==============================


function checkSystemHealth(){


    const modules = {


        customerSystem:

        typeof customerDatabase !== "undefined",



        technicianSystem:

        typeof technicianDatabase !== "undefined",



        bookingSystem:

        typeof bookingRequestDatabase !== "undefined",



        paymentSystem:

        typeof paymentDatabase !== "undefined",



        notificationSystem:

        typeof notificationDatabase !== "undefined",



        securitySystem:

        typeof securityLog !== "undefined"



    };



    console.table(modules);



    return modules;


}




// ==============================
// ERROR MONITORING SYSTEM
// ==============================


const systemErrors = [];



window.addEventListener(

"error",

function(event){



    systemErrors.push({


        message:

        event.message,


        file:

        event.filename,


        line:

        event.lineno,


        time:

        new Date().toLocaleString()


    });



    console.log(
    "System Error Recorded"
    );



});




// ==============================
// PERFORMANCE MONITOR
// ==============================


function getPerformanceReport(){



    if(
    window.performance
    ){



        const timing =

        window.performance.timing;



        return {


            pageLoadTime:

            timing.loadEventEnd -

            timing.navigationStart,



            domReady:

            timing.domContentLoadedEventEnd -

            timing.navigationStart



        };



    }



    return null;


}




// ==============================
// ONLINE STATUS CHECK
// ==============================


function checkOnlineStatus(){



    if(navigator.onLine){


        return "Online";


    }


    else{


        return "Offline";


    }



}




// ==============================
// FINAL SYSTEM REPORT
// ==============================


function getFinalSystemReport(){



    return {


        company:

        "MS FARDIN ELECTRIC",



        brand:

        "Lumenix Service Point BD",



        systemStatus:

        "Active",



        connection:

        checkOnlineStatus(),



        performance:

        getPerformanceReport(),



        errors:

        systemErrors.length



    };



}




// ==============================
// START SYSTEM
// ==============================


window.addEventListener(

"load",

()=>{


    initializeLumenixSystem();


}

);




// ==============================
// MODULE STATUS
// ==============================


console.log(
"V2-JS-0020 Final Website Integration & Performance System Activated Successfully"
);
// =======================================================
// V2-JS-0021 : AUTO CURRENT YEAR
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
