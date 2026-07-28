// =======================================================
// LUMENIX SERVICE POINT BD
// MS FARDIN ELECTRIC
// WEBSITE VERSION : V3 FINAL
// PREMIUM JAVASCRIPT
// =======================================================


// ==============================
// SMOOTH SCROLL
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const targetId = this.getAttribute("href");

        if(targetId !== "#"){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }

    });

});



// ==============================
// PAGE LOADING EFFECT
// ==============================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});



// ==============================
// BACK TO TOP BUTTON
// ==============================

const topBtn = document.createElement("button");


topBtn.innerHTML = "⬆";


topBtn.className = "top-btn";


document.body.appendChild(topBtn);



window.addEventListener("scroll",()=>{


    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

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


const navLinks = document.querySelectorAll("nav a");


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        navLinks.forEach(item=>{

            item.classList.remove("active");

        });


        link.classList.add("active");


    });


});




// ==============================
// CARD SCROLL ANIMATION
// ==============================


const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });


},{

    threshold:0.15

});



cards.forEach(card=>{


    observer.observe(card);


});




// ==============================
// IMAGE LAZY LOAD SUPPORT
// ==============================


const images = document.querySelectorAll("img");


images.forEach(img=>{


    img.loading = "lazy";


});




// ==============================
// CURRENT YEAR AUTO UPDATE
// ==============================


const year = new Date().getFullYear();


const footerYear = document.querySelector(".footer p:last-child");


if(footerYear){

    footerYear.innerHTML =
    footerYear.innerHTML.replace("2026",year);

}




// ==============================
// WEBSITE READY MESSAGE
// ==============================


console.log(
"Lumenix Service Point BD V3 Final Loaded Successfully"
);
