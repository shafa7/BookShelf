document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    // Targeting the Shop link for mobile dropdown click/tap
    const shopDropdownToggle = document.getElementById('shopDropdownToggle'); 


    // =========================================
    // 1. RESPONSIVE NAVIGATION & DROPDOWN LOGIC
    // =========================================

    /** Toggles the mobile menu open/closed state. */
    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');

        menuToggle.setAttribute('aria-expanded', isActive);

        // Control background scrolling
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        
        // Ensure mobile dropdown is closed when main menu closes
        if (!isActive) {
            document.querySelector('.dropdown').classList.remove('open');
        }
    }

    // Toggle Menu on button click
    menuToggle.addEventListener('click', toggleMenu);

    // Close Menu on overlay click (background fade area)
    overlay.addEventListener('click', toggleMenu);

    // Close Menu when a standard link is clicked (on mobile/tablet only)
    navMenu.querySelectorAll('a').forEach(link => {
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
            // Only apply click-toggle on mobile/tablet (matches CSS media query)
            if (window.innerWidth <= 1024) {
                e.preventDefault(); 
                this.closest('.dropdown').classList.toggle('open');
            }
        });
    }

    // Handle resize to automatically reset menu for desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1025) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
            document.querySelector('.dropdown').classList.remove('open');
        }
    });


    // =========================================
    // 2. RESPONSIVE SLIDER LOGIC
    // =========================================
    
    /** Initializes a single, responsive slider instance. */
    function initializeSlider(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!track || !prevBtn || !nextBtn) {
            console.error(`Slider not fully initialized for IDs: ${trackId}, ${prevBtnId}, ${nextBtnId}`);
            return;
        }

        const slides = Array.from(track.children);
        let currentIndex = 0;

        /** Calculates visible slides and slide width based on current screen size. */
        const calculateMetrics = () => {
             // Use the actual computed width of the first slide for responsiveness
            const slideWidth = slides[0] ? slides[0].offsetWidth : 0; 
            const wrapperWidth = track.closest('.image-track-wrapper').offsetWidth;
            const visibleCount = Math.floor(wrapperWidth / slideWidth); 
            
            // The maximum index the first visible slide can have
            const maxIndex = Math.max(0, slides.length - visibleCount); 
            
            return { slideWidth, visibleCount, maxIndex };
        };


        /** Updates the track position and button states */
        function updateSlider() {
            const { slideWidth, maxIndex } = calculateMetrics();

            // Ensure currentIndex doesn't exceed the new maxIndex after resize
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            const offset = -currentIndex * slideWidth;
            track.style.transform = `translateX(${offset}px)`;

            // Update button disabled state
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
        }

        // --- Event Listeners ---

        // Move to the next slide
        nextBtn.addEventListener('click', () => {
            const { maxIndex } = calculateMetrics();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        // Move to the previous slide
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        // Recalculate and reset slider position on window resize for responsiveness
        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Initialize the slider state
        updateSlider();
    }
    
    // --- Initialize all sliders using their unique IDs ---
    
    initializeSlider('image-track', 'prev-btn', 'next-btn');
    initializeSlider('image-track-2', 'prev-btn-2', 'next-btn-2');
    initializeSlider('image-track-3', 'prev-btn-3', 'next-btn-3');
    initializeSlider('image-track-4', 'prev-btn-4', 'next-btn-4');
    initializeSlider('image-track-5', 'prev-btn-5', 'next-btn-5');
    initializeSlider('image-track-6', 'prev-btn-6', 'next-btn-6');
    initializeSlider('image-track-7', 'prev-btn-7', 'next-btn-7');
    initializeSlider('image-track-8', 'prev-btn-8', 'next-btn-8');
});