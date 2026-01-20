// Hero Slider
const slides = document.querySelectorAll(".slide");
const title = document.getElementById("heroTitle");
const subtitle = document.getElementById("heroSubtitle");
let i = 0;

setInterval(() => {
  slides[i].classList.remove("active");
  i = (i + 1) % slides.length;
  slides[i].classList.add("active");

  title.style.opacity = "0";
  subtitle.style.opacity = "0";

  setTimeout(() => {
    title.style.opacity = "1";
    subtitle.style.opacity = "1";
  }, 500);
}, 5000);

// About Section Scroll Animation
const aboutContent = document.getElementById("aboutContent");
const aboutImages = document.getElementById("aboutImages");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
      }
    });
  },
  { threshold: 0.2 },
);

observer.observe(aboutContent);
observer.observe(aboutImages);

// General Scroll Animations
const animateElements = document.querySelectorAll(
  ".animate-on-scroll, .animate-scale, .animate-left, .animate-right",
);

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  },
  { threshold: 0.1 },
);

animateElements.forEach((el) => scrollObserver.observe(el));
