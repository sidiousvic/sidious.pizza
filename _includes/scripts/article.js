// Smooth scroll behavior for article layout
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll to article content when clicking scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const articleContainer = document.querySelector('.article-container');

    if (scrollIndicator && articleContainer) {
        scrollIndicator.addEventListener('click', function() {
            articleContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Hide scroll indicator on scroll
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling && scrollIndicator) {
            isScrolling = true;

            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }

            setTimeout(() => {
                isScrolling = false;
            }, 100);
        }
    });

    // Add transition styles to scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.transition = 'opacity 0.3s ease';
        scrollIndicator.style.cursor = 'pointer';
    }

    // Auto-hide dock functionality
    const dock = document.querySelector('.dock');
    const dockActivationZone = document.querySelector('.dock-activation-zone');

    if (dock && dockActivationZone && !dock.classList.contains('dock-always-visible')) {
        let dockTimeout;

        // Show dock on mouse enter activation zone
        function showDock() {
            clearTimeout(dockTimeout);
            dock.classList.add('dock-visible');
        }

        // Hide dock on mouse leave immediately
        function hideDock() {
            clearTimeout(dockTimeout);
            dock.classList.remove('dock-visible');
        }

        // Mouse events for activation zone
        dockActivationZone.addEventListener('mouseenter', showDock);
        dockActivationZone.addEventListener('mouseleave', hideDock);

        // Mouse events for dock itself
        dock.addEventListener('mouseenter', showDock);
        dock.addEventListener('mouseleave', hideDock);

        // Enable pointer events on activation zone when needed
        dockActivationZone.style.pointerEvents = 'auto';
    }
});