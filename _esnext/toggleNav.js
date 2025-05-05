(() => {
    function initNav() {
        const navToggle = document.getElementById("nav-toggle");
        const navLinks = document.getElementById("nav-links");
        const closeMenu = document.querySelector(".close-menu");

        if (navToggle && navLinks) {
            navToggle.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });
        }

        if (closeMenu && navLinks) {
            closeMenu.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        }
    }

    initNav();
})();
