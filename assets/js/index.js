let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slider-dot");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  document
    .querySelectorAll(".hero-content")
    .forEach((c) => c.classList.remove("active"));

  if (n >= slides.length) currentSlide = 0;
  if (n < 0) currentSlide = slides.length - 1;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  document
    .querySelector(`.hero-content[data-slide="${currentSlide}"]`)
    .classList.add("active");
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 5000);

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

// View More functionality for rooms page
let isExpanded = false;
const viewMoreBtn = document.getElementById("view-more-btn");
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".property-card.hidden");
    if (!isExpanded) {
      hiddenCards.forEach((card) => card.classList.remove("hidden"));
      viewMoreBtn.textContent = "View Less";
      isExpanded = true;
    } else {
      hiddenCards.forEach((card) => card.classList.add("hidden"));
      viewMoreBtn.textContent = "View More";
      isExpanded = false;
    }
  });
}

// Modal functionality
const modal = document.getElementById("booking-modal");
const bookNowBtns = document.querySelectorAll(".btn-read-more");
const closeBtn = document.querySelector(".close");

if (bookNowBtns.length > 0 && modal) {
  bookNowBtns.forEach((btn) => {
    if (btn.textContent.trim() === "Book Now") {
      btn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    }
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

if (modal) {
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .scale-in",
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Booking form handling
  const bookBtn = document.querySelector(".btn-book");
  if (bookBtn) {
    bookBtn.addEventListener("click", handleBooking);
  }

  // Tab functionality
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      // Remove active from all tabs
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      // Add active to clicked tab
      tab.classList.add("active");
      // Hide all tab-content
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));
      // Show the corresponding content
      document
        .querySelector(`.tab-content[data-content="${tabId}"]`)
        .classList.add("active");
    });
  });
});

// Toast notification function
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i> ${message}`;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Handle booking submission
function handleBooking(event) {
  event.preventDefault();

  const btn = event.target;
  const email = document.querySelector(
    '.booking-bar input[type="email"]',
  ).value;
  const roomSelect = document.querySelector(".booking-bar select").value;
  const checkIn = document.querySelector(
    '.booking-bar input[type="date"]:nth-of-type(1)',
  ).value;
  const checkOut = document.querySelector(
    '.booking-bar input[type="date"]:nth-of-type(2)',
  ).value;
  const guests = document.querySelector(
    '.booking-bar input[type="number"]',
  ).value;

  // Set loading state
  btn.classList.add("loading");
  btn.disabled = true;
  btn.textContent = "Booking...";

  // Simulate form submission
  setTimeout(() => {
    // Validate fields
    let isValid = true;
    let errorMessage = "";

    if (!email || !email.includes("@")) {
      isValid = false;
      errorMessage = "Please enter a valid email address.";
    } else if (roomSelect === "Select a room") {
      isValid = false;
      errorMessage = "Please select a room type.";
    } else if (!checkIn) {
      isValid = false;
      errorMessage = "Please select a check-in date.";
    } else if (!checkOut) {
      isValid = false;
      errorMessage = "Please select a check-out date.";
    } else if (new Date(checkIn) >= new Date(checkOut)) {
      isValid = false;
      errorMessage = "Check-out date must be after check-in date.";
    } else if (!guests || guests < 1) {
      isValid = false;
      errorMessage = "Please enter number of guests.";
    }

    // Remove loading state
    btn.classList.remove("loading");
    btn.disabled = false;
    btn.textContent = "Book Now";

    if (isValid) {
      showToast("Booking successful! We will contact you soon.", "success");
      // Optionally reset form
      document.querySelector('.booking-bar input[type="email"]').value = "";
      document.querySelector(".booking-bar select").value = "Select a room";
      document.querySelector(
        '.booking-bar input[type="date"]:nth-of-type(1)',
      ).value = "";
      document.querySelector(
        '.booking-bar input[type="date"]:nth-of-type(2)',
      ).value = "";
      document.querySelector('.booking-bar input[type="number"]').value = "1";
    } else {
      showToast(errorMessage, "error");
    }
  }, 2000); // 2 second delay for simulation
}

// Modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.querySelector(".close");
  const bookNowBtns = document.querySelectorAll(".btn-read-more");

  bookNowBtns.forEach((btn) => {
    if (btn.textContent.trim() === "Book Now") {
      btn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle modal form submission
  const modalForm = document.querySelector(".booking-form");
  modalForm.addEventListener("submit", handleModalBooking);
});

// Handle modal booking submission
function handleModalBooking(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button[type="submit"]');
  const email = document.querySelector(
    '.booking-form input[type="email"]',
  ).value;
  const roomSelect = document.querySelector(".booking-form select").value;
  const checkIn = document.querySelector(
    '.booking-form input[type="date"]:nth-of-type(1)',
  ).value;
  const checkOut = document.querySelector(
    '.booking-form input[type="date"]:nth-of-type(2)',
  ).value;
  const guests = document.querySelector(
    '.booking-form input[type="number"]',
  ).value;

  // Set loading state
  btn.classList.add("loading");
  btn.disabled = true;
  btn.textContent = "Booking...";

  // Simulate form submission
  setTimeout(() => {
    // Validate fields
    let isValid = true;
    let errorMessage = "";

    if (!email || !email.includes("@")) {
      isValid = false;
      errorMessage = "Please enter a valid email address.";
    } else if (roomSelect === "Select a room") {
      isValid = false;
      errorMessage = "Please select a room type.";
    } else if (!checkIn) {
      isValid = false;
      errorMessage = "Please select a check-in date.";
    } else if (!checkOut) {
      isValid = false;
      errorMessage = "Please select a check-out date.";
    } else if (new Date(checkIn) >= new Date(checkOut)) {
      isValid = false;
      errorMessage = "Check-out date must be after check-in date.";
    } else if (!guests || guests < 1) {
      isValid = false;
      errorMessage = "Please enter number of guests.";
    }

    // Remove loading state
    btn.classList.remove("loading");
    btn.disabled = false;
    btn.textContent = "Submit Booking";

    if (isValid) {
      showToast("Booking successful! We will contact you soon.", "success");
      // Close modal
      document.getElementById("booking-modal").style.display = "none";
      // Reset form
      document.querySelector('.booking-form input[type="email"]').value = "";
      document.querySelector(".booking-form select").value = "Select a room";
      document.querySelector(
        '.booking-form input[type="date"]:nth-of-type(1)',
      ).value = "";
      document.querySelector(
        '.booking-form input[type="date"]:nth-of-type(2)',
      ).value = "";
      document.querySelector('.booking-form input[type="number"]').value = "1";
    } else {
      showToast(errorMessage, "error");
    }
  }, 2000); // 2 second delay for simulation
}
