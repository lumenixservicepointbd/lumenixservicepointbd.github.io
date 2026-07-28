
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

/* ================= BACK TO TOP BUTTON ================= */

.top-btn{
    position:fixed;
    bottom:20px;
    right:20px;
    width:50px;
    height:50px;
    border:none;
    border-radius:50%;
    background:#ff8c00;
    color:#fff;
    font-size:22px;
    cursor:pointer;
    display:none;
    z-index:9999;
    box-shadow:0 5px 15px rgba(0,0,0,.25);
    transition:.3s;
}

.top-btn:hover{
    background:#0B3B6E;
}

.loaded{
    animation:fadeIn .6s ease;
}

@keyframes fadeIn{
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
}
