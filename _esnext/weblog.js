document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('#webpost tr');

    rows.forEach(row => {
        row.addEventListener('click', function (e) {
            // Don't handle click if it was on a tag link
            if (e.target.closest('.post-tags a')) {
                return;
            }

            // Find the form in this row
            const form = row.querySelector('form');
            if (form) {
                form.submit();
            }
        });
    });
}); 