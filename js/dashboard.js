/* =========================================================
   LUMENIX V5.1
   Dashboard Controller
   RBAC + Super Admin
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           SECURITY
           ================================================= */

        if (
            !window.LumenixRBAC
        ) {

            window.location.href =
                "admin.html";

            return;

        }


        if (
            !LumenixRBAC.requireLogin(
                "admin.html"
            )
        ) {

            return;

        }


        const user =
            LumenixRBAC.currentUser();


        if (!user) {

            window.location.href =
                "admin.html";

            return;

        }


        /* =================================================
           USER INFORMATION
           ================================================= */

        const dashboardUser =
            document.querySelector(
                ".dashboard-user span"
            );


        if (dashboardUser) {

            dashboardUser.textContent =
                `${user.name} • ${formatRole(user.role)}`;

        }


        /* =================================================
           ROLE FORMAT
           ================================================= */

        function formatRole(role) {

            const roles = {

                super_admin:
                    "Super Admin",

                admin:
                    "Admin",

                manager:
                    "Manager",

                supervisor:
                    "Supervisor",

                technician:
                    "Technician",

                partner:
                    "Partner",

                dealer:
                    "Dealer",

                customer:
                    "Customer"

            };


            return (
                roles[role] ||
                role
            );

        }


        /* =================================================
           LOGOUT
           ================================================= */

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


                    LumenixRBAC
                        .clearSession();


                    window.location.href =
                        "admin.html";

                }
            );

        }


        /* =================================================
           NAVIGATION
           ================================================= */

        function navigateTo(
            page,
            module
        ) {


            if (
                !LumenixRBAC
                    .hasPermission(
                        module
                    )
            ) {

                alert(
                    "আপনার এই module ব্যবহারের permission নেই।"
                );

                return;

            }


            window.location.href =
                page;

        }


        /* =================================================
           MODULE MAP
           ================================================= */

        const navigation = {

            dashboardHomeBtn: {
                page: "dashboard.html",
                module:
                    LumenixRBAC.MODULES.DASHBOARD
            },

            projectBtn: {
                page: "project.html",
                module:
                    LumenixRBAC.MODULES.PROJECTS
            },

            accountsBtn: {
                page: "accounts.html",
                module:
                    LumenixRBAC.MODULES.ACCOUNTS
            },

            inventoryBtn: {
                page: "inventory.html",
                module:
                    LumenixRBAC.MODULES.INVENTORY
            },

            attendanceBtn: {
                page: "attendance.html",
                module:
                    LumenixRBAC.MODULES.ATTENDANCE
            },

            reportsBtn: {
                page: "reports.html",
                module:
                    LumenixRBAC.MODULES.REPORTS
            },

            settingsBtn: {
                page: "settings.html",
                module:
                    LumenixRBAC.MODULES.SETTINGS
            }

        };


        Object.keys(
            navigation
        ).forEach(
            function (id) {


                const element =
                    document.getElementById(
                        id
                    );


                if (!element) {
                    return;
                }


                const config =
                    navigation[id];


                if (
                    !LumenixRBAC
                        .hasPermission(
                            config.module
                        )
                ) {

                    element.parentElement
                        ?.classList
                        .add(
                            "rbac-hidden"
                        );

                    return;

                }


                element.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        navigateTo(
                            config.page,
                            config.module
                        );

                    }
                );

            }
        );


        /* =================================================
           QUICK ACTIONS
           ================================================= */

        const quickActions = {

            goProjectBtn: {
                page: "project.html",
                module:
                    LumenixRBAC.MODULES.PROJECTS
            },

            goAccountsBtn: {
                page: "accounts.html",
                module:
                    LumenixRBAC.MODULES.ACCOUNTS
            },

            goInventoryBtn: {
                page: "inventory.html",
                module:
                    LumenixRBAC.MODULES.INVENTORY
            },

            goAttendanceBtn: {
                page: "attendance.html",
                module:
                    LumenixRBAC.MODULES.ATTENDANCE
            },

            goReportsBtn: {
                page: "reports.html",
                module:
                    LumenixRBAC.MODULES.REPORTS
            },

            goSettingsBtn: {
                page: "settings.html",
                module:
                    LumenixRBAC.MODULES.SETTINGS
            }

        };


        Object.keys(
            quickActions
        ).forEach(
            function (id) {


                const element =
                    document.getElementById(
                        id
                    );


                if (!element) {
                    return;
                }


                const config =
                    quickActions[id];


                if (
                    !LumenixRBAC
                        .hasPermission(
                            config.module
                        )
                ) {

                    element.classList.add(
                        "rbac-hidden"
                    );

                    return;

                }


                element.addEventListener(
                    "click",
                    function () {

                        navigateTo(
                            config.page,
                            config.module
                        );

                    }
                );

            }
        );


        /* =================================================
           DASHBOARD SUMMARY
           ================================================= */

        const dashboardData = {

            projects: 0,

            income: 0,

            expense: 0,

            inventory: 0,

            lastUpdate:
                new Date()
                    .toLocaleString()

        };


        let currentData;


        try {

            const savedData =
                localStorage.getItem(
                    "lumenixDashboard"
                );


            currentData =
                savedData
                    ? JSON.parse(
                        savedData
                    )
                    : dashboardData;


        } catch (error) {

            currentData =
                dashboardData;

        }


        localStorage.setItem(
            "lumenixDashboard",
            JSON.stringify(
                currentData
            )
        );


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
                (
                    currentData.income ||
                    0
                );

        }


        if (totalExpense) {

            totalExpense.textContent =
                "৳" +
                (
                    currentData.expense ||
                    0
                );

        }


        if (totalInventory) {

            totalInventory.textContent =
                currentData.inventory || 0;

        }


        /* =================================================
           MONTHLY FINANCIAL
           ================================================= */

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


        /* =================================================
           INVENTORY
           ================================================= */

        const inventoryData = {

            products: 0,

            lowStock: 0,

            outOfStock: 0,

            value: 0

        };


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


        /* =================================================
           ATTENDANCE
           ================================================= */

        const attendanceData = {

            present: 0,

            absent: 0,

            leave: 0,

            late: 0

        };


        const attendanceElements = {

            present:
                "presentEmployees",

            absent:
                "absentEmployees",

            leave:
                "leaveEmployees",

            late:
                "lateEmployees"

        };


        Object.keys(
            attendanceElements
        ).forEach(
            function (key) {

                const element =
                    document.getElementById(
                        attendanceElements[key]
                    );


                if (element) {

                    element.textContent =
                        attendanceData[key];

                }

            }
        );


        /* =================================================
           TECHNICIANS
           ================================================= */

        const technicianData = {

            available: 0,

            working: 0,

            offline: 0

        };


        const technicianTotal =
            technicianData.available +
            technicianData.working +
            technicianData.offline;


        const technicianElements = {

            available:
                "availableTechnicians",

            working:
                "workingTechnicians",

            offline:
                "offlineTechnicians"

        };


        Object.keys(
            technicianElements
        ).forEach(
            function (key) {

                const element =
                    document.getElementById(
                        technicianElements[key]
                    );


                if (element) {

                    element.textContent =
                        technicianData[key];

                }

            }
        );


        const totalTechnicians =
            document.getElementById(
                "totalTechnicians"
            );


        if (totalTechnicians) {

            totalTechnicians.textContent =
                technicianTotal;

        }


        /* =================================================
           RECENT ACTIVITY
           ================================================= */

        const activityList =
            document.querySelector(
                ".activity-list"
            );


        if (activityList) {

            activityList.innerHTML = `

                <div class="activity-item">

                    <span>🔐</span>

                    <p>
                        Logged in as
                        ${escapeHTML(
                            formatRole(
                                user.role
                            )
                        )}
                    </p>

                </div>

                <div class="activity-item">

                    <span>🏢</span>

                    <p>
                        LUMENIX ecosystem ready.
                    </p>

                </div>

                <div class="activity-item">

                    <span>⚡</span>

                    <p>
                        RBAC permission system active.
                    </p>

                </div>

            `;

        }


        /* =================================================
           HELPERS
           ================================================= */

        function escapeHTML(value) {

            return String(
                value ?? ""
            )

                .replace(
                    /&/g,
                    "&amp;"
                )

                .replace(
                    /</g,
                    "&lt;"
                )

                .replace(
                    />/g,
                    "&gt;"
                )

                .replace(
                    /"/g,
                    "&quot;"
                )

                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =================================================
           SERVICE REQUEST
           ================================================= */

        const serviceRequestBody =
            document.getElementById(
                "serviceRequestBody"
            );


        if (serviceRequestBody) {

            serviceRequestBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        style="text-align:center;"
                    >
                        Service Point data
                        will appear here.
                    </td>

                </tr>

            `;

        }


        /* =================================================
           NOTIFICATIONS
           ================================================= */

        const notificationList =
            document.getElementById(
                "notificationList"
            );


        if (notificationList) {

            notificationList.innerHTML = `

                <li>
                    🔐 RBAC Security Active
                </li>

                <li>
                    🏢 LUMENIX Ecosystem Ready
                </li>

                <li>
                    👤 Role:
                    ${escapeHTML(
                        formatRole(
                            user.role
                        )
                    )}
                </li>

                <li>
                    🟢 System Running
                </li>

            `;

        }


        /* =================================================
           SYSTEM STATUS
           ================================================= */

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
                "🟢 Local Data Ready";

        }


        if (serverStatus) {

            serverStatus.textContent =
                "🟢 Application Online";

        }


        if (backupStatus) {

            backupStatus.textContent =
                "🟢 Local Storage Active";

        }


        console.log(
            "LUMENIX V5.1 RBAC Dashboard Loaded",
            user
        );


    }
);
