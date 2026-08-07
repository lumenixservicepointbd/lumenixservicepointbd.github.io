/* =====================================
DJ1 START
Dashboard Security
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "admin.html";

        return;

    }

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {

                localStorage.removeItem("adminLoggedIn");

                window.location.href = "admin.html";

            }

        });

    }

});

/* =====================================
DJ1 END
===================================== */
/* =====================================
DJ3 START
Quick Action Navigation
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const links = {

        goProjectBtn: "project.html",
        goAccountsBtn: "accounts.html",
        goInventoryBtn: "inventory.html",
        goAttendanceBtn: "attendance.html",
        goReportsBtn: "reports.html",
        goSettingsBtn: "settings.html"

    };

    Object.keys(links).forEach(function (id) {

        const btn = document.getElementById(id);

        if (btn) {

            btn.addEventListener("click", function () {

                window.location.href = links[id];

            });

        }

    });

});

/* =====================================
DJ3 END
===================================== */
/* =====================================
DJ4 START
Dashboard Recent Activity
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const activityList = document.querySelector(".activity-list");

    if (!activityList) return;

    const activityData = [

        {
            icon: "📁",
            text: "System Ready."
        },

        {
            icon: "💰",
            text: "Income & Expense Module Ready."
        },

        {
            icon: "📦",
            text: "Inventory Module Ready."
        },

        {
            icon: "👥",
            text: "Attendance Module Ready."
        }

    ];

    activityList.innerHTML = "";

    activityData.forEach(function (item) {

        activityList.innerHTML += `

            <div class="activity-item">

                <span>${item.icon}</span>

                <p>${item.text}</p>

            </div>

        `;

    });

});

/* =====================================
DJ4 END
===================================== */
/* =====================================
DJ5 START
Latest Projects Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const projectTable = document.querySelector(".projects-table tbody");

    if(!projectTable) return;


    const projects = [

        {
            id:"PR-001",
            name:"Electrical Installation",
            status:"Running"
        },

        {
            id:"PR-002",
            name:"Service & Maintenance",
            status:"Pending"
        },

        {
            id:"PR-003",
            name:"Smart Home Setup",
            status:"Completed"
        }

    ];


    projectTable.innerHTML="";


    projects.forEach(function(project){

        projectTable.innerHTML += `

        <tr>

            <td>${project.id}</td>

            <td>${project.name}</td>

            <td>${project.status}</td>

        </tr>

        `;

    });


});


/* =====================================
DJ5 END
===================================== */
/* =====================================
DJ7 START
Inventory Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const totalProducts = document.getElementById("totalProducts");
    const lowStockItems = document.getElementById("lowStockItems");
    const outOfStockItems = document.getElementById("outOfStockItems");
    const inventoryValue = document.getElementById("inventoryValue");


    if(
        !totalProducts ||
        !lowStockItems ||
        !outOfStockItems ||
        !inventoryValue
    ){

        return;

    }


    const inventoryData = {

        products: 120,

        lowStock: 8,

        outOfStock: 3,

        value: 250000

    };


    totalProducts.innerHTML = inventoryData.products;

    lowStockItems.innerHTML = inventoryData.lowStock;

    outOfStockItems.innerHTML = inventoryData.outOfStock;

    inventoryValue.innerHTML = "৳" + inventoryData.value;


});


/* =====================================
DJ7 END
===================================== */

/* =====================================
DJ8 START
Attendance Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const presentEmployees = document.getElementById("presentEmployees");
    const absentEmployees = document.getElementById("absentEmployees");
    const leaveEmployees = document.getElementById("leaveEmployees");
    const lateEmployees = document.getElementById("lateEmployees");


    if(
        !presentEmployees ||
        !absentEmployees ||
        !leaveEmployees ||
        !lateEmployees
    ){

        return;

    }


    const attendanceData = {

        present: 25,

        absent: 3,

        leave: 2,

        late: 1

    };


    presentEmployees.innerHTML = attendanceData.present;

    absentEmployees.innerHTML = attendanceData.absent;

    leaveEmployees.innerHTML = attendanceData.leave;

    lateEmployees.innerHTML = attendanceData.late;


});


/* =====================================
DJ8 END
===================================== */
/* =====================================
DJ9 START
Technician Status Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const availableTechnicians = document.getElementById("availableTechnicians");
    const workingTechnicians = document.getElementById("workingTechnicians");
    const offlineTechnicians = document.getElementById("offlineTechnicians");
    const totalTechnicians = document.getElementById("totalTechnicians");


    if(
        !availableTechnicians ||
        !workingTechnicians ||
        !offlineTechnicians ||
        !totalTechnicians
    ){

        return;

    }


    const technicianData = {

        available: 15,

        working: 8,

        offline: 2

    };


    const total = 
        technicianData.available +
        technicianData.working +
        technicianData.offline;


    availableTechnicians.innerHTML = technicianData.available;

    workingTechnicians.innerHTML = technicianData.working;

    offlineTechnicians.innerHTML = technicianData.offline;

    totalTechnicians.innerHTML = total;


});


/* =====================================
DJ9 END
===================================== */
/* =====================================
DJ10 START
Customer Service Requests Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const serviceRequestBody = document.getElementById("serviceRequestBody");


    if(!serviceRequestBody){

        return;

    }


    const serviceRequests = [

        {
            id:"SR-001",
            customer:"Customer A",
            service:"Electrical Repair",
            status:"Pending"
        },

        {
            id:"SR-002",
            customer:"Customer B",
            service:"Maintenance",
            status:"Completed"
        },

        {
            id:"SR-003",
            customer:"Customer C",
            service:"Installation",
            status:"Running"
        }

    ];


    serviceRequestBody.innerHTML="";


    serviceRequests.forEach(function(request){

        serviceRequestBody.innerHTML += `

        <tr>

            <td>${request.id}</td>

            <td>${request.customer}</td>

            <td>${request.service}</td>

            <td>${request.status}</td>

        </tr>

        `;

    });


});


/* =====================================
DJ10 END
===================================== */
/* =====================================
DJ11 START
Notifications Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const notificationList = document.getElementById("notificationList");


    if(!notificationList){

        return;

    }


    const notifications = [

        {
            icon:"🔔",
            text:"New service request received"
        },

        {
            icon:"📁",
            text:"Project management system updated"
        },

        {
            icon:"📦",
            text:"Inventory check completed"
        },

        {
            icon:"✅",
            text:"All dashboard modules are running"
        }

    ];


    notificationList.innerHTML="";


    notifications.forEach(function(notification){

        notificationList.innerHTML += `

        <li>

            ${notification.icon}
            ${notification.text}

        </li>

        `;

    });


});


/* =====================================
DJ11 END
===================================== */
/* =====================================
DJ12 START
System Status Controller
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const databaseStatus = document.getElementById("databaseStatus");
    const serverStatus = document.getElementById("serverStatus");
    const backupStatus = document.getElementById("backupStatus");


    if(
        !databaseStatus ||
        !serverStatus ||
        !backupStatus
    ){

        return;

    }


    const systemStatus = {

        database:"🟢 Connected",

        server:"🟢 Online",

        backup:"🟢 Updated"

    };


    databaseStatus.innerHTML = systemStatus.database;

    serverStatus.innerHTML = systemStatus.server;

    backupStatus.innerHTML = systemStatus.backup;


});


/* =====================================
DJ12 END
===================================== */
/* =====================================
DJ13 START
Local Storage Management
===================================== */

document.addEventListener("DOMContentLoaded", function(){

    const dashboardData = {

        projects:0,

        income:0,

        expense:0,

        inventory:0,

        lastUpdate:new Date().toLocaleString()

    };


    const savedData = localStorage.getItem("lumenixDashboard");


    if(!savedData){

        localStorage.setItem(

            "lumenixDashboard",

            JSON.stringify(dashboardData)

        );

    }


    const currentData = JSON.parse(

        localStorage.getItem("lumenixDashboard")

    );


    const totalProjects = document.getElementById("totalProjects");
    const totalIncome = document.getElementById("totalIncome");
    const totalExpense = document.getElementById("totalExpense");
    const totalInventory = document.getElementById("totalInventory");


    if(totalProjects){

        totalProjects.innerHTML = currentData.projects;

    }


    if(totalIncome){

        totalIncome.innerHTML = "৳" + currentData.income;

    }


    if(totalExpense){

        totalExpense.innerHTML = "৳" + currentData.expense;

    }


    if(totalInventory){

        totalInventory.innerHTML = currentData.inventory;

    }


});


/* =====================================
DJ13 END
===================================== */

       /* =====================================
DJ14 START
Dashboard UI Controller
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("LUMENIX Dashboard Loaded Successfully");

});

/* =====================================
DJ14 END
===================================== */        



