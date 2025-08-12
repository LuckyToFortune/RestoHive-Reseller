// Handle dark mode icon colors
document.addEventListener('DOMContentLoaded', function() {
    // Function to update icon filters based on theme
    function updateIconFilters() {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' || 
                      document.body.classList.contains('dark-style');
        
        document.querySelectorAll('img[data-dark-mode-filter]').forEach(img => {
            if (isDark) {
                img.style.filter = img.getAttribute('data-dark-mode-filter');
                img.style.webkitFilter = img.getAttribute('data-dark-mode-filter');
            } else {
                img.style.filter = '';
                img.style.webkitFilter = '';
            }
        });
    }

    // Initial update
    updateIconFilters();

    // Watch for theme changes
    const observer = new MutationObserver(updateIconFilters);
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['data-bs-theme', 'class']
    });
});
