/* =====================================
LUMENIX V5.1
Dashboard Controller
UPDATED VERSION
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
    DJ1
    Dashboard Security + Logout
    ===================================== */

    const isLoggedIn =
        localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "admin.html";

        return;

    }


    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    localStorage.removeItem(
                        "adminLoggedIn"
                    );

                    localStorage.removeItem(
                        "adminRole"
                    );

                    localStorage.removeItem(
                        "currentUserRole"
                    );

                    window.location.href =
                        "admin.html";

                }

            }
        );

    }


    /* =====================================
    DJ2
    Dashboard Navigation
    ===================================== */

    function navigateTo(page) {

        window.location.href = page;

    }


    const dashboardHomeBtn =
        document.getElementById(
            "dashboardHomeBtn"
        );


    const projectBtn =
        document.getElementById(
            "projectBtn"
        );


    const accountsBtn =
        document.getElementById(
            "accountsBtn"
        );


    const inventoryBtn =
        document.getElementById(
            "inventoryBtn"
        );


    const attendanceBtn =
        document.getElementById(
            "attendanceBtn"
        );


    const reportsBtn =
        document.getElementById(
            "reportsBtn"
        );


    const settingsBtn =
        document.getElementById(
            "settingsBtn"
        );


    if (dashboardHomeBtn) {

        dashboardHomeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "dashboard.html"
                );

            }
        );

    }


    if (projectBtn) {

        projectBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "project.html"
                );

            }
        );

    }


    /*
    IMPORTANT:
    Income & Expense uses the
    existing project-accounts.html file.
    */

    if (accountsBtn) {

        accountsBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "project-accounts.html"
                );

            }
        );

    }


    /*
    These modules will be connected
    when their HTML pages are completed.
    */

    if (inventoryBtn) {

        inventoryBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "inventory.html"
                );

            }
        );

    }


    if (attendanceBtn) {

        attendanceBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "attendance.html"
                );

            }
        );

    }


    if (reportsBtn) {

        reportsBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "reports.html"
                );

            }
        );

    }


    if (settingsBtn) {

        settingsBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navigateTo(
                    "settings.html"
                );

            }
        );

    }


    /* =====================================
    DJ3
    Dashboard Summary Data
    ===================================== */

    const dashboardData = {

        projects: 0,

        income: 0,

        expense: 0,

        inventory: 0,

        lastUpdate:
            new Date().toLocaleString()

    };


    let currentData;


    const savedData =
        localStorage.getItem(
            "lumenixDashboard"
        );


    if (savedData) {

        try {

            currentData =
                JSON.parse(savedData);

        } catch (error) {

            currentData =
                dashboardData;

            localStorage.setItem(
                "lumenixDashboard",
                JSON.stringify(
                    dashboardData
                )
            );

        }

    } else {

        currentData =
            dashboardData;

        localStorage.setItem(
            "lumenixDashboard",
            JSON.stringify(
                dashboardData
            )
        );

    }


    const totalProjects =
        document.getElementById(
            "totalProjects"
        );


    const totalIncome =
        document.getElementById(
            "totalIncome"
        );


    const totalExpense =
        document.getElementById(
            "totalExpense"
        );


    const totalInventory =
        document.getElementById(
            "totalInventory"
        );


    if (totalProjects) {

        totalProjects.textContent =
            currentData.projects || 0;

    }


    if (totalIncome) {

        totalIncome.textContent =
            "৳" +
            (currentData.income || 0);

    }


    if (totalExpense) {

        totalExpense.textContent =
            "৳" +
            (currentData.expense || 0);

    }


    if (totalInventory) {

        totalInventory.textContent =
            currentData.inventory || 0;

    }


    /* =====================================
    DJ4
    Quick Action Navigation
    ===================================== */

    const goProjectBtn =
        document.getElementById(
            "goProjectBtn"
        );


    const goAccountsBtn =
        document.getElementById(
            "goAccountsBtn"
        );


    const goInventoryBtn =
        document.getElementById(
            "goInventoryBtn"
        );


    const goAttendanceBtn =
        document.getElementById(
            "goAttendanceBtn"
        );


    const goReportsBtn =
        document.getElementById(
            "goReportsBtn"
        );


    const goSettingsBtn =
        document.getElementById(
            "goSettingsBtn"
        );


    if (goProjectBtn) {

        goProjectBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "project.html"
                );

            }
        );

    }


    /*
    IMPORTANT:
    Quick Income & Expense button
    also uses project-accounts.html.
    */

    if (goAccountsBtn) {

        goAccountsBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "project-accounts.html"
                );

            }
        );

    }


    if (goInventoryBtn) {

        goInventoryBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "inventory.html"
                );

            }
        );

    }


    if (goAttendanceBtn) {

        goAttendanceBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "attendance.html"
                );

            }
        );

    }


    if (goReportsBtn) {

        goReportsBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "reports.html"
                );

            }
        );

    }


    if (goSettingsBtn) {

        goSettingsBtn.addEventListener(
            "click",
            function () {

                navigateTo(
                    "settings.html"
                );

            }
        );

    }


    /* =====================================
    DJ5
    Recent Activity
    ===================================== */

    const activityList =
        document.querySelector(
            ".activity-list"
        );


    if (activityList) {

        const activityData = [

            {
                icon: "📁",
                text: "System Ready."
            },

            {
                icon: "💰",
                text:
                    "Income & Expense Module Ready."
            },

            {
                icon: "📦",
                text:
                    "Inventory Module Ready."
            },

            {
                icon: "👥",
                text:
                    "Attendance Module Ready."
            }

        ];


        activityList.innerHTML = "";


        activityData.forEach(
            function (item) {

                const activityItem =
                    document.createElement(
                        "div"
                    );


                activityItem.className =
                    "activity-item";


                activityItem.innerHTML = `

                    <span>
                        ${item.icon}
                    </span>

                    <p>
                        ${item.text}
                    </p>

                `;


                activityList.appendChild(
                    activityItem
                );

            }
        );

    }


    /* =====================================
    DJ6
    Latest Projects
    ===================================== */

    const projectTable =
        document.getElementById(
            "latestProjectsBody"
        );


    if (projectTable) {

        let savedProjects = [];

        try {

            savedProjects =
                JSON.parse(
                    localStorage.getItem(
                        "lumenixProjects"
                    )
                ) || [];

        } catch (error) {

            savedProjects = [];

        }


        projectTable.innerHTML = "";


        if (savedProjects.length === 0) {

            projectTable.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        style="text-align:center;"
                    >
                        No Project Found
                    </td>

                </tr>

            `;

        } else {

            const latestProjects =
                savedProjects
                    .slice(-5)
                    .reverse();


            latestProjects.forEach(
                function (project) {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${project.id || ""}
                        </td>

                        <td>
                            ${project.customer || ""}
                        </td>

                        <td>
                            ${project.status || ""}
                        </td>

                        <td>
                            ৳${project.amount || 0}
                        </td>

                    `;


                    projectTable.appendChild(
                        row
                    );

                }
            );

        }

    }


    /* =====================================
    DJ7
    Income & Expense Overview
    ===================================== */

    const monthlyIncome =
        document.getElementById(
            "monthlyIncome"
        );


    const monthlyExpense =
        document.getElementById(
            "monthlyExpense"
        );


    const netProfit =
        document.getElementById(
            "netProfit"
        );


    const incomeValue =
        Number(
            currentData.income || 0
        );


    const expenseValue =
        Number(
            currentData.expense || 0
        );


    const profitValue =
        incomeValue -
        expenseValue;


    if (monthlyIncome) {

        monthlyIncome.textContent =
            "৳" +
            incomeValue;

    }


    if (monthlyExpense) {

        monthlyExpense.textContent =
            "৳" +
            expenseValue;

    }


    if (netProfit) {

        netProfit.textContent =
            "৳" +
            profitValue;

    }


    /* =====================================
    DJ8
    Inventory Overview
    ===================================== */

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );


    const lowStockItems =
        document.getElementById(
            "lowStockItems"
        );


    const outOfStockItems =
        document.getElementById(
            "outOfStockItems"
        );


    const inventoryValue =
        document.getElementById(
            "inventoryValue"
        );


    const inventoryData = {

        products: 120,

        lowStock: 8,

        outOfStock: 3,

        value: 250000

    };


    if (totalProducts) {

        totalProducts.textContent =
            inventoryData.products;

    }


    if (lowStockItems) {

        lowStockItems.textContent =
            inventoryData.lowStock;

    }


    if (outOfStockItems) {

        outOfStockItems.textContent =
            inventoryData.outOfStock;

    }


    if (inventoryValue) {

        inventoryValue.textContent =
            "৳" +
            inventoryData.value;

    }


    /* =====================================
    DJ9
    Attendance Overview
    ===================================== */

    const presentEmployees =
        document.getElementById(
            "presentEmployees"
        );


    const absentEmployees =
        document.getElementById(
            "absentEmployees"
        );


    const leaveEmployees =
        document.getElementById(
            "leaveEmployees"
        );


    const lateEmployees =
        document.getElementById(
            "lateEmployees"
        );


    const attendanceData = {

        present: 25,

        absent: 3,

        leave: 2,

        late: 1

    };


    if (presentEmployees) {

        presentEmployees.textContent =
            attendanceData.present;

    }


    if (absentEmployees) {

        absentEmployees.textContent =
            attendanceData.absent;

    }


    if (leaveEmployees) {

        leaveEmployees.textContent =
            attendanceData.leave;

    }


    if (lateEmployees) {

        lateEmployees.textContent =
            attendanceData.late;

    }


    /* =====================================
    DJ10
    Technician Status
    ===================================== */

    const availableTechnicians =
        document.getElementById(
            "availableTechnicians"
        );


    const workingTechnicians =
        document.getElementById(
            "workingTechnicians"
        );


    const offlineTechnicians =
        document.getElementById(
            "offlineTechnicians"
        );


    const totalTechnicians =
        document.getElementById(
            "totalTechnicians"
        );


    const technicianData = {

        available: 15,

        working: 8,

        offline: 2

    };


    const technicianTotal =
        technicianData.available +
        technicianData.working +
        technicianData.offline;


    if (availableTechnicians) {

        availableTechnicians.textContent =
            technicianData.available;

    }


    if (workingTechnicians) {

        workingTechnicians.textContent =
            technicianData.working;

    }


    if (offlineTechnicians) {

        offlineTechnicians.textContent =
            technicianData.offline;

    }


    if (totalTechnicians) {

        totalTechnicians.textContent =
            technicianTotal;

    }


    /* =====================================
    DJ11
    Customer Service Requests
    ===================================== */

    const serviceRequestBody =
        document.getElementById(
            "serviceRequestBody"
        );


    if (serviceRequestBody) {

        const serviceRequests = [

            {
                id: "SR-001",
                customer: "Customer A",
                service:
                    "Electrical Repair",
                status: "Pending"
            },

            {
                id: "SR-002",
                customer: "Customer B",
                service:
                    "Maintenance",
                status: "Completed"
            },

            {
                id: "SR-003",
                customer: "Customer C",
                service:
                    "Installation",
                status: "Running"
            }

        ];


        serviceRequestBody.innerHTML = "";


        serviceRequests.forEach(
            function (request) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        ${request.id}
                    </td>

                    <td>
                        ${request.customer}
                    </td>

                    <td>
                        ${request.service}
                    </td>

                    <td>
                        ${request.status}
                    </td>

                `;


                serviceRequestBody.appendChild(
                    row
                );

            }
        );

    }


    /* =====================================
    DJ12
    Notifications
    ===================================== */

    const notificationList =
        document.getElementById(
            "notificationList"
        );


    if (notificationList) {

        const notifications = [

            {
                icon: "🔔",
                text:
                    "New service request received"
            },

            {
                icon: "📁",
                text:
                    "Project management system updated"
            },

            {
                icon: "📦",
                text:
                    "Inventory check completed"
            },

            {
                icon: "✅",
                text:
                    "All dashboard modules are running"
            }

        ];


        notificationList.innerHTML = "";


        notifications.forEach(
            function (notification) {

                const item =
                    document.createElement(
                        "li"
                    );


                item.textContent =
                    notification.icon +
                    " " +
                    notification.text;


                notificationList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================
    DJ13
    System Status
    ===================================== */

    const databaseStatus =
        document.getElementById(
            "databaseStatus"
        );


    const serverStatus =
        document.getElementById(
            "serverStatus"
        );


    const backupStatus =
        document.getElementById(
            "backupStatus"
        );


    if (databaseStatus) {

        databaseStatus.textContent =
            "🟢 Connected";

    }


    if (serverStatus) {

        serverStatus.textContent =
            "🟢 Online";

    }


    if (backupStatus) {

        backupStatus.textContent =
            "🟢 Updated";

    }


    /* =====================================
    DJ14
    Dashboard Ready
    ===================================== */

    console.log(
        "LUMENIX V5.1 Dashboard Loaded Successfully"
    );

});
