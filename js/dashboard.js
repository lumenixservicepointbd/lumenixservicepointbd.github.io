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
