/* =========================================================
   LUMENIX
   INDEX / HOME PAGE
   Lightweight Navigation System
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================
           HELPER
        ================================================ */

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


        /* ================================================
           MENU
        ================================================ */

        const menuBtn =
            document.getElementById(
                "menuBtn"
            );

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


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
                        String(isOpen)
                    );


                    menuBtn.textContent =
                        isOpen
                            ? "✕ Close"
                            : "☰ Menu";

                }
            );

        }


        /* ================================================
           MENU LINKS
        ================================================ */

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
                            mobileMenu &&
                            menuBtn
                        ) {

                            mobileMenu.classList.remove(
                                "active"
                            );

                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            menuBtn.textContent =
                                "☰ Menu";

                        }

                    }
                );

            }
        );


        /* ================================================
           LOGIN
        ================================================ */

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


        /* ================================================
           EXPLORE ECOSYSTEM
        ================================================ */

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


        /* ================================================
           LIGHTING & ACCESSORIES
        ================================================ */

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


        /* ================================================
           SERVICE POINT
        ================================================ */

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


        /* ================================================
           TRAINING
        ================================================ */

        const trainingBtn =
            document.getElementById(
                "trainingBtn"
            );


        if (trainingBtn) {

            trainingBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "training-program.html"
                    );

                }
            );

        }


        /* ================================================
           ELECTRICAL SERVICE
        ================================================ */

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


        /* ================================================
           MAINTENANCE
        ================================================ */

        const maintenanceBtn =
            document.getElementById(
                "maintenanceBtn"
            );


        if (maintenanceBtn) {

            maintenanceBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "service-point.html"
                    );

                }
            );

        }


        /* ================================================
           SMART HOME
        ================================================ */

        const smartHomeBtn =
            document.getElementById(
                "smartHomeBtn"
            );


        if (smartHomeBtn) {

            smartHomeBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "service-point.html"
                    );

                }
            );

        }


        /* ================================================
           TRAINING - ELECTRICAL SKILLS
        ================================================ */

        const skillsTrainingBtn =
            document.getElementById(
                "skillsTrainingBtn"
            );


        if (skillsTrainingBtn) {

            skillsTrainingBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "training-program.html"
                    );

                }
            );

        }


        /* ================================================
           TRAINING - PROFESSIONAL
        ================================================ */

        const professionalTrainingBtn =
            document.getElementById(
                "professionalTrainingBtn"
            );


        if (professionalTrainingBtn) {

            professionalTrainingBtn.addEventListener(
                "click",
                function () {

                    goToPage(
                        "training-program.html"
                    );

                }
            );

        }


        /* ================================================
           DEALER
        ================================================ */

        const dealerBtn =
            document.getElementById(
                "dealerBtn"
            );


        if (dealerBtn) {

            dealerBtn.addEventListener(
                "click",
                function () {

                    showToast(
                        "Dealer module will be connected here."
                    );

                }
            );

        }


        /* ================================================
           PROJECT MANAGEMENT
        ================================================ */

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


        /* ================================================
           CONTACT
        ================================================ */

        const contactBtn =
            document.getElementById(
                "contactBtn"
            );


        if (contactBtn) {

            contactBtn.addEventListener(
                "click",
                function () {

                    showToast(
                        "Contact module is ready."
                    );

                }
            );

        }


        /* ================================================
           TOAST
        ================================================ */

        const toast =
            document.getElementById(
                "toast"
            );

        let toastTimer = null;


        function showToast(message) {

            if (!toast) {
                return;
            }


            clearTimeout(
                toastTimer
            );


            toast.textContent =
                message;


            toast.classList.add(
                "show"
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


        /* ================================================
           IMAGE FALLBACK
        ================================================ */

        const images =
            document.querySelectorAll(
                ".ecosystem-logo"
            );


        images.forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.style.display =
                            "none";

                        const parent =
                            image.parentElement;

                        if (parent) {

                            parent.classList.add(
                                "image-error"
                            );

                        }

                    }
                );

            }
        );


        /* ================================================
           HOME PAGE READY
        ================================================ */

        console.log(
            "LUMENIX Home Page loaded successfully."
        );

    }
);
