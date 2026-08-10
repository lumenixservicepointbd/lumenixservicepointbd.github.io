/* =========================================================
   LUMENIX
   HOMEPAGE JAVASCRIPT
   Lightweight / Mobile Friendly
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================
           HELPERS
        ================================= */

        function goToPage(page) {

            if (!page) {
                return;
            }

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


        /* ================================
           MENU
        ================================= */

        const menuBtn =
            document.getElementById(
                "menuBtn"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        if (
            menuBtn &&
            mobileMenu
        ) {

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
                            ? "true"
                            : "false"
                    );

                }
            );

        }


        /* ================================
           CLOSE MENU AFTER LINK CLICK
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

                        if (
                            mobileMenu
                        ) {

                            mobileMenu.classList.remove(
                                "active"
                            );

                        }


                        if (
                            menuBtn
                        ) {

                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );

            }
        );


        /* ================================
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


        /* ================================
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


        /* ================================
           LIGHTING & ACCESSORIES
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


        /* ================================
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


        /* ================================
           SERVICE BOOKING
        ================================= */

        const serviceBookBtn =
            document.getElementById(
                "serviceBookBtn"
            );


        if (serviceBookBtn) {

            serviceBookBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "service-point.html"
                    );

                }
            );

        }


        /* ================================
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
                     * Existing training module.
                     * Change this filename only if
                     * your main training page uses
                     * another filename.
                     */

                    goToPage(
                        "training-program.html"
                    );

                }
            );

        }


        /* ================================
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

                    /*
                     * Dealer module can be connected
                     * here when its main page is ready.
                     */

                    scrollToSection(
                        "dealer"
                    );

                }
            );

        }


        /* ================================
           PROJECT MANAGEMENT
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


        /* ================================
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

                }
            );

        }


        /* ================================
           KEYBOARD ACCESSIBILITY
        ================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    mobileMenu
                ) {

                    mobileMenu.classList.remove(
                        "active"
                    );


                    if (menuBtn) {

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }
        );


        /* ================================
           HOME PAGE READY
        ================================= */

        console.log(
            "LUMENIX Homepage loaded successfully."
        );


    }
);
