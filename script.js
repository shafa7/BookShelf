// JAVASCRIPT FOR RESPONSIVE NAVIGATION AND PDF PREVIEW

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. NAV BAR LOGIC (Must stay inside DOMContentLoaded) ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    const shopDropdownToggle = document.getElementById('shopDropdownToggle'); 
    const dropdownItem = shopDropdownToggle ? shopDropdownToggle.closest('.dropdown') : null;

    // ... (Keep all your existing toggleMenu function definition and event listeners here) ...
    
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
    
    // ... all other menu/dropdown/resize handlers ...

    navMenu.querySelectorAll('a').forEach(link => {
        if (link.id !== 'shopDropdownToggle') {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
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
});
// ------------------------------------------------------------------

// --- 2. PDF Preview Functions (MUST BE OUTSIDE the DOMContentLoaded listener) ---

/** Opens the PDF preview modal and forces iframe repaint for mobile compatibility. */
window.openSample = function(pdfFile) {
    const pdfFrame = document.getElementById("pdfFrame");
    const pdfPreview = document.getElementById("pdfPreview");
    
    // CRITICAL: Set the PDF source
    pdfFrame.src = pdfFile; 
    
    // Show the modal container
    pdfPreview.style.display = "flex";
    pdfPreview.style.flexDirection = "column";
    pdfPreview.style.justifyContent = "center";
    pdfPreview.style.alignItems = "center";

    // 🌟 THE FIX: Temporarily hide/show the iframe to force a repaint on mobile browsers
    pdfFrame.style.visibility = 'hidden';

    // Delay the visibility change slightly to ensure the iframe exists in the DOM structure first
    setTimeout(() => {
        pdfFrame.style.visibility = 'visible';
    }, 50); // A small delay (50ms) is usually sufficient

    window.scrollTo({ top: 0, behavior: "smooth" }); 
    document.body.style.overflow = 'hidden';
}

/** Closes the PDF preview modal. */
window.closePDF = function() {
    document.getElementById("pdfPreview").style.display = "none";
    document.getElementById("pdfFrame").src = ""; 
    document.body.style.overflow = 'auto';
}