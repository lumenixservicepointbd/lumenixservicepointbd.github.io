/* =========================================
   LUMENIX SERVICE POINT BD
   V5.1 PREMIUM
   Service Point Controller
   ========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       STORAGE
       ========================================= */

    const PROJECT_STORAGE_KEY = "lumenixProjects";
    const SERVICE_STORAGE_KEY = "lumenixServiceRequests";
    const CUSTOMER_STORAGE_KEY = "lumenixCustomers";
    const TECHNICIAN_STORAGE_KEY = "lumenixTechnicians";


    /* =========================================
       HELPERS
       ========================================= */

    function readStorage(key, fallback = []) {

        try {

            const saved = localStorage.getItem(key);

            if (!saved) {
                return fallback;
            }

            const parsed = JSON.parse(saved);

            return parsed ?? fallback;

        } catch (error) {

            console.warn(
                "Storage read error:",
                key,
                error
            );

            return fallback;

        }

    }


    function saveStorage(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }


    function formatMoney(value) {

        const amount = Number(value) || 0;

        return (
            "৳" +
            amount.toLocaleString("en-BD")
        );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function today() {

        const date = new Date();

        return date.toISOString()
            .split("T")[0];

    }


    function showToast(message) {

        const toast =
            document.getElementById("toast");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(
            showToast.timer
        );

        showToast.timer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);

    }


    /* =========================================
       LOGIN SECURITY
       ========================================= */

    const loggedIn =
        localStorage.getItem(
            "adminLoggedIn"
        );

    if (loggedIn !== "true") {

        window.location.href =
            "admin.html";

        return;

    }


    /* =========================================
       BRAND LOGOS
       ========================================= */

    const brandCards =
        document.querySelectorAll(
            ".brand-card"
        );


    brandCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                brandCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                card.classList.add(
                    "active"
                );

            }
        );

    });


    /* =========================================
       LOAD DATA
       ========================================= */

    let projects =
        readStorage(
            PROJECT_STORAGE_KEY,
            []
        );

    let serviceRequests =
        readStorage(
            SERVICE_STORAGE_KEY,
            []
        );

    let customers =
        readStorage(
            CUSTOMER_STORAGE_KEY,
            []
        );

    let technicians =
        readStorage(
            TECHNICIAN_STORAGE_KEY,
            []
        );


    /* =========================================
       ELEMENTS
       ========================================= */

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

    const totalCustomers =
        document.getElementById(
            "totalCustomers"
        );

    const serviceTableBody =
        document.getElementById(
            "serviceRequestBody"
        );

    const projectTableBody =
        document.getElementById(
            "latestProjectsBody"
        );


    /* =========================================
       PROJECT SUMMARY
       ========================================= */

    function calculateProjectSummary() {

        let income = 0;

        let expense = 0;


        projects.forEach(
            function (project) {

                income +=
                    Number(
                        project.income ||
                        project.amount ||
                        0
                    );

                expense +=
                    Number(
                        project.expense ||
                        0
                    );

            }
        );


        if (totalProjects) {

            totalProjects.textContent =
                projects.length;

        }


        if (totalIncome) {

            totalIncome.textContent =
                formatMoney(income);

        }


        if (totalExpense) {

            totalExpense.textContent =
                formatMoney(expense);

        }


        if (totalCustomers) {

            totalCustomers.textContent =
                customers.length;

        }

    }


    /* =========================================
       PROJECT TABLE
       ========================================= */

    function renderProjects() {

        if (!projectTableBody) return;


        projectTableBody.innerHTML = "";


        if (
            !projects ||
            projects.length === 0
        ) {

            projectTableBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="empty-state"
                    >
                        No Project Found
                    </td>

                </tr>

            `;

            return;

        }


        const latest =
            projects
                .slice(-5)
                .reverse();


        latest.forEach(
            function (project) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        ${escapeHTML(
                            project.id ||
                            project.projectId ||
                            "-"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.customer ||
                            project.customerName ||
                            "-"
                        )}
                    </td>

                    <td>

                        <span class="status-badge status-active">

                            ${escapeHTML(
                                project.status ||
                                "Active"
                            )}

                        </span>

                    </td>

                    <td>
                        ${formatMoney(
                            project.amount ||
                            project.value ||
                            0
                        )}
                    </td>

                `;


                projectTableBody.appendChild(
                    row
                );

            }
        );

    }


    /* =========================================
       SERVICE REQUEST TABLE
       ========================================= */

    function renderServiceRequests() {

        if (!serviceTableBody) return;


        serviceTableBody.innerHTML = "";


        if (
            !serviceRequests ||
            serviceRequests.length === 0
        ) {

            serviceTableBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="empty-state"
                    >
                        No Service Request Found
                    </td>

                </tr>

            `;

            return;

        }


        serviceRequests
            .slice(-10)
            .reverse()
            .forEach(
                function (request) {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    const status =
                        String(
                            request.status ||
                            "Pending"
                        );


                    let statusClass =
                        "status-pending";


                    if (
                        status.toLowerCase()
                            .includes("complete")
                    ) {

                        statusClass =
                            "status-completed";

                    }


                    if (
                        status.toLowerCase()
                            .includes("cancel")
                    ) {

                        statusClass =
                            "status-cancelled";

                    }


                    row.innerHTML = `

                        <td>
                            ${escapeHTML(
                                request.id ||
                                request.requestId ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.customer ||
                                request.customerName ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.service ||
                                request.serviceType ||
                                "-"
                            )}
                        </td>

                        <td>

                            <span
                                class="status-badge ${statusClass}"
                            >
                                ${escapeHTML(status)}
                            </span>

                        </td>

                    `;


                    serviceTableBody.appendChild(
                        row
                    );

                }
            );

    }


    /* =========================================
       QUICK ACTIONS
       ========================================= */

    const quickActionButtons =
        document.querySelectorAll(
            ".quick-action-btn"
        );


    quickActionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const target =
                        button.dataset.target;


                    if (!target) {
                        return;
                    }


                    window.location.href =
                        target;

                }
            );

        }
    );


    /* =========================================
       COMMON NAVIGATION BUTTONS
       ========================================= */

    const navigationMap = {

        dashboardBtn:
            "dashboard.html",

        projectBtn:
            "project.html",

        accountsBtn:
            "project-accounts.html",

        inventoryBtn:
            "inventory.html",

        attendanceBtn:
            "attendance.html",

        reportsBtn:
            "reports.html",

        settingsBtn:
            "settings.html"

    };


    Object.keys(
        navigationMap
    ).forEach(
        function (id) {

            const button =
                document.getElementById(id);


            if (!button) return;


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.location.href =
                        navigationMap[id];

                }
            );

        }
    );


    /* =========================================
       BACK / DASHBOARD
       ========================================= */

    const backDashboardBtn =
        document.getElementById(
            "backDashboardBtn"
        );


    if (backDashboardBtn) {

        backDashboardBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }


    /* =========================================
       LOGOUT
       ========================================= */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {
                    return;
                }


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
        );

    }


    /* =========================================
       LOGO IMAGE ERROR HANDLING
       ========================================= */

    document
        .querySelectorAll(
            ".brand-logo img, .service-point-brand img"
        )
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.style.display =
                            "none";

                    }
                );

            }
        );


    /* =========================================
       INITIAL RENDER
       ========================================= */

    calculateProjectSummary();

    renderProjects();

    renderServiceRequests();


    /* =========================================
       SYSTEM LOG
       ========================================= */

    console.log(
        "LUMENIX Service Point V5.1 loaded successfully."
    );

});
