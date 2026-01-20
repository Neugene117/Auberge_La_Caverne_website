function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const nav = document.querySelector("nav");
  const navLinks = document.getElementById("navLinks");
  if (!nav.contains(event.target)) {
    navLinks.classList.remove("active");
  }
});
