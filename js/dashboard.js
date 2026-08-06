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
