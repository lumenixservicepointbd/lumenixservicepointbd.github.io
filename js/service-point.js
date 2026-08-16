/* =====================================
   LUMENIX SERVICE POINT BD
   FINAL NAVIGATION + MY PROFILE
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


        if (
            loggedIn !== "true"
        ) {

            window.location.href =
                "admin.html";

            return;

        }



        /* =====================================
           NAVIGATION
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

                    if (
                        !confirm(
                            "Are you sure you want to logout?"
                        )
                    ) {
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
           MY PROFILE
        ===================================== */

        bindNavigation(
            "myProfileBtn",
            "technician-my-profile.html"
        );



        /* =====================================
           TECHNICIAN PROFILE
        ===================================== */

        bindNavigation(
            "technicianProfileBtn",
            "service-technician-profile.html"
        );



        /* =====================================
           SHOPKEEPER
        ===================================== */

        bindNavigation(
            "shopkeeperProfileBtn",
            "shopkeeper-partnership.html"
        );



        /* =====================================
           QUICK CUSTOMER
        ===================================== */

        bindNavigation(
            "quickCustomerBtn",
            "service-customer-profile.html"
        );



        /* =====================================
           QUICK TECHNICIAN
        ===================================== */

        bindNavigation(
            "quickTechnicianBtn",
            "service-technician-profile.html"
        );



        /* =====================================
           QUICK SHOPKEEPER
        ===================================== */

        bindNavigation(
            "quickShopkeeperBtn",
            "shopkeeper-partnership.html"
        );



        /* =====================================
           QUICK DEALER
           Lighting division profile
        ===================================== */

        bindNavigation(
            "quickDealerBtn",
            "dealer-profile.html"
        );



        /* =====================================
           SERVICE REQUESTS
           Same page section
        ===================================== */

        const quickServiceBtn =
            document.getElementById(
                "quickServiceBtn"
            );


        if (quickServiceBtn) {

            quickServiceBtn.addEventListener(
                "click",
                function () {

                    const section =
                        document.querySelector(
                            ".requests-section"
                        );


                    if (section) {

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }



        /* =====================================
           REPORTS
           No reports.html yet
        ===================================== */

        const quickReportsBtn =
            document.getElementById(
                "quickReportsBtn"
            );


        if (quickReportsBtn) {

            quickReportsBtn.addEventListener(
                "click",
                function () {

                    const section =
                        document.querySelector(
                            ".overview-section"
                        );


                    if (section) {

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

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

            } catch (
                error
            ) {

                console.error(
                    "Service request data error:",
                    error
                );


                return [];

            }

        }



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

                    }


                    if (
                        status === "working" ||
                        status === "running" ||
                        status === "in progress" ||
                        status === "in-progress"
                    ) {

                        working++;

                    }


                    if (
                        status === "completed" ||
                        status === "complete" ||
                        status === "done"
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



        function loadServiceRequests() {

            if (!tableBody) {
                return;
            }


            const requests =
                getRequests();


            tableBody.innerHTML =
                "";


            if (
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


                updateOverview(
                    []
                );


                return;

            }


            requests
                .slice(-10)
                .reverse()
                .forEach(
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
                                    request.id || "-"
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



        console.log(
            "LUMENIX Service Point BD ready."
        );

    }
);
