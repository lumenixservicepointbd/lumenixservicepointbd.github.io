/* ====================================================== */
/* JS-0001 : LOADER + MOBILE MENU + HEADER START */
/* ====================================================== */

// Loader

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },500);

    }

});

// Mobile Menu

const menuToggle = document.querySelector(".menu-toggle");

const navbar = document.getElementById("navbar");

if(menuToggle && navbar){

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

// Sticky Header Shadow

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";

    }else{

        header.style.boxShadow = "none";

    }

});

/* ====================================================== */
/* JS-0001 : LOADER + MOBILE MENU + HEADER END */
/* ====================================================== */

/* ====================================================== */
/* JS-0002 : SCROLL ANIMATION + BACK TO TOP START */
/* ====================================================== */

// Scroll Animation

const animatedElements = document.querySelectorAll(".fade-up, .zoom-in");

const animationObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:0.15

});

animatedElements.forEach(element => {

    animationObserver.observe(element);

});

// Back To Top Button

const backToTop = document.querySelector(".floating-buttons .top");

if(backToTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){

            backToTop.style.display = "flex";

        }else{

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ====================================================== */
/* JS-0002 : SCROLL ANIMATION + BACK TO TOP END */
/* ====================================================== */
/* ====================================================== */
/* JS-0003 : SMOOTH NAVIGATION + ACTIVE MENU START */
/* ====================================================== */

// Smooth Navigation

document.querySelectorAll('#navbar a').forEach(link => {

    link.addEventListener('click', function(e){

        const targetId = this.getAttribute('href');

        if(targetId.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({

                    behavior:'smooth',
                    block:'start'

                });

            }

            navbar.classList.remove("active");

        }

    });

});

// Active Menu

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    document.querySelectorAll("#navbar a").forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

/* ====================================================== */
/* JS-0003 : SMOOTH NAVIGATION + ACTIVE MENU END */
/* ====================================================== */
/* ====================================================== */
/* JS-0004 : FORM VALIDATION + CONTACT ACTIONS START */
/* ====================================================== */

// Registration Form Validation

const registrationForm = document.querySelector(".registration-form");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const requiredFields = registrationForm.querySelectorAll("[required]");

        let isValid = true;

        requiredFields.forEach(field => {

            if (field.value.trim() === "") {

                field.style.borderColor = "red";
                isValid = false;

            } else {

                field.style.borderColor = "#dddddd";

            }

        });

        if (isValid) {

            alert("Registration submitted successfully.");

            registrationForm.reset();

        } else {

            alert("Please fill in all required fields.");

        }

    });

}

// Call Buttons

document.querySelectorAll('a[href^="tel:"]').forEach(button => {

    button.addEventListener("click", () => {

        console.log("Call button clicked.");

    });

});

// WhatsApp Buttons

document.querySelectorAll('a[href*="wa.me"]').forEach(button => {

    button.addEventListener("click", () => {

        console.log("WhatsApp button clicked.");

    });

});

/* ====================================================== */
/* JS-0004 : FORM VALIDATION + CONTACT ACTIONS END */
/* ====================================================== */
/* ====================================================== */
/* JS-0005 : FINAL UI ENHANCEMENTS START */
/* ====================================================== */

// Current Year for Footer

const footerYear = document.getElementById("current-year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}

// Close Mobile Menu After Window Resize

window.addEventListener("resize", () => {

    if (window.innerWidth > 992 && navbar) {

        navbar.classList.remove("active");

    }

});

// Disable Right Click on Logo (Optional)

document.querySelectorAll(".logo img").forEach(img => {

    img.addEventListener("contextmenu", (e) => {

        e.preventDefault();

    });

});

// Lazy Loading for Images

document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {

        img.setAttribute("loading", "lazy");

    }

});

// Console Message

console.log(
    "Lumenix Service Point BD Website V4 Loaded Successfully."
);

/* ====================================================== */
/* JS-0005 : FINAL UI ENHANCEMENTS END */
/* ====================================================== */

/* ====================================================== */
/* JS-0006 : COUNTER + IMAGE + BASIC SECURITY START */
/* ====================================================== */

// Animated Counter

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = Number(counter.dataset.target);

        const current = Number(counter.innerText);

        const increment = Math.ceil(target / 100);

        if (current < target) {

            counter.innerText = current + increment;

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});

// Image Error Handler

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", function () {

        this.src = "images/no-image.png";

    });

});

// Disable Drag on Images

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

});

/* ====================================================== */
/* JS-0006 : COUNTER + IMAGE + BASIC SECURITY END */
/* ====================================================== */

/* ====================================================== */
/* JS-0007 : THEME UTILITIES + PERFORMANCE START */
/* ====================================================== */

// Debounce Function

function debounce(callback, delay = 100) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

// Optimized Scroll Event

window.addEventListener(

    "scroll",

    debounce(() => {

        document.body.classList.toggle(

            "scrolled",

            window.scrollY > 50

        );

    }, 50)

);

// Reveal Elements

const revealItems = document.querySelectorAll(

    ".card, .about-card, .brand-card"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealItems.forEach((item) => {

    revealObserver.observe(item);

});

// Website Ready

document.addEventListener("DOMContentLoaded", () => {

    console.log("Lumenix Service Point BD V4 Ready.");

});

/* ====================================================== */
/* JS-0007 : THEME UTILITIES + PERFORMANCE END */
/* ====================================================== */

/* ====================================================== */
/* JS-0008 : PREMIUM UI UTILITIES START */
/* ====================================================== */

// Online / Offline Status

window.addEventListener("online", () => {

    console.log("Internet Connected.");

});

window.addEventListener("offline", () => {

    alert("No Internet Connection!");

});

// Copy Current Year Automatically

const year = document.querySelector(".current-year");

if (year) {

    year.textContent = new Date().getFullYear();

}

// External Links Open Securely

document.querySelectorAll("a[target='_blank']").forEach(link => {

    link.setAttribute("rel", "noopener noreferrer");

});

// Button Loading Effect

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function () {

        this.classList.add("loading");

        setTimeout(() => {

            this.classList.remove("loading");

        }, 800);

    });

});

// Website Loaded

console.log("MS FARDIN ELECTRIC | Lumenix Service Point BD");

/* ====================================================== */
/* JS-0008 : PREMIUM UI UTILITIES END */
/* ====================================================== */

/* ====================================================== */
/* JS-0009 : FINAL UTILITIES START */
/* ====================================================== */

// Highlight Current Section

const navLinks = document.querySelectorAll("#navbar a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    document.querySelectorAll("section[id]").forEach(section => {

        if (window.scrollY >= section.offsetTop - 120) {

            currentSection = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});

// Keyboard Shortcut (Home = Top)

document.addEventListener("keydown", (e) => {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});

// Final Startup

window.addEventListener("load", () => {

    document.body.classList.add("website-ready");

    console.log("Website initialized successfully.");

});

/* ====================================================== */
/* JS-0009 : FINAL UTILITIES END */
/* ====================================================== */
