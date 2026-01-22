let currentSlide = 0;
const slides = document.querySelectorAll(".slider-image");

function changeSlide(direction) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function switchTab(tabName) {
  // Remove active class from all tabs and contents
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  // Add active class to clicked tab and corresponding content
  event.target.classList.add("active");
  document.getElementById(tabName + "-tab").classList.add("active");
}
