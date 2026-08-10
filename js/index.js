/* =====================================================
   LUMENIX
   INDEX / HOME PAGE JAVASCRIPT
   ===================================================== */

"use strict";


/* =========================================
HELPERS
========================================= */

function goToPage(page) {

    window.location.href = page;

}


function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================
        MENU
        ================================= */

        const menuBtn =
            document.getElementById("menuBtn");

        const mobileMenu =
            document.getElementById("mobileMenu");


        if (menuBtn && mobileMenu) {

            menuBtn.addEventListener(
                "click",
                function () {

                    const isOpen =
                        mobileMenu.classList.toggle(
                            "active"
                        );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        isOpen
                    );

                }
            );

        }


        /* =================================
        MENU LINKS
        ================================= */

        const menuLinks =
            document.querySelectorAll(
                ".mobile-menu a"
            );


        menuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (mobileMenu) {

                            mobileMenu.classList.remove(
                                "active"
                            );

                        }

                        if (menuBtn) {

                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );

            }
        );


        /* =================================
        LOGIN
        ================================= */

        const loginBtn =
            document.getElementById(
                "loginBtn"
            );


        if (loginBtn) {

            loginBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "admin.html"
                    );

                }
            );

        }


        /* =================================
        EXPLORE ECOSYSTEM
        ================================= */

        const exploreBtn =
            document.getElementById(
                "exploreBtn"
            );


        if (exploreBtn) {

            exploreBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "ecosystem"
                    );

                }
            );

        }


        /* =================================
        LIGHTING
        IMPORTANT
        ================================= */

        const lightingBtn =
            document.getElementById(
                "lightingBtn"
            );


        if (lightingBtn) {

            lightingBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "lighting-accessories.html"
                    );

                }
            );

        }


        /* =================================
        SERVICE POINT
        ================================= */

        const servicePointBtn =
            document.getElementById(
                "servicePointBtn"
            );


        if (servicePointBtn) {

            servicePointBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "service-point.html"
                    );

                }
            );

        }


        /* =================================
        ELECTRICAL SERVICE
        ================================= */

        const electricalServiceBtn =
            document.getElementById(
                "electricalServiceBtn"
            );


        if (electricalServiceBtn) {

            electricalServiceBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "service-point.html"
                    );

                }
            );

        }


        /* =================================
        TRAINING
        ================================= */

        const trainingBtn =
            document.getElementById(
                "trainingBtn"
            );


        if (trainingBtn) {

            trainingBtn.addEventListener(
                "click",
                function () {

                    /*
                     * Training module page.
                     * Change this filename later
                     * if your main training page
                     * has another name.
                     */

                    goToPage(
                        "training.html"
                    );

                }
            );

        }


        /* =================================
        DEALER
        ================================= */

        const dealerBtn =
            document.getElementById(
                "dealerBtn"
            );


        if (dealerBtn) {

            dealerBtn.addEventListener(
                "click",
                function () {

                    showToast(
                        "Dealer Network module is ready.",
                        "success"
                    );

                }
            );

        }


        /* =================================
        PROJECT
        ================================= */

        const projectBtn =
            document.getElementById(
                "projectBtn"
            );


        if (projectBtn) {

            projectBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "project.html"
                    );

                }
            );

        }


        /* =================================
        CONTACT
        ================================= */

        const contactBtn =
            document.getElementById(
                "contactBtn"
            );


        if (contactBtn) {

            contactBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "contact"
                    );

                    showToast(
                        "Contact section opened.",
                        "success"
                    );

                }
            );

        }


        /* =================================
        CLOSE MENU WHEN CLICKING OUTSIDE
        ================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileMenu ||
                    !menuBtn
                ) {
                    return;
                }


                const clickedInsideMenu =
                    mobileMenu.contains(
                        event.target
                    );


                const clickedMenuButton =
                    menuBtn.contains(
                        event.target
                    );


                if (
                    mobileMenu.classList.contains(
                        "active"
                    ) &&
                    !clickedInsideMenu &&
                    !clickedMenuButton
                ) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* =================================
        TOAST
        ================================= */

        window.showToast =
            function (
                message,
                type = "success"
            ) {

                const toast =
                    document.getElementById(
                        "toast"
                    );


                if (!toast) {
                    return;
                }


                toast.textContent =
                    message;


                toast.className =
                    "toast show " + type;


                clearTimeout(
                    window.lumenixToastTimer
                );


                window.lumenixToastTimer =
                    setTimeout(
                        function () {

                            toast.className =
                                "toast";

                        },
                        2500
                    );

            };


        /* =================================
        PAGE LOADED
        ================================= */

        console.log(
            "LUMENIX Home Page loaded successfully."
        );

    }
);
