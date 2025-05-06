document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'g') {
            document.documentElement.classList.toggle('grayscale');
        }
    });
}); 