/* =====================================
LUMENIX V5.1 PREMIUM
Dashboard Controller
RBAC + Super Admin Foundation
===================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================
        DJ1
        SESSION + ROLE SECURITY
        ===================================== */

        const isLoggedIn =
            localStorage.getItem(
                "adminLoggedIn"
            );


        const role =
            localStorage.getItem(
                "adminRole"
            );


        if (isLoggedIn !== "true") {

            window.location.href =
                "admin.html";

            return;

        }


        if (!role) {

            localStorage.removeItem(
                "adminLoggedIn"
            );

            window.location.href =
                "admin.html";

            return;

        }


        /*
        SUPER ADMIN
        Full System Access
        */

        const isSuperAdmin =
            role === "super_admin";


        if (isSuperAdmin) {

            console.log(
                "LUMENIX Super Admin: Full Access Granted"
            );

        }


        /* =====================================
        DJ2
        LOGGED USER DISPLAY
        ===================================== */

        const dashboardUser =
            document.querySelector(
                ".dashboard-user span"
            );


        if (dashboardUser) {

            if (isSuperAdmin) {

                dashboardUser.textContent =
                    "Super Administrator";

            } else {

                dashboardUser.textContent =
                    "Administrator";

            }

        }


        /* =====================================
        DJ3
        LOGOUT
        ===================================== */

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function () {

                    const confirmLogout =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (!confirmLogout) {
                        return;
                    }


                    localStorage.removeItem(
                        "adminLoggedIn"
                    );


                    localStorage.removeItem(
                        "adminRole"
                    );


                    window.location.href =
                        "admin.html";

                }
            );

        }


        /* =====================================
        DJ4
        NAVIGATION
        ===================================== */

        function navigateTo(page) {

            window.location.href =
                page;

        }


        const navigation = {

            dashboardHomeBtn:
                "dashboard.html",

            projectBtn:
                "project.html",

            accountsBtn:
                "accounts.html",

            inventoryBtn:
                "inventory.html",

            attendanceBtn:
                "attendance.html",

            reportsBtn:
                "reports.html",

            settingsBtn:
                "settings.html"

        };


        Object.keys(navigation)
            .forEach(
                function (buttonId) {

                    const button =
                        document.getElementById(
                            buttonId
                        );


                    if (!button) {
                        return;
                    }


                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            navigateTo(
                                navigation[
                                    buttonId
                                ]
                            );

                        }
                    );

                }
            );


        /* =====================================
        DJ5
        QUICK ACTIONS
        ===================================== */

        const quickActions = {

            goProjectBtn:
                "project.html",

            goAccountsBtn:
                "accounts.html",

            goInventoryBtn:
                "inventory.html",

            goAttendanceBtn:
                "attendance.html",

            goReportsBtn:
                "reports.html",

            goSettingsBtn:
                "settings.html"

        };


        Object.keys(quickActions)
            .forEach(
                function (buttonId) {

                    const button =
                        document.getElementById(
                            buttonId
                        );


                    if (!button) {
                        return;
                    }


                    button.addEventListener(
                        "click",
                        function () {

                            navigateTo(
                                quickActions[
                                    buttonId
                                ]
                            );

                        }
                    );

                }
            );


        /* =====================================
        DJ6
        DASHBOARD DATA
        ===================================== */

        const defaultDashboardData = {

            projects: 0,

            income: 0,

            expense: 0,

            inventory: 0,

            lastUpdate:
                new Date().toISOString()

        };


        let currentData =
            defaultDashboardData;


        const savedDashboardData =
            localStorage.getItem(
                "lumenixDashboard"
            );


        if (savedDashboardData) {

            try {

                const parsedData =
                    JSON.parse(
                        savedDashboardData
                    );


                if (
                    parsedData &&
                    typeof parsedData ===
                    "object"
                ) {

                    currentData = {

                        ...defaultDashboardData,

                        ...parsedData

                    };

                }

            } catch (error) {

                console.warn(
                    "Dashboard data could not be loaded.",
                    error
                );

            }

        }


        localStorage.setItem(
            "lumenixDashboard",
            JSON.stringify(
                currentData
            )
        );


        /* =====================================
        DJ7
        SUMMARY CARDS
        ===================================== */

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
                Number(
                    currentData.projects || 0
                );

        }


        if (totalIncome) {

            totalIncome.textContent =
                "৳" +
                Number(
                    currentData.income || 0
                );

        }


        if (totalExpense) {

            totalExpense.textContent =
                "৳" +
                Number(
                    currentData.expense || 0
                );

        }


        if (totalInventory) {

            totalInventory.textContent =
                Number(
                    currentData.inventory || 0
                );

        }


        /* =====================================
        DJ8
        RECENT ACTIVITY
        ===================================== */

        const activityList =
            document.querySelector(
                ".activity-list"
            );


        if (activityList) {

            const activityData = [

                {
                    icon: "📁",
                    text:
                        "Project Management Module Ready."
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


                    const icon =
                        document.createElement(
                            "span"
                        );


                    icon.textContent =
                        item.icon;


                    const text =
                        document.createElement(
                            "p"
                        );


                    text.textContent =
                        item.text;


                    activityItem.appendChild(
                        icon
                    );


                    activityItem.appendChild(
                        text
                    );


                    activityList.appendChild(
                        activityItem
                    );

                }
            );

        }


        /* =====================================
        DJ9
        LATEST PROJECTS
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


            if (
                !Array.isArray(
                    savedProjects
                ) ||
                savedProjects.length === 0
            ) {

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

                savedProjects
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .forEach(
                        function (project) {

                            const row =
                                document.createElement(
                                    "tr"
                                );


                            const id =
                                document.createElement(
                                    "td"
                                );

                            id.textContent =
                                project.id || "-";


                            const customer =
                                document.createElement(
                                    "td"
                                );

                            customer.textContent =
                                project.customer ||
                                "-";


                            const status =
                                document.createElement(
                                    "td"
                                );

                            status.textContent =
                                project.status ||
                                "-";


                            const amount =
                                document.createElement(
                                    "td"
                                );

                            amount.textContent =
                                "৳" +
                                Number(
                                    project.amount ||
                                    0
                                );


                            row.appendChild(id);

                            row.appendChild(
                                customer
                            );

                            row.appendChild(status);

                            row.appendChild(
                                amount
                            );


                            projectTable.appendChild(
                                row
                            );

                        }
                    );

            }

        }


        /* =====================================
        DJ10
        INCOME + EXPENSE
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
        DJ11
        INVENTORY OVERVIEW
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

            products: 0,

            lowStock: 0,

            outOfStock: 0,

            value: 0

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
        DJ12
        ATTENDANCE OVERVIEW
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

            present: 0,

            absent: 0,

            leave: 0,

            late: 0

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
        DJ13
        TECHNICIAN STATUS
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

            available: 0,

            working: 0,

            offline: 0

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
        DJ14
        CUSTOMER SERVICE REQUESTS

        Loads Service Point bookings
        ===================================== */

        const serviceRequestBody =
            document.getElementById(
                "serviceRequestBody"
            );


        if (serviceRequestBody) {

            let serviceBookings = [];


            try {

                serviceBookings =
                    JSON.parse(
                        localStorage.getItem(
                            "lumenix_service_bookings"
                        )
                    ) || [];

            } catch (error) {

                serviceBookings = [];

            }


            serviceRequestBody.innerHTML = "";


            if (
                !Array.isArray(
                    serviceBookings
                ) ||
                serviceBookings.length === 0
            ) {

                serviceRequestBody.innerHTML = `

                    <tr>

                        <td
                            colspan="4"
                            style="text-align:center;"
                        >
                            No Service Request Found
                        </td>

                    </tr>

                `;

            } else {

                const customers =
                    JSON.parse(
                        localStorage.getItem(
                            "lumenix_service_customers"
                        ) || "[]"
                    );


                serviceBookings
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .forEach(
                        function (booking) {

                            const customer =
                                customers.find(
                                    function (
                                        item
                                    ) {

                                        return (
                                            item.id ===
                                            booking.customerId
                                        );

                                    }
                                );


                            const row =
                                document.createElement(
                                    "tr"
                                );


                            const id =
                                document.createElement(
                                    "td"
                                );

                            id.textContent =
                                booking.id ||
                                "-";


                            const customerCell =
                                document.createElement(
                                    "td"
                                );

                            customerCell.textContent =
                                customer?.name ||
                                "Unknown";


                            const service =
                                document.createElement(
                                    "td"
                                );

                            service.textContent =
                                booking.service ||
                                "-";


                            const status =
                                document.createElement(
                                    "td"
                                );

                            status.textContent =
                                booking.status ||
                                "-";


                            row.appendChild(id);

                            row.appendChild(
                                customerCell
                            );

                            row.appendChild(
                                service
                            );

                            row.appendChild(
                                status
                            );


                            serviceRequestBody.appendChild(
                                row
                            );

                        }
                    );

            }

        }


        /* =====================================
        DJ15
        NOTIFICATIONS
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
                        "LUMENIX system is ready."
                },

                {
                    icon: "📁",
                    text:
                        "Project Management available."
                },

                {
                    icon: "📦",
                    text:
                        "Inventory module ready."
                },

                {
                    icon: "👥",
                    text:
                        "Attendance module ready."
                }

            ];


            notificationList.innerHTML = "";


            notifications.forEach(
                function (
                    notification
                ) {

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
        DJ16
        SYSTEM STATUS
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
        DJ17
        RBAC FOUNDATION

        These permissions will be expanded
        when staff/manager accounts are added.
        ===================================== */

        const permissions = {

            super_admin: {

                dashboard: true,

                projects: true,

                accounts: true,

                inventory: true,

                attendance: true,

                reports: true,

                settings: true,

                customers: true,

                technicians: true,

                dealers: true,

                servicePoint: true,

                lighting: true,

                callCenter: true,

                msFardinElectric: true

            }

        };


        const currentPermissions =
            permissions[role] || {};


        window.LUMENIX_ACCESS = {

            role: role,

            isSuperAdmin:
                isSuperAdmin,

            permissions:
                currentPermissions

        };


        /* =====================================
        DJ18
        DASHBOARD READY
        ===================================== */

        console.log(
            "LUMENIX V5.1 Dashboard Loaded Successfully"
        );


        console.log(
            "Current Role:",
            role
        );


        console.log(
            "Access:",
            currentPermissions
        );


    }
);
