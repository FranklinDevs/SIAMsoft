// ========== EVENT LISTENERS PRINCIPALES ==========
document.addEventListener("DOMContentLoaded", function () {
  initAllComponents();
});

// ========== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN ==========
function initAllComponents() {
  initCharts();
  initCarousel();
  initCardHoverEffects();
  initReportButtons();
  initMobileMenu();
}

// ========== MÓDULO DE GRÁFICOS ==========
function initCharts() {
  initProcessingTimeChart();
  initMonthlyTrendChart();
}

function initProcessingTimeChart() {
  const ctx1 = document.getElementById("processingTimeChart").getContext("2d");
  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: [
        "Registro Civil",
        "Tributación",
        "Licencias",
        "Obras Públicas",
        "Atención Ciudadana"
      ],
      datasets: [{
        label: "Tiempo promedio (horas)",
        data: [2.8, 4.2, 3.5, 5.1, 2.3],
        backgroundColor: [
          "rgba(0, 179, 110, 0.7)",
          "rgba(0, 61, 130, 0.7)",
          "rgba(255, 107, 0, 0.7)",
          "rgba(51, 51, 51, 0.7)",
          "rgba(108, 117, 125, 0.7)",
        ],
        borderColor: [
          "rgba(0, 179, 110, 1)",
          "rgba(0, 61, 130, 1)",
          "rgba(255, 107, 0, 1)",
          "rgba(51, 51, 51, 1)",
          "rgba(108, 117, 125, 1)",
        ],
        borderWidth: 1,
      }],
    },
    options: getBarChartOptions()
  });
}


function initMonthlyTrendChart() {
  const ctx2 = document.getElementById("monthlyTrendChart").getContext("2d");
  new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      datasets: [{
        label: "Trámites procesados",
        data: [850, 1200, 1100, 1400, 1600, 1500, 1800, 1750, 2000, 2200, 2400, 2800],
        fill: false,
        backgroundColor: "rgba(0, 179, 110, 0.2)",
        borderColor: "rgba(0, 179, 110, 1)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "rgba(0, 61, 130, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      }],
    },
    options: getLineChartOptions()
  });
}

function getBarChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Horas" },
      },
    },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y.toFixed(1) + " horas";
          },
        },
      },
    },
  };
}

function getLineChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Documentos" },
      },
    },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y.toLocaleString() + " documentos";
          },
        },
      },
    },
  };
}



// ========== MÓDULO DEL CARRUSEL ==========
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

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => showSlide(index));
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", startInterval);

  // Inicialización
  showSlide(0);
  startInterval();
}

// ========== MÓDULO DE EFECTOS HOVER ==========
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".metric-card, .report-card");
  
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });
}

// ========== MÓDULO DE BOTONES DE REPORTE ==========
function initReportButtons() {
  const reportButtons = document.querySelectorAll(".report-button");
  
  reportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Reporte listo';
        
        setTimeout(() => {
          button.innerHTML = "Generar Reporte";
          button.disabled = false;
        }, 2000);
      }, 1500);
    });
  });
}

// ========== MÓDULO DE MENÚ MÓVIL ==========
function initMobileMenu() {
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
    if (isMenuOpen) closeMobileMenu();
    else openMobileMenu();
  }

  function closeOnScroll() {
    if (isMenuOpen) closeMobileMenu();
  }

  function closeOnLinkClick(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
    }
    
    if (isMenuOpen) closeMobileMenu();
    
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const extraOffset = 20;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - extraOffset;
        
        try {
          window.scroll({ top: offsetPosition, behavior: 'smooth' });
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