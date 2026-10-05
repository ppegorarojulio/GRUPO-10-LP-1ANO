
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

function setMenuOpen(open) {
    navMenu.classList.toggle("open", open);
    menuButton.textContent = open ? "✕" : "☰";
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => {
    setMenuOpen(!navMenu.classList.contains("open"));
});


document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
        setMenuOpen(false);
        menuButton.focus();
    }
});


document.addEventListener("click", (e) => {
    if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !menuButton.contains(e.target)
    ) {
        setMenuOpen(false);
    }
});



const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carousel = document.querySelector(".app-carousel");

let currentSlide = 0;
let autoplayId = null;
const AUTOPLAY_DELAY = 6000;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateCarousel() {
    slides.forEach((slide, i) => {
        const isActive = i === currentSlide;
        slide.classList.toggle("active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, i) => {
        const isActive = i === currentSlide;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
    });

    const onlyOne = slides.length <= 1;
    prevButton.disabled = onlyOne;
    nextButton.disabled = onlyOne;
}

function goTo(index) {
    if (slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
}

function nextSlide() { goTo(currentSlide + 1); }
function previousSlide() { goTo(currentSlide - 1); }

nextButton.addEventListener("click", () => { nextSlide(); restartAutoplay(); });
prevButton.addEventListener("click", () => { previousSlide(); restartAutoplay(); });

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { goTo(i); restartAutoplay(); });
});


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { nextSlide(); restartAutoplay(); }
    if (e.key === "ArrowLeft") { previousSlide(); restartAutoplay(); }
});



let touchStartX = 0;
let touchStartY = 0;

carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

carousel.addEventListener("touchend", (e) => {
    const dx = touchStartX - e.changedTouches[0].screenX;
    const dy = touchStartY - e.changedTouches[0].screenY;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx > 0) nextSlide();
    else previousSlide();
    restartAutoplay();
}, { passive: true });



function startAutoplay() {
    if (prefersReducedMotion || slides.length <= 1) return;
    stopAutoplay();
    autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
    }
}

function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
}

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
});


updateCarousel();
startAutoplay();