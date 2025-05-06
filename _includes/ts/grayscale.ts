// Check for saved grayscale preference on load
document.addEventListener('DOMContentLoaded', () => {
    const isGrayscale = localStorage.getItem('grayscale') === 'true';
    if (isGrayscale) {
        document.documentElement.classList.add('grayscale');
    }

    // Listen for 'g' key press to toggle grayscale
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === 'g') {
            const isCurrentlyGrayscale = document.documentElement.classList.toggle('grayscale');
            localStorage.setItem('grayscale', isCurrentlyGrayscale.toString());
        }
    });
}); 