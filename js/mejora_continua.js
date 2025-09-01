// Espera que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el carrusel de imágenes
  initCarousel();

  // Activar animaciones de los pasos del ciclo de mejora
  animateCycleSteps();

  // Aplicar efectos de hover a los casos de estudio
  initCaseStudyHover();

  // Animar las métricas numéricas cuando aparecen
  animateMetrics();
  //  mobile
  setupMobileMenu();
});

// ========== CAROUSEL FUNCTIONALITY ==========
// Función para inicializar el carrusel de imágenes
function initCarousel() { // carrusel imagenes
  const carousel = document.querySelector(".carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const indicators = carousel.querySelectorAll(".indicator");

  let currentIndex = 0;
  let intervalId = null;
  const intervalDuration = 5000; // Intervalo de 5 segundos entre slides

  // Muestra el slide correspondiente al índice
  function showSlide(index) {
    // Oculta todos los slides
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-hidden", "true");
    });

    // Desactiva todos los indicadores
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Muestra el slide seleccionado
    items[index].classList.add("active");
    items[index].setAttribute("aria-hidden", "false");

    // Activa el indicador correspondiente
    indicators[index].classList.add("active");

    // Actualiza el índice actual
    currentIndex = index;

    // Reinicia el temporizador automático
    resetInterval();
  }

  // Avanza al siguiente slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  // Retrocede al slide anterior
  function prevSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  // Inicia el carrusel automático
  function startInterval() {
    intervalId = setInterval(nextSlide, intervalDuration);
  }

  // Reinicia el carrusel automático
  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  // Eventos para los botones de navegación
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  // Eventos para los indicadores del carrusel
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Navegación con el teclado (flechas izquierda/derecha)
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Pausa el carrusel al pasar el mouse encima
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  // Reanuda el carrusel cuando el mouse sale
  carousel.addEventListener("mouseleave", () => {
    startInterval();
  });

  // Inicia el carrusel desde el primer slide
  showSlide(0);
  startInterval();
}


// ========== ANIMATION FUNCTIONS ==========
// Función para animar los pasos del ciclo de mejora
function animateCycleSteps() {
  const steps = document.querySelectorAll(".cycle-step");

  // Observador que detecta si el elemento es visible en pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1, // Umbral de visibilidad
    }
  );

  // Asigna estilos iniciales y aplica el observador
  steps.forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(20px)";
    step.style.transition = `opacity 0.5s ease ${
      index * 0.2
    }s, transform 0.5s ease ${index * 0.2}s`;
    observer.observe(step);
  });
}

/// Hover effects implementation.
// Función para aplicar efectos de hover a casos de estudio
function initCaseStudyHover() {
  const caseStudies = document.querySelectorAll(".case-study");

  caseStudies.forEach((study) => {
    study.addEventListener("mouseenter", () => {
      study.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    study.addEventListener("mouseleave", () => {
      study.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });
}

// Metrics animation implementation
// Función para animar las métricas numéricas cuando aparecen
function animateMetrics() {
  const metrics = document.querySelectorAll(".metric-value");

  metrics.forEach((metric) => {
    const originalValue = metric.textContent;

    // Si es un valor porcentual, animarlo
    if (originalValue.includes("%")) {
      const targetValue = parseInt(originalValue);
      let currentValue = 0;
      const duration = 1000; // Duración total de la animación (1 segundo)
      const increment = targetValue / (duration / 16); // Aproximadamente 60 fps

      // Función para animar el conteo
      const animate = () => {
        currentValue += increment;
        if (currentValue < targetValue) {
          metric.textContent = Math.round(currentValue) + "%";
          requestAnimationFrame(animate);
        } else {
          metric.textContent = originalValue;
        }
      };

      // Observador para iniciar animación solo cuando el elemento esté visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(metric);
    }
  });
}


// ========== MOBILE MENU FUNCTIONALITY ==========
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector(".nav-links");
  const menuOverlay = document.querySelector(".menu-overlay");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  let isMenuOpen = false;

  // Función para abrir el menú móvil
  function openMobileMenu() {
    // Añade clases 'active' para mostrar el menú y el overlay
    navMenu.classList.add("active");
    menuOverlay.classList.add("active");
    // Previene el scroll del body cuando el menú está abierto
    document.body.classList.add("no-scroll");
    // Cambia el icono de hamburguesa a 'X'
    mobileMenuBtn.querySelector("i").classList.replace("fa-bars", "fa-times");
    // Actualiza el estado del menú
    isMenuOpen = true;
    
    // Agrega un event listener para cerrar el menú al hacer scroll
    window.addEventListener('scroll', closeOnScroll, { passive: true });
  }

  // Función para cerrar el menú móvil
  function closeMobileMenu() {
    // Remueve las clases 'active' para ocultar el menú y el overlay
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    // Permite nuevamente el scroll del body
    document.body.classList.remove("no-scroll");
    // Cambia el icono 'X' de vuelta a hamburguesa
    mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
    // Actualiza el estado del menú
    isMenuOpen = false;
    
    // Remueve el event listener de scroll
    window.removeEventListener('scroll', closeOnScroll);
  }

  // Función para alternar (abrir/cerrar) el menú móvil
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Función que se ejecuta al hacer scroll, cierra el menú si está abierto
  function closeOnScroll() {
    if (isMenuOpen) {
      closeMobileMenu();
    }
  }

// Función mejorada para cerrar el menú y manejar el scroll suave  para scrool redireccionamiento ids
function closeOnLinkClick(e) {
  // Prevenir comportamiento por defecto solo para enlaces de anclaje
  if (this.getAttribute('href').startsWith('#')) {
    e.preventDefault();
  }
  
  // Cerrar el menú móvil si está abierto
  if (isMenuOpen) {
    closeMobileMenu();
  }
  
  // Manejar scroll suave para enlaces de anclaje
  const targetId = this.getAttribute('href');
  if (targetId.startsWith('#')) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      // Calcular posición considerando el header fijo y márgenes
      const headerHeight = document.querySelector('header').offsetHeight;
      const extraOffset = 20; // Espacio adicional después del header
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight - extraOffset;
      
      // Usar scroll-behavior smooth con polyfill para navegadores antiguos
      try {
        window.scroll({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback para navegadores que no soportan scroll behavior
        window.scrollTo(0, offsetPosition);
      }
      
      // Cambiar URL sin recargar la página (para compatibilidad)
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        window.location.hash = targetId;
      }
    }
  }
}

// ========== EVENT LISTENERS ==========
 // Abre/cierra el menú al hacer clic en el botón móvil
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  // Cierra el menú al hacer clic en el overlay
  menuOverlay.addEventListener("click", closeMobileMenu);
  // Cierra el menú y hace scroll suave al hacer clic en enlaces
  navLinks.forEach(link => {
    link.addEventListener("click", closeOnLinkClick);
  });
  // Cierra el menú si la pantalla se hace más grande de 768px
  window.addEventListener("resize", function() {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMobileMenu();
    }
  });
}
