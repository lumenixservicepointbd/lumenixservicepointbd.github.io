
// Lumenix Service Point BD
// JavaScript V3

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior:"smooth"
            });
        }
    });
});


// Page loading effect
window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
});


// Back to top button
const topBtn = document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.className="top-btn";

document.body.appendChild(topBtn);


window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){
        topBtn.style.display="block";
    }
    else{
        topBtn.style.display="none";
    }

});


topBtn.onclick=()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

};
