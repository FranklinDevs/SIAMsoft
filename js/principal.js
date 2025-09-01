// Funcionalidad para el menú móvil
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.querySelector(".mobile-menu");
    const navMenu = document.querySelector(".nav-links");
    const menuOverlay = document.querySelector(".menu-overlay");
    const navLinks = document.querySelectorAll(".nav-link");
    
    let isMenuOpen = false;

    function openMobileMenu() {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
        
        // Cambiar el ícono
        if (mobileMenuBtn.querySelector("i")) {
            mobileMenuBtn.querySelector("i").classList.replace("fa-bars", "fa-times");
        }
        
        isMenuOpen = true;
    }

    function closeMobileMenu() {
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
        
        // Restaurar el ícono
        if (mobileMenuBtn.querySelector("i")) {
            mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
        }
        
        isMenuOpen = false;
    }

    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Cerrar menú al hacer clic en un enlace
    function handleNavLinkClick(e) {
        // Solo prevenir comportamiento por defecto para enlaces de anclaje
        if (this.getAttribute("href") === "#") {
            e.preventDefault();
        }
        
        closeMobileMenu();
        
        // Scroll suave para anclas
        const targetId = this.getAttribute("href");
        if (targetId.startsWith("#") && targetId !== "#") {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                setTimeout(() => {
                    const headerHeight = document.querySelector("header").offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }, 300);
            }
        }
    }

    // Añadir event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // Prevenir que el clic se propague
            toggleMobileMenu();
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMobileMenu);
    }
    
    // Agregar event listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener("click", handleNavLinkClick);
    });

    // Cerrar menú al redimensionar la ventana
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (isMenuOpen && 
            !navMenu.contains(event.target) && 
            event.target !== mobileMenuBtn && 
            !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
});