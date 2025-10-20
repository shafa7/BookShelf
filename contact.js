document.addEventListener('DOMContentLoaded', () => {
    // Nav Bar Elements
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    const shopDropdownToggle = document.getElementById('shopDropdownToggle'); 
    const dropdownItem = shopDropdownToggle ? shopDropdownToggle.closest('.dropdown') : null;

    // Contact Form Elements
    const contactForm = document.querySelector('.contact-form');
    const successPopup = document.getElementById('success-popup');
    const popupCloseBtn = document.querySelector('.popup-close-btn');

    // ----------------------------------------------------
    // --- 1. RESPONSIVE NAVIGATION MENU TOGGLE LOGIC ---
    // ----------------------------------------------------

    /** Toggles the mobile menu open/closed state. */
    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');

        menuToggle.setAttribute('aria-expanded', isActive);
        // Prevent background scrolling when menu is open
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        
        // Ensure mobile dropdown is reset/closed when main menu closes
        if (!isActive && dropdownItem) {
            dropdownItem.classList.remove('open');
        }
    }

    // Event Listeners for Navigation
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when a standard navigation link is clicked (on mobile/tablet)
    navMenu.querySelectorAll('a').forEach(link => {
        // Exclude the 'Shop' link from closing the menu
        if (link.id !== 'shopDropdownToggle') {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024 && navMenu.classList.contains('active')) {
                    setTimeout(toggleMenu, 100);
                }
            });
        }
    });

    // Mobile Dropdown Toggle (Click/Tap handler for "Shop")
    if (shopDropdownToggle) {
        shopDropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault(); 
                this.closest('.dropdown').classList.toggle('open');
            }
        });
    }

    // Handle resize to automatically reset menu to desktop state
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1025) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
            if (dropdownItem) {
                dropdownItem.classList.remove('open');
            }
        }
    });


    // ----------------------------------------------------
    // --- 2. FORM VALIDATION & POPUP LOGIC ---
    // ----------------------------------------------------

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (this.checkValidity()) {
            // 1. Show the success popup with fade-in effect
            successPopup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Lock background scroll

            // 2. Clear the form
            this.reset();
        } else {
            // Trigger the native browser error messages
            this.reportValidity();
        }
    });

    // Close popup handlers
    popupCloseBtn.addEventListener('click', () => {
        successPopup.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore background scroll
    });

    // Close popup when clicking outside (on the dark overlay part)
    successPopup.addEventListener('click', (e) => {
        // Check if the click target is the popup container itself
        if (e.target.id === 'success-popup') {
            successPopup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});