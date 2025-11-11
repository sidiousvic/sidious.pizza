// Mac-style Dock Enhanced Interactions

document.addEventListener('DOMContentLoaded', function() {
    const dock = document.querySelector('.dock');
    const dockItems = document.querySelectorAll('.dock-item');
    const dockActivationZone = document.querySelector('.dock-activation-zone');

    if (!dock || dockItems.length === 0) return;

    // Auto-hide dock functionality
    if (dockActivationZone && !dock.classList.contains('dock-always-visible')) {
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

    // Enhanced neighbor magnification
    dockItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Magnify current item
            this.style.transform = 'scale(1.2) translateY(-10px)';

            // Magnify neighbors
            const prevItem = dockItems[index - 1];
            const nextItem = dockItems[index + 1];

            if (prevItem) {
                prevItem.style.transform = 'scale(1.1) translateY(-5px)';
            }

            if (nextItem) {
                nextItem.style.transform = 'scale(1.1) translateY(-5px)';
            }
        });

        item.addEventListener('mouseleave', function() {
            // Reset current item
            this.style.transform = '';

            // Reset neighbors
            const prevItem = dockItems[index - 1];
            const nextItem = dockItems[index + 1];

            if (prevItem) {
                prevItem.style.transform = '';
            }

            if (nextItem) {
                nextItem.style.transform = '';
            }
        });
    });

    // Reset all items when mouse leaves dock
    dock.addEventListener('mouseleave', function() {
        dockItems.forEach(item => {
            item.style.transform = '';
        });
    });
});