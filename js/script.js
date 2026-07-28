// =======================================================
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// VERSION 3
// PREMIUM JAVASCRIPT
// =======================================================

// ==============================
// SMOOTH SCROLL
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ==============================
// PAGE LOADING
// ==============================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

// ==============================
// BACK TO TOP BUTTON
// ==============================

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==============================
// ACTIVE MENU
// ==============================

const navLinks=document.querySelectorAll("nav a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.forEach(item=>item.classList.remove("active"));

        link.classList.add("active");

    });

});

// ==============================
// CARD ANIMATION
// ==============================

const cards=document.querySelectorAll(".card");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.15});

cards.forEach(card=>{

    observer.observe(card);

});

console.log("Lumenix Service Point BD V3 Loaded Successfully");
