/* =====================================
AJ1 START
Admin Login Controller
LUMENIX V5.1 Premium
===================================== */

"use strict";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginBtn =
            document.getElementById(
                "adminLoginSystemBtn"
            );


        if (!loginBtn) return;


        loginBtn.addEventListener(
            "click",
            function () {

                const username =
                    document.getElementById(
                        "adminUsername"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "adminPassword"
                    ).value.trim();


                if (
                    username === "" ||
                    password === ""
                ) {

                    alert(
                        "Please enter Username and Password."
                    );

                    return;

                }


                if (
                    username === "admin" &&
                    password === "12345"
                ) {

                    alert(
                        "Login Successful"
                    );


                    localStorage.setItem(
                        "adminLoggedIn",
                        "true"
                    );


                    localStorage.setItem(
                        "adminRole",
                        "super_admin"
                    );


                    window.location.href =
                        "dashboard.html";


                } else {

                    alert(
                        "Invalid Username or Password"
                    );

                }

            }
        );

    }
);

/* =====================================
AJ1 END
===================================== */
