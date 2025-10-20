// JAVASCRIPT FOR RESPONSIVE NAVIGATION, FORM VALIDATION, AND FILE PREVIEW

document.addEventListener('DOMContentLoaded', () => {
    // Nav Bar Elements (UNCHANGED)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    const shopDropdownToggle = document.getElementById('shopDropdownToggle'); 
    const dropdownItem = shopDropdownToggle ? shopDropdownToggle.closest('.dropdown') : null;

    // Contact Form Elements
    const contactForm = document.querySelector('.contact-form');
    const successPopup = document.getElementById('success-popup');
    const popupCloseBtn = document.querySelector('.popup-close-btn');

    // NEW: File Upload Elements
    const coverUploadInput = document.getElementById('cover-upload');
    const imagePreviewBox = document.getElementById('image-preview');
    const fileUploadLabel = document.querySelector('.file-upload-label');


    // ----------------------------------------------------
    // --- 1. RESPONSIVE NAVIGATION MENU TOGGLE LOGIC (UNCHANGED) ---
    // ----------------------------------------------------

    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        if (!isActive && dropdownItem) {
            dropdownItem.classList.remove('open');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navMenu.querySelectorAll('a').forEach(link => {
        if (link.id !== 'shopDropdownToggle') {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024 && navMenu.classList.contains('active')) {
                    setTimeout(toggleMenu, 100);
                }
            });
        }
    });

    if (shopDropdownToggle) {
        shopDropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault(); 
                this.closest('.dropdown').classList.toggle('open');
            }
        });
    }

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
    // --- 2. FORM VALIDATION & POPUP LOGIC (UNCHANGED) ---
    // ----------------------------------------------------

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (this.checkValidity()) {
            successPopup.classList.add('show');
            document.body.style.overflow = 'hidden';

            this.reset();
            
            // NEW: Also reset the custom file upload preview after submission
            imagePreviewBox.style.backgroundImage = 'none';
            imagePreviewBox.querySelector('p').style.display = 'flex'; // Show 'No Image Selected' text
            fileUploadLabel.textContent = 'Choose Cover Image';
            
        } else {
            this.reportValidity();
        }
    });

    // Close popup handlers
    popupCloseBtn.addEventListener('click', () => {
        successPopup.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    successPopup.addEventListener('click', (e) => {
        if (e.target.id === 'success-popup') {
            successPopup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });


    // ----------------------------------------------------
    // --- 3. FILE UPLOAD PREVIEW LOGIC (UPDATED) ---
    // ----------------------------------------------------

    coverUploadInput.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // 1. Set the image as the background of the preview box
                    imagePreviewBox.style.backgroundImage = `url(${e.target.result})`;
                    
                    // 2. Hide the 'No Image Selected' text
                    imagePreviewBox.querySelector('p').style.display = 'none';
                    
                    // 3. Update the label text
                    fileUploadLabel.textContent = file.name.length > 25 ? 
                                                 file.name.substring(0, 22) + '...' : 
                                                 file.name;
                };
                
                reader.readAsDataURL(file);
            } else {
                // Handle non-image files
                alert('Only image files are supported for cover upload.');
                this.value = ''; // Clear the file input
                imagePreviewBox.style.backgroundImage = 'none';
                imagePreviewBox.querySelector('p').style.display = 'flex'; // Show default text
                fileUploadLabel.textContent = 'Choose Cover Image';
            }
        } else {
            // No file selected (e.g., user canceled)
            imagePreviewBox.style.backgroundImage = 'none';
            imagePreviewBox.querySelector('p').style.display = 'flex';
            fileUploadLabel.textContent = 'Choose Cover Image';
        }
    });

});