/* =====================================
DJ1 START
Dashboard Security
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "admin.html";

    }

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("adminLoggedIn");

            window.location.href = "admin.html";

        });

    }

});

/* =====================================
DJ1 END
===================================== */

/* =====================================
DJ2 START
Dashboard Summary Data
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const totalProjects = document.getElementById("totalProjects");
    const totalIncome = document.getElementById("totalIncome");
    const totalExpense = document.getElementById("totalExpense");
    const totalInventory = document.getElementById("totalInventory");

    if (totalProjects) totalProjects.textContent = "0";

    if (totalIncome) totalIncome.textContent = "৳0";

    if (totalExpense) totalExpense.textContent = "৳0";

    if (totalInventory) totalInventory.textContent = "0";

});

/* =====================================
DJ2 END
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
