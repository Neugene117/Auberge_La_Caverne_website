// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .scale-in",
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Initialize stat counter animation
  initStatCounters();
});

// Stat counter animation
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const counterOptions = {
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  }, counterOptions);

  statNumbers.forEach((stat) => counterObserver.observe(stat));
}

// Animate counter from 0 to target
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 40);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".about-hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// Team card hover effect
const teamCards = document.querySelectorAll(".team-card");
teamCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "";
    }, 10);
  });
});

// Add scroll animation to elements dynamically
function addScrollAnimation() {
  const elements = document.querySelectorAll(
    "[class*='fade-in'], [class*='scale-in']",
  );

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      element.classList.add("visible");
    }
  });
}

// Call on page load and on scroll
window.addEventListener("load", addScrollAnimation);
window.addEventListener("scroll", () => {
  addScrollAnimation();
});

// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener(
  "scroll",
  () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      addScrollAnimation();
    }, 50);
  },
  { passive: true },
);

// Initialize page animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate hero content on load
  const heroContent = document.querySelector(".about-hero .hero-content");
  if (heroContent) {
    const fadeElements = heroContent.querySelectorAll(".fade-in");
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 200);
    });
  }

  // Add hover effects to value cards
  const valueCards = document.querySelectorAll(".value-card");
  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Feature items interaction
  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      featureItems.forEach((i) => (i.style.opacity = "0.7"));
      this.style.opacity = "1";
    });

    item.addEventListener("mouseleave", function () {
      featureItems.forEach((i) => (i.style.opacity = "1"));
    });
  });
});

// Smooth page transitions
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease-out";
});

// Animate elements on first visibility
const observedElements = new Set();
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !observedElements.has(entry.target)) {
      entry.target.classList.add("visible");
      observedElements.add(entry.target);

      // Add stagger effect to grid items
      if (entry.target.classList.contains("stagger-animation")) {
        const delay = entry.target.style.getPropertyValue("--stagger-delay");
        if (delay) {
          entry.target.style.transitionDelay = `calc(${delay} * 0.1s)`;
        }
      }
    }
  });
});

document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-animation").forEach((el) => {
  visibilityObserver.observe(el);
});
