/* =====================================
   LUMENIX SERVICE POINT
   V5.1 — Service Point Controller
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
       HELPERS
       ===================================== */

    function getData(key, fallback = []) {

        try {

            const saved =
                localStorage.getItem(key);

            if (!saved) {
                return fallback;
            }

            const parsed =
                JSON.parse(saved);

            return parsed ?? fallback;

        } catch (error) {

            console.warn(
                "Could not load:",
                key,
                error
            );

            return fallback;
        }
    }


    function money(value) {

        const amount =
            Number(value) || 0;

        return "৳" +
            amount.toLocaleString("en-BD");
    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================
       HEADER BUTTONS
       ===================================== */

    const dashboardBtn =
        document.getElementById(
            "dashboardBtn"
        );

    const backDashboardBtn =
        document.getElementById(
            "backDashboardBtn"
        );

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    function goDashboard(event) {

        if (event) {
            event.preventDefault();
        }

        window.location.href =
            "dashboard.html";
    }


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            goDashboard
        );

    }


    if (backDashboardBtn) {

        backDashboardBtn.addEventListener(
            "click",
            goDashboard
        );

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

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


    /* =====================================
       BRAND / PROJECT DATA
       ===================================== */

    const brands = [

        {
            id: "lighting",
            name:
                "LUMENIX Lighting & Accessories",
            description:
                "Lighting products, accessories and dealer network.",
            logo:
                "images/lumenix-led-logo-white.png"
        },

        {
            id: "service_point",
            name:
                "LUMENIX Service Point BD",
            description:
                "Customer service, repair and technical support.",
            logo:
                "images/lumenix-service-logo-white.png"
        },

        {
            id: "training",
            name:
                "LUMENIX Technical Training Center",
            description:
                "Technical training and skill development.",
            logo:
                "images/lumenix-training-logo.png"
        }

    ];


    /* =====================================
       BRAND CARD RENDER
       ===================================== */

    const brandGrid =
        document.getElementById(
            "brandGrid"
        );


    function renderBrands() {

        if (!brandGrid) {
            return;
        }

        brandGrid.innerHTML = "";

        brands.forEach(function (brand, index) {

            const card =
                document.createElement("div");

            card.className =
                "brand-card";

            if (index === 0) {
                card.classList.add("active");
            }

            card.dataset.project =
                brand.id;

            card.innerHTML = `

                <div class="brand-logo">

                    <img
                        src="${escapeHTML(brand.logo)}"
                        alt="${escapeHTML(brand.name)}"
                    >

                </div>

                <div class="brand-info">

                    <h3>
                        ${escapeHTML(brand.name)}
                    </h3>

                    <p>
                        ${escapeHTML(brand.description)}
                    </p>

                </div>

            `;

            card.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".brand-card"
                        )
                        .forEach(function (item) {

                            item.classList.remove(
                                "active"
                            );

                        });

                    card.classList.add(
                        "active"
                    );

                    localStorage.setItem(
                        "lumenixSelectedProject",
                        brand.id
                    );

                    updateDashboard(
                        brand.id
                    );

                }
            );

            brandGrid.appendChild(card);

        });

    }


    /* =====================================
       PROJECT DATA
       ===================================== */

    const projects =
        getData(
            "lumenixProjects",
            []
        );


    const transactions =
        getData(
            "lumenixTransactions",
            []
        );


    const payments =
        getData(
            "lumenixPayments",
            []
        );


    /* =====================================
       SUMMARY ELEMENTS
       ===================================== */

    const totalProjects =
        document.getElementById(
            "totalProjects"
        );

    const totalCustomers =
        document.getElementById(
            "totalCustomers"
        );

    const totalServices =
        document.getElementById(
            "totalServices"
        );

    const pendingServices =
        document.getElementById(
            "pendingServices"
        );


    /* =====================================
       DASHBOARD UPDATE
       ===================================== */

    function updateDashboard(projectId) {

        const projectTransactions =
            transactions.filter(
                function (item) {

                    return (
                        item.projectId ===
                        projectId
                    );

                }
            );


        const projectPayments =
            payments.filter(
                function (item) {

                    return (
                        item.projectId ===
                        projectId
                    );

                }
            );


        let income = 0;
        let expense = 0;


        projectTransactions.forEach(
            function (item) {

                const amount =
                    Number(item.amount) || 0;

                if (
                    item.type ===
                    "income"
                ) {

                    income += amount;

                } else if (
                    item.type ===
                    "expense"
                ) {

                    expense += amount;

                }

            }
        );


        const customerCount =
            new Set(
                projectPayments.map(
                    function (item) {

                        return item.customer;

                    }
                )
            ).size;


        if (totalProjects) {

            totalProjects.textContent =
                projects.filter(
                    function (project) {

                        return (
                            project.projectType ===
                            projectId ||
                            project.projectId ===
                            projectId
                        );

                    }
                ).length;

        }


        if (totalCustomers) {

            totalCustomers.textContent =
                customerCount;

        }


        if (totalServices) {

            totalServices.textContent =
                projectTransactions.length;

        }


        if (pendingServices) {

            pendingServices.textContent =
                projectTransactions.filter(
                    function (item) {

                        return (
                            String(
                                item.status || ""
                            ).toLowerCase() ===
                            "pending"
                        );

                    }
                ).length;

        }


        renderTransactions(
            projectTransactions
        );

        renderPayments(
            projectPayments
        );

        updateFinancialCards(
            income,
            expense
        );

    }


    /* =====================================
       FINANCIAL CARDS
       ===================================== */

    function updateFinancialCards(
        income,
        expense
    ) {

        const totalIncome =
            document.getElementById(
                "totalIncome"
            );

        const totalExpense =
            document.getElementById(
                "totalExpense"
            );

        const currentBalance =
            document.getElementById(
                "currentBalance"
            );

        const profitLoss =
            document.getElementById(
                "profitLoss"
            );


        const balance =
            income - expense;


        if (totalIncome) {

            totalIncome.textContent =
                money(income);

        }


        if (totalExpense) {

            totalExpense.textContent =
                money(expense);

        }


        if (currentBalance) {

            currentBalance.textContent =
                money(balance);

        }


        if (profitLoss) {

            profitLoss.textContent =
                money(balance);

        }

    }


    /* =====================================
       TRANSACTIONS
       ===================================== */

    const transactionBody =
        document.getElementById(
            "transactionTableBody"
        );


    function renderTransactions(items) {

        if (!transactionBody) {
            return;
        }


        transactionBody.innerHTML = "";


        if (
            !items ||
            items.length === 0
        ) {

            transactionBody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        style="text-align:center;padding:28px;"
                    >
                        No transaction found.
                    </td>

                </tr>

            `;

            return;

        }


        items
            .slice()
            .reverse()
            .slice(0, 10)
            .forEach(
                function (item) {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            ${escapeHTML(
                                item.date || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.type || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.category || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.description || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.reference || "-"
                            )}
                        </td>

                        <td>
                            ${money(
                                item.amount
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.status ||
                                "Completed"
                            )}
                        </td>

                    `;

                    transactionBody.appendChild(
                        row
                    );

                }
            );

    }


    /* =====================================
       PAYMENTS
       ===================================== */

    const paymentBody =
        document.getElementById(
            "paymentTableBody"
        );


    function renderPayments(items) {

        if (!paymentBody) {
            return;
        }


        paymentBody.innerHTML = "";


        if (
            !items ||
            items.length === 0
        ) {

            paymentBody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        style="text-align:center;padding:28px;"
                    >
                        No payment record found.
                    </td>

                </tr>

            `;

            return;

        }


        items
            .slice()
            .reverse()
            .slice(0, 10)
            .forEach(
                function (item) {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            ${escapeHTML(
                                item.date || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.customer || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.method || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.reference || "-"
                            )}
                        </td>

                        <td>
                            ${money(
                                item.amount
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.status ||
                                "Completed"
                            )}
                        </td>

                    `;

                    paymentBody.appendChild(
                        row
                    );

                }
            );

    }


    /* =====================================
       SELECTED PROJECT
       ===================================== */

    const savedProject =
        localStorage.getItem(
            "lumenixSelectedProject"
        );


    const selectedProject =
        brands.some(
            function (brand) {

                return (
                    brand.id ===
                    savedProject
                );

            }
        )
            ? savedProject
            : brands[0].id;


    /* =====================================
       INITIAL LOAD
       ===================================== */

    renderBrands();

    updateDashboard(
        selectedProject
    );


    /* =====================================
       RESTORE ACTIVE BRAND
       ===================================== */

    document
        .querySelectorAll(".brand-card")
        .forEach(function (card) {

            if (
                card.dataset.project ===
                selectedProject
            ) {

                document
                    .querySelectorAll(
                        ".brand-card"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });

                card.classList.add(
                    "active"
                );

            }

        });


    /* =====================================
       READY
       ===================================== */

    console.log(
        "LUMENIX Service Point V5.1 loaded."
    );

});
