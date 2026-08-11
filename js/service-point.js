/* =====================================
LUMENIX V5.1
SERVICE POINT CONTROLLER
REPLACEMENT VERSION
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
    SECURITY
    ===================================== */

    const loggedIn =
        localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {

        window.location.href = "admin.html";

        return;
    }


    /* =====================================
    NAVIGATION HELPER
    ===================================== */

    function goTo(page) {

        window.location.href = page;

    }


    /* =====================================
    HEADER NAVIGATION
    ===================================== */

    const dashboardBtn =
        document.getElementById("dashboardBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            function () {

                goTo("dashboard.html");

            }
        );

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) return;


                localStorage.removeItem(
                    "adminLoggedIn"
                );

                localStorage.removeItem(
                    "adminRole"
                );

                localStorage.removeItem(
                    "currentUserRole"
                );


                goTo("admin.html");

            }
        );

    }


    /* =====================================
    DIVISION NAVIGATION
    ===================================== */

    /*
    IMPORTANT:
    Only ONE set of division cards exists
    in the new HTML.

    Each card uses data-division.
    */


    const divisionButtons =
        document.querySelectorAll(
            ".division-btn"
        );


    divisionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const division =
                        button.dataset.division;


                    if (
                        division ===
                        "service-point"
                    ) {

                        /*
                        Current page.
                        No unnecessary reload.
                        */

                        showToast(
                            "Service Point is already open."
                        );

                        return;

                    }


                    if (
                        division ===
                        "lighting"
                    ) {

                        /*
                        Lighting division.
                        */

                        goTo(
                            "lighting.html"
                        );

                        return;

                    }


                    if (
                        division ===
                        "training"
                    ) {

                        /*
                        Training division.
                        */

                        goTo(
                            "training.html"
                        );

                        return;

                    }

                }
            );

        }
    );


    /* =====================================
    DIVISION CARD CLICK
    ===================================== */

    const divisionCards =
        document.querySelectorAll(
            ".division-card"
        );


    divisionCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    /*
                    Do not fire when the actual
                    button was clicked.
                    */

                    if (
                        event.target.closest(
                            ".division-btn"
                        )
                    ) {

                        return;

                    }


                    const division =
                        card.dataset.division;


                    if (
                        division ===
                        "service-point"
                    ) {

                        setActiveDivision(
                            card
                        );

                        return;

                    }


                    if (
                        division ===
                        "lighting"
                    ) {

                        goTo(
                            "lighting.html"
                        );

                        return;

                    }


                    if (
                        division ===
                        "training"
                    ) {

                        goTo(
                            "training.html"
                        );

                        return;

                    }

                }
            );

        }
    );


    function setActiveDivision(
        selectedCard
    ) {

        divisionCards.forEach(
            function (card) {

                card.classList.remove(
                    "active"
                );

            }
        );


        selectedCard.classList.add(
            "active"
        );

    }


    /* =====================================
    QUICK ACTIONS
    ===================================== */

    const quickCustomerBtn =
        document.getElementById(
            "quickCustomerBtn"
        );


    const quickServiceBtn =
        document.getElementById(
            "quickServiceBtn"
        );


    const quickTechnicianBtn =
        document.getElementById(
            "quickTechnicianBtn"
        );


    const quickDealerBtn =
        document.getElementById(
            "quickDealerBtn"
        );


    const quickShopkeeperBtn =
        document.getElementById(
            "quickShopkeeperBtn"
        );


    const quickReportsBtn =
        document.getElementById(
            "quickReportsBtn"
        );


    /* =====================================
    CUSTOMERS
    ===================================== */

    if (quickCustomerBtn) {

        quickCustomerBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "customers.html"
                );

            }
        );

    }


    /* =====================================
    SERVICE REQUESTS
    ===================================== */

    if (quickServiceBtn) {

        quickServiceBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "service-requests.html"
                );

            }
        );

    }


    /* =====================================
    TECHNICIANS
    ===================================== */

    if (quickTechnicianBtn) {

        quickTechnicianBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "technicians.html"
                );

            }
        );

    }


    /* =====================================
    DEALERS
    ===================================== */

    if (quickDealerBtn) {

        quickDealerBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "dealers.html"
                );

            }
        );

    }


    /* =====================================
    SHOPKEEPERS
    ===================================== */

    if (quickShopkeeperBtn) {

        quickShopkeeperBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "shopkeepers.html"
                );

            }
        );

    }


    /* =====================================
    REPORTS
    ===================================== */

    if (quickReportsBtn) {

        quickReportsBtn.addEventListener(
            "click",
            function () {

                goTo(
                    "reports.html"
                );

            }
        );

    }


    /* =====================================
    SERVICE REQUEST DATA
    ===================================== */

    const tableBody =
        document.getElementById(
            "serviceRequestTableBody"
        );


    function loadServiceRequests() {

        if (!tableBody) return;


        let requests = [];


        try {

            requests =
                JSON.parse(
                    localStorage.getItem(
                        "lumenixServiceRequests"
                    )
                ) || [];

        } catch (error) {

            requests = [];

        }


        tableBody.innerHTML = "";


        if (
            !Array.isArray(requests) ||
            requests.length === 0
        ) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        class="empty-state"
                    >
                        No service request found.
                    </td>

                </tr>

            `;

            updateOverview([]);

            return;

        }


        const latestRequests =
            requests
                .slice(-10)
                .reverse();


        latestRequests.forEach(
            function (request) {

                const row =
                    document.createElement(
                        "tr"
                    );


                const status =
                    request.status ||
                    "Pending";


                row.innerHTML = `

                    <td>
                        ${escapeHTML(
                            request.id ||
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
                        ${escapeHTML(
                            request.technician ||
                            "-"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            status
                        )}
                    </td>

                `;


                tableBody.appendChild(
                    row
                );

            }
        );


        updateOverview(requests);

    }


    /* =====================================
    OVERVIEW
    ===================================== */

    function updateOverview(
        requests
    ) {

        const totalRequests =
            document.getElementById(
                "totalRequests"
            );


        const pendingRequests =
            document.getElementById(
                "pendingRequests"
            );


        const workingRequests =
            document.getElementById(
                "workingRequests"
            );


        const completedRequests =
            document.getElementById(
                "completedRequests"
            );


        const total =
            requests.length;


        const pending =
            requests.filter(
                function (item) {

                    return normalizeStatus(
                        item.status
                    ) === "pending";

                }
            ).length;


        const working =
            requests.filter(
                function (item) {

                    const status =
                        normalizeStatus(
                            item.status
                        );

                    return (
                        status ===
                            "working" ||
                        status ===
                            "in progress" ||
                        status ===
                            "running"
                    );

                }
            ).length;


        const completed =
            requests.filter(
                function (item) {

                    return normalizeStatus(
                        item.status
                    ) === "completed";

                }
            ).length;


        if (totalRequests) {

            totalRequests.textContent =
                total;

        }


        if (pendingRequests) {

            pendingRequests.textContent =
                pending;

        }


        if (workingRequests) {

            workingRequests.textContent =
                working;

        }


        if (completedRequests) {

            completedRequests.textContent =
                completed;

        }

    }


    /* =====================================
    HELPERS
    ===================================== */

    function normalizeStatus(
        value
    ) {

        return String(
            value || ""
        )
            .trim()
            .toLowerCase();

    }


    function escapeHTML(
        value
    ) {

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


    /* =====================================
    TOAST
    ===================================== */

    const toast =
        document.getElementById(
            "serviceToast"
        );


    function showToast(
        message
    ) {

        if (!toast) {

            alert(message);

            return;

        }


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            showToast.timer
        );


        showToast.timer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


    /* =====================================
    INITIAL LOAD
    ===================================== */

    loadServiceRequests();


    console.log(
        "LUMENIX Service Point V5.1 loaded successfully."
    );

});
