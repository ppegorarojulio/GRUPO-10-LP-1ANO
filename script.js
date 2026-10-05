

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    }
});




const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    });
});




const ctaButton = document.getElementById("ctaButton");
const ctaMessage = document.getElementById("ctaMessage");

ctaButton.addEventListener("click", () => {
    ctaMessage.textContent =
        "Obrigado pelo interesse no Trani! 🚀";

    ctaButton.textContent =
        "Projeto apresentado";

    ctaButton.disabled = true;
});