// Mac-style Dock Enhanced Interactions

document.addEventListener('DOMContentLoaded', function() {
    const dock = document.querySelector('.dock');
    const dockItems = document.querySelectorAll('.dock-item');

    if (!dock || dockItems.length === 0) return;

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