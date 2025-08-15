// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.layout-menu-toggle');
    const layoutWrapper = document.querySelector('.layout-wrapper');
    
    if (menuToggle && layoutWrapper) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            layoutWrapper.classList.toggle('layout-menu-collapsed');
            
            // Save state to localStorage
            const isCollapsed = layoutWrapper.classList.contains('layout-menu-collapsed');
            localStorage.setItem('menuCollapsed', isCollapsed);
        });
        
        // Check for saved state on page load
        const savedState = localStorage.getItem('menuCollapsed');
        if (savedState === 'true') {
            layoutWrapper.classList.add('layout-menu-collapsed');
        }
    }
});
