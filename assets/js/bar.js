function showMenu(menuType) {
  // Hide all menu sections
  document.querySelectorAll(".menu-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected menu section
  document.getElementById(menuType).classList.add("active");

  // Add active class to clicked tab
  event.target.classList.add("active");

  // Scroll to top of menu
  window.scrollTo({ top: 300, behavior: "smooth" });
}
