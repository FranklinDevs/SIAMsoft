// Función para inicializar el carrusel
function initCarousel() {
    const carousel = document.querySelector(".carousel");
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const indicators = carousel.querySelectorAll(".indicator");

    let currentIndex = 0;
    let intervalId = null;
    const intervalDuration = 5000;

    function showSlide(index) {
        items.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-hidden", "true");
        });

        indicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });

        items[index].classList.add("active");
        items[index].setAttribute("aria-hidden", "false");
        indicators[index].classList.add("active");
        currentIndex = index;
        resetInterval();
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % items.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(newIndex);
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, intervalDuration);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            showSlide(index);
        });
    });

    carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextSlide();
        } else if (e.key === "ArrowLeft") {
            prevSlide();
        }
    });

    carousel.addEventListener("mouseenter", () => {
        clearInterval(intervalId);
    });

    carousel.addEventListener("mouseleave", () => {
        startInterval();
    });

    showSlide(0);
    startInterval();
}

// Función para animar los pasos del proceso
function animateProcessSteps() {
    const steps = document.querySelectorAll(".process-steps li");

    steps.forEach((step, index) => {
        step.style.opacity = "0";
        step.style.transform = "translateX(-20px)";
        step.style.transition = `opacity 0.5s ease ${
            index * 0.2
        }s, transform 0.5s ease ${index * 0.2}s`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateX(0)";
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(step);
    });
}

// Función para efectos hover en secciones
function initSectionHoverEffects() {
    const sections = document.querySelectorAll(".feature-section");

    sections.forEach((section) => {
        section.addEventListener("mouseenter", () => {
            section.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        });

        section.addEventListener("mouseleave", () => {
            section.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        });
    });
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        ".feature-highlight, .benefits-list li"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1 }
    );

    elementsToAnimate.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(element);
    });
}

// Función para manejar el menú móvil
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu");
    const navMenu = document.querySelector(".nav-links");
    const menuOverlay = document.querySelector(".menu-overlay");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    let isMenuOpen = false;

    function openMobileMenu() {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
        mobileMenuBtn.querySelector("i").classList.replace("fa-bars", "fa-times");
        isMenuOpen = true;
        window.addEventListener('scroll', closeOnScroll, { passive: true });
    }

    function closeMobileMenu() {
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
        mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
        isMenuOpen = false;
        window.removeEventListener('scroll', closeOnScroll);
    }

    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function closeOnScroll() {
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }

    function closeOnLinkClick(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
        
        if (isMenuOpen) {
            closeMobileMenu();
        }
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const extraOffset = 20;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - extraOffset;
                
                try {
                    window.scroll({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    window.scrollTo(0, offsetPosition);
                }
                
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        }
    }

    // Event listeners
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    menuOverlay.addEventListener("click", closeMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener("click", closeOnLinkClick);
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
    initCarousel();
    animateProcessSteps();
    initSectionHoverEffects();
    initScrollAnimations();
    setupMobileMenu();
});