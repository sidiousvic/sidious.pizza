/**
 * Toggles the navigation menu on mobile devices
 */
export default function toggleNav() {
    const toggleButton = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize the toggle
toggleNav(); 