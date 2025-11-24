// =================== DOM CONTENT LOADED ===================
document.addEventListener("DOMContentLoaded", () => {

    /* =================== THEME TOGGLE =================== */
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", savedTheme);
    themeToggle.checked = savedTheme === "dark";

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });

    /* =================== LOADING SCREEN =================== */
    const loadingScreen = document.getElementById("loading-screen");
    const circuitPath = document.querySelector("#circuit-path");

    gsap.to(circuitPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loadingScreen, {opacity:0, duration:0.8, onComplete:()=>{ loadingScreen.style.display="none"; }});
        }
    });

    /* =================== PROJECT CARD TILT =================== */
    const tilts = document.querySelectorAll(".tilt");
    tilts.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width/2;
            const cy = rect.height/2;
            const dx = (x - cx)/10;
            const dy = (cy - y)/10;
            card.style.transform = `rotateX(${dy}deg) rotateY(${dx}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
    });

});

/* =================== LIGHTNING ANIMATION =================== */
function startLightning(){
    const flash = document.getElementById("lightning-flash");
    flash.style.opacity = 1;
    gsap.fromTo(flash, {opacity:1}, {opacity:0, duration:0.2, repeat:3, yoyo:true, onComplete:scrollToHome});
}

function scrollToHome(){
    document.getElementById("home").scrollIntoView({behavior:"smooth"});
}

/* =================== DOOR ANIMATION =================== */
function triggerDoor(){
    const doorOverlay = document.getElementById("door-animation");
    if(!doorOverlay) return;
    doorOverlay.style.display="flex";
    const door = document.getElementById("door");

    gsap.to(door, {rotationY:90, duration:1, ease:"power2.inOut", onComplete:()=>{
        gsap.to(doorOverlay,{opacity:0,duration:0.5,onComplete:()=>{doorOverlay.style.display="none";}});
    }});
}

/* =================== SUITCASE ANIMATION =================== */
function startSuitcase(){
    const suitcaseOverlay = document.getElementById("suitcase-animation");
    if(!suitcaseOverlay) return;
    suitcaseOverlay.style.display="flex";
    const lid = document.querySelector("#suitcase .lid");

    gsap.fromTo(lid, {rotationX:0, transformOrigin:"top center"}, 
                         {rotationX:-100, duration:1, ease:"power2.inOut", onComplete:()=>{
                             gsap.to(suitcaseOverlay,{opacity:0,duration:0.5,onComplete:()=>{suitcaseOverlay.style.display="none";}});
                         }});
    document.getElementById("skills").scrollIntoView({behavior:"smooth"});
}
