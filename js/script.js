/* ====================================================== */
/* JS-0001 : WINDOW INITIALIZATION + LOADER + HEADER START */
/* Version : V5.0 */
/* ====================================================== */

"use strict";

/* -----------------------------
   DOM Ready
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/* -----------------------------
   Main Initializer
------------------------------ */

function initializeWebsite() {

    setupLoader();

    setupStickyHeader();

    setupMobileMenu();

}

/* -----------------------------
   Loader
------------------------------ */

function setupLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.remove();

        }, 500);

    });

}

/* -----------------------------
   Sticky Header
------------------------------ */

function setupStickyHeader() {

    const header = document.getElementById("header");

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {

        passive: true

    });

}

/* -----------------------------
   Mobile Navigation
------------------------------ */

function setupMobileMenu() {

    const menuButton = document.querySelector(".menu-toggle");

    const navbar = document.getElementById("navbar");

    if (!menuButton || !navbar) return;

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navbar.contains(event.target);

        const clickedButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {

            navbar.classList.remove("active");

            menuButton.classList.remove("active");

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            navbar.classList.remove("active");

            menuButton.classList.remove("active");

        }

    });

}

/* ====================================================== */
/* JS-0001 : WINDOW INITIALIZATION + LOADER + HEADER END */
/* ====================================================== */
/* ====================================================== */
/* JS-0002 : SCROLL ANIMATION + BACK TO TOP START (V5) */
/* ====================================================== */

// Scroll Animation

const animatedElements = document.querySelectorAll(".fade-up, .zoom-in");

if ("IntersectionObserver" in window) {

    const animationObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"

    });

    animatedElements.forEach(element => {

        animationObserver.observe(element);

    });

} else {

    animatedElements.forEach(element => {

        element.classList.add("show");

    });

}

// Back To Top Button

const backToTop = document.querySelector(".floating-buttons .top");

if (backToTop) {

    // শুরুতে Hide থাকবে
    backToTop.style.display = "none";

    window.addEventListener("scroll", () => {

        backToTop.style.display =

            window.scrollY > 300 ? "flex" : "none";

    });

    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* ====================================================== */
/* JS-0002 : SCROLL ANIMATION + BACK TO TOP END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0004 : FORM VALIDATION + CONTACT ACTIONS START (V5) */
/* ====================================================== */

// Registration Form

const registrationForm = document.querySelector(".registration-form");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const requiredFields = registrationForm.querySelectorAll("[required]");

        let isValid = true;

        requiredFields.forEach(field => {

            field.style.borderColor = "#dcdcdc";

            if (field.type === "checkbox") {

                if (!field.checked) {

                    field.style.outline = "2px solid red";

                    isValid = false;

                } else {

                    field.style.outline = "none";

                }

            } else {

                if (field.value.trim() === "") {

                    field.style.borderColor = "red";

                    isValid = false;

                }

            }

        });

        if (!isValid) {

            alert("Please complete all required fields.");

            return;

        }

        alert("Registration submitted successfully.");

        registrationForm.reset();

    });

}

// Telephone Buttons

document.querySelectorAll('a[href^="tel:"]').forEach(button => {

    button.addEventListener("click", () => {

        console.log("Telephone Call Started.");

    });

});

// WhatsApp Buttons

document.querySelectorAll('a[href*="wa.me"]').forEach(button => {

    button.addEventListener("click", () => {

        console.log("WhatsApp Opened.");

    });

});

// Email Buttons

document.querySelectorAll('a[href^="mailto:"]').forEach(button => {

    button.addEventListener("click", () => {

        console.log("Email Link Opened.");

    });

});

/* ====================================================== */
/* JS-0004 : FORM VALIDATION + CONTACT ACTIONS END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0005 : FOOTER + WINDOW UTILITIES START (V5) */
/* ====================================================== */

// Current Year

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}

// Window Resize

window.addEventListener("resize", () => {

    if (window.innerWidth > 992 && navbar) {

        navbar.classList.remove("active");

    }

});

// Disable Logo Right Click

document.querySelectorAll(".logo img").forEach(logo => {

    logo.addEventListener("contextmenu", (event) => {

        event.preventDefault();

    });

});

// Image Optimization

document.querySelectorAll("img").forEach(image => {

    // Lazy Loading

    if (!image.hasAttribute("loading")) {

        image.setAttribute("loading", "lazy");

    }

    // Disable Drag

    image.setAttribute("draggable", "false");

    // Image Error

    image.addEventListener("error", function () {

        this.src = "images/no-image.png";

    });

});

// Website Information

console.log(

    "MS FARDIN ELECTRIC | LUMENIX Service Point BD | Website V5"

);

/* ====================================================== */
/* JS-0005 : FOOTER + WINDOW UTILITIES END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0006 : COUNTER + IMAGE OBSERVER START (V5) */
/* ====================================================== */

// Animated Counter

const counters = document.querySelectorAll(".counter");

if ("IntersectionObserver" in window && counters.length) {

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target) || 0;

            const duration = 2000;

            const startTime = performance.now();

            function animateCounter(currentTime) {

                const progress = Math.min(

                    (currentTime - startTime) / duration,

                    1

                );

                counter.textContent = Math.floor(

                    progress * target

                ).toLocaleString();

                if (progress < 1) {

                    requestAnimationFrame(animateCounter);

                } else {

                    counter.textContent = target.toLocaleString();

                }

            }

            requestAnimationFrame(animateCounter);

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.3

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}

// Fallback (Old Browser)

else {

    counters.forEach(counter => {

        counter.textContent = Number(

            counter.dataset.target || 0

        ).toLocaleString();

    });

}

/* ====================================================== */
/* JS-0006 : COUNTER + IMAGE OBSERVER END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0007 : PERFORMANCE + REVEAL UTILITIES START (V5) */
/* ====================================================== */

// Debounce Utility

function debounce(callback, delay = 100) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

// Optimized Body Scroll Class

const updateBodyState = debounce(() => {

    document.body.classList.toggle(

        "scrolled",

        window.scrollY > 50

    );

}, 50);

window.addEventListener("scroll", updateBodyState);

// Reveal Animation

const revealItems = document.querySelectorAll(

    ".card, .about-card, .brand-card"

);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"

        }

    );

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

} else {

    revealItems.forEach(item => {

        item.classList.add("show");

    });

}

// DOM Ready

document.addEventListener("DOMContentLoaded", () => {

    console.log(

        "Performance Module Ready."

    );

});

/* ====================================================== */
/* JS-0007 : PERFORMANCE + REVEAL UTILITIES END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0008 : PREMIUM UI UTILITIES START (V5) */
/* ====================================================== */

// Online / Offline Status

window.addEventListener("online", () => {

    console.log("Internet Connected.");

});

window.addEventListener("offline", () => {

    console.warn("Internet Disconnected.");

});

// Secure External Links

document.querySelectorAll("a[target='_blank']").forEach(link => {

    if (!link.hasAttribute("rel")) {

        link.setAttribute(

            "rel",

            "noopener noreferrer"

        );

    }

});

// Button Loading Effect

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function () {

        if (this.classList.contains("loading")) return;

        this.classList.add("loading");

        setTimeout(() => {

            this.classList.remove("loading");

        }, 600);

    });

});

// Disable Button During Form Submit

const submitButtons = document.querySelectorAll(

    ".registration-form button[type='submit']"

);

submitButtons.forEach(button => {

    button.addEventListener("click", function () {

        this.disabled = true;

        setTimeout(() => {

            this.disabled = false;

        }, 1200);

    });

});

// Browser Information

console.log(

    `Browser : ${navigator.userAgent}`

);

/* ====================================================== */
/* JS-0008 : PREMIUM UI UTILITIES END (V5) */
/* ====================================================== */
/* ====================================================== */
/* JS-0009 : FINAL OPTIMIZATION + WEBSITE STARTUP (V5) */
/* ====================================================== */

// Unified Scroll Manager

function handleWindowScroll() {

    // Active Navigation

    if (typeof updateActiveMenu === "function") {

        updateActiveMenu();

    }

    // Back To Top Button

    const backToTop = document.querySelector(".floating-buttons .top");

    if (backToTop) {

        backToTop.style.display =

            window.scrollY > 300 ? "flex" : "none";

    }

    // Header Shadow

    if (header) {

        header.style.boxShadow =

            window.scrollY > 50

            ? "0 10px 30px rgba(0,0,0,.12)"

            : "none";

    }

}

// Single Scroll Event

window.addEventListener(

    "scroll",

    debounce(handleWindowScroll, 20)

);

// Keyboard Shortcut

document.addEventListener("keydown", (event) => {

    if (event.key === "Home") {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});

// Website Ready

window.addEventListener("load", () => {

    document.body.classList.add("website-ready");

    handleWindowScroll();

    console.log(

        "========================================"

    );

    console.log(

        "MS FARDIN ELECTRIC"

    );

    console.log(

        "LUMENIX SERVICE POINT BD"

    );

    console.log(

        "Website Version : V5"

    );

    console.log(

        "Status : Ready"

    );

    console.log(

        "========================================"

    );

});

/* ====================================================== */
/* JS-0009 : FINAL OPTIMIZATION + WEBSITE STARTUP END (V5) */
/* ====================================================== */
