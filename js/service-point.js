/* =====================================
   LUMENIX V5.2
   SERVICE POINT BD
   NAVIGATION + OPERATION FIX
===================================== */

"use strict";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================
           SECURITY
        ===================================== */

        const loggedIn =
            localStorage.getItem(
                "adminLoggedIn"
            );

        if (loggedIn !== "true") {

            window.location.href =
                "admin.html";

            return;
        }


        /* =====================================
           NAVIGATION HELPERS
        ===================================== */

        function goTo(page) {

            window.location.href =
                page;

        }


        function bindNavigation(
            id,
            page
        ) {

            const element =
                document.getElementById(
                    id
                );

            if (!element) {
                return;
            }


            element.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    goTo(page);

                }
            );

        }


        function scrollToSection(
            selector
        ) {

            const section =
                document.querySelector(
                    selector
                );

            if (!section) {
                return;
            }


            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* =====================================
           HEADER
        ===================================== */

        bindNavigation(
            "dashboardBtn",
            "dashboard.html"
        );


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function () {

                    const confirmLogout =
                        window.confirm(
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

                    localStorage.removeItem(
                        "currentUserRole"
                    );


                    goTo(
                        "admin.html"
                    );

                }
            );

        }


        /* =====================================
           SERVICE PROFILE CENTER
        ===================================== */

        /*
         * My Profile
         * No separate profile.html exists.
         * Keep the button working by returning
         * to the Service Point profile center.
         */

        const myProfileBtn =
            document.getElementById(
                "myProfileBtn"
            );


        if (myProfileBtn) {

            myProfileBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        ".profile-section"
                    );

                }
            );

        }


        /*
         * REAL SERVICE PROFILE FILES
         */

        bindNavigation(
            "technicianProfileBtn",
            "service-technician-profile.html"
        );


        bindNavigation(
            "shopkeeperProfileBtn",
            "shopkeeper-partnership.html"
        );


        /*
         * If a Service Customer button
         * exists, connect it automatically.
         */

        bindNavigation(
            "serviceCustomerProfileBtn",
            "service-customer-profile.html"
        );


        /* =====================================
           QUICK ACTIONS
        ===================================== */

        /*
         * Customer
         * → Service Customer Profile
         */

        bindNavigation(
            "quickCustomerBtn",
            "service-customer-profile.html"
        );


        /*
         * Service Requests
         * No separate service-requests.html exists.
         * The Service Point already contains the
         * Recent Service Requests section.
         */

        const quickServiceBtn =
            document.getElementById(
                "quickServiceBtn"
            );


        if (quickServiceBtn) {

            quickServiceBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        ".requests-section"
                    );

                }
            );

        }


        /*
         * Technician
         */

        bindNavigation(
            "quickTechnicianBtn",
            "service-technician-profile.html"
        );


        /*
         * Dealer
         *
         * Dealer belongs to Lighting division,
         * but this existing Service Point button
         * can still open the existing dealer profile.
         */

        bindNavigation(
            "quickDealerBtn",
            "dealer-profile.html"
        );


        /*
         * Shopkeeper
         */

        bindNavigation(
            "quickShopkeeperBtn",
            "shopkeeper-partnership.html"
        );


        /*
         * Reports
         * No reports.html currently exists.
         * Keep the button functional by taking
         * the user to the Service Overview.
         */

        const quickReportsBtn =
            document.getElementById(
                "quickReportsBtn"
            );


        if (quickReportsBtn) {

            quickReportsBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        ".overview-section"
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


        function normalizeStatus(
            value
        ) {

            return String(
                value || ""
            )
                .trim()
                .toLowerCase();

        }


        function getRequests() {

            try {

                const saved =
                    localStorage.getItem(
                        "lumenixServiceRequests"
                    );


                if (!saved) {

                    return [];

                }


                const parsed =
                    JSON.parse(
                        saved
                    );


                return Array.isArray(
                    parsed
                )
                    ? parsed
                    : [];

            } catch (error) {

                console.error(
                    "Service request data error:",
                    error
                );


                return [];

            }

        }


        function loadServiceRequests() {

            if (!tableBody) {
                return;
            }


            const requests =
                getRequests();


            tableBody.innerHTML =
                "";


            if (
                requests.length ===
                0
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


                updateOverview(
                    []
                );


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


            updateOverview(
                requests
            );

        }


        /* =====================================
           OVERVIEW
        ===================================== */

        function updateOverview(
            requests
        ) {

            const totalElement =
                document.getElementById(
                    "totalRequests"
                );


            const pendingElement =
                document.getElementById(
                    "pendingRequests"
                );


            const workingElement =
                document.getElementById(
                    "workingRequests"
                );


            const completedElement =
                document.getElementById(
                    "completedRequests"
                );


            let pending = 0;
            let working = 0;
            let completed = 0;


            requests.forEach(
                function (request) {

                    const status =
                        normalizeStatus(
                            request.status
                        );


                    if (
                        status ===
                        "pending"
                    ) {

                        pending++;

                        return;

                    }


                    if (
                        status ===
                            "working" ||
                        status ===
                            "running" ||
                        status ===
                            "in progress" ||
                        status ===
                            "in-progress"
                    ) {

                        working++;

                        return;

                    }


                    if (
                        status ===
                            "completed" ||
                        status ===
                            "complete" ||
                        status ===
                            "done"
                    ) {

                        completed++;

                    }

                }
            );


            if (totalElement) {

                totalElement.textContent =
                    requests.length;

            }


            if (pendingElement) {

                pendingElement.textContent =
                    pending;

            }


            if (workingElement) {

                workingElement.textContent =
                    working;

            }


            if (completedElement) {

                completedElement.textContent =
                    completed;

            }

        }


        /* =====================================
           TOAST
        ===================================== */

        const toast =
            document.getElementById(
                "serviceToast"
            );


        let toastTimer =
            null;


        function showToast(
            message
        ) {

            if (!toast) {
                return;
            }


            toast.textContent =
                message;


            toast.classList.add(
                "show"
            );


            clearTimeout(
                toastTimer
            );


            toastTimer =
                setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    2500
                );

        }


        /* =====================================
           INITIAL LOAD
        ===================================== */

        loadServiceRequests();


        /* =====================================
           STORAGE SYNC
        ===================================== */

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    "lumenixServiceRequests"
                ) {

                    loadServiceRequests();

                }

            }
        );


        /* =====================================
           READY
        ===================================== */

        console.log(
            "LUMENIX Service Point BD loaded successfully."
        );

    }
);
