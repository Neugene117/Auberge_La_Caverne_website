// Gallery Filter Functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const viewMoreBtn = document.getElementById("view-more-btn");

  // View More button functionality
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      galleryItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      viewMoreBtn.style.display = "none";
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          // Re-trigger animation
          item.style.animation = "none";
          setTimeout(() => {
            item.style.animation = "";
          }, 10);
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // Smooth scrolling for anchor links
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

  // Add click handlers for gallery items with lightbox functionality
  document.querySelectorAll(".lightbox-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(this.getAttribute("href"), this.getAttribute("title"));
    });
  });
});

// Simple Lightbox Implementation
let currentLightboxIndex = 0;
let visibleItemsCache = [];

function openLightbox(imageSrc, title) {
  // Update visible items cache
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  visibleItemsCache = galleryItems.filter(
    (item) => !item.classList.contains("hidden")
  );

  // Find current index
  currentLightboxIndex = visibleItemsCache.findIndex((item) => {
    const link = item.querySelector(".lightbox-link");
    return link && link.getAttribute("href") === imageSrc;
  });

  // Check if lightbox already exists
  let lightbox = document.querySelector(".lightbox-modal");
  if (lightbox) {
    lightbox.remove();
  }

  // Create lightbox HTML
  const newLightbox = document.createElement("div");
  newLightbox.className = "lightbox-modal";
  newLightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="${imageSrc}" alt="${title}" class="lightbox-image" />
      <div class="lightbox-caption">${title}</div>
      <button class="lightbox-nav prev">&#10094;</button>
      <button class="lightbox-nav next">&#10095;</button>
    </div>
  `;

  document.body.appendChild(newLightbox);

  // Add styles for lightbox
  const style = document.createElement("style");
  style.textContent = `
    .lightbox-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      animation: zoomIn 0.3s ease;
    }

    @keyframes zoomIn {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .lightbox-image {
      max-width: 100%;
      max-height: 80vh;
      display: block;
      border-radius: 8px;
      transition: opacity 0.3s ease;
    }

    .lightbox-caption {
      text-align: center;
      color: white;
      padding: 15px;
      font-size: 18px;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .lightbox-close {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 40px;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 1001;
    }

    .lightbox-close:hover {
      transform: scale(1.2);
      color: #1284c3;
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(18, 132, 195, 0.7);
      color: white;
      border: none;
      font-size: 28px;
      padding: 15px 20px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;
      z-index: 1001;
    }

    .lightbox-nav:hover {
      background: rgba(18, 132, 195, 1);
      transform: translateY(-50%) scale(1.1);
    }

    .lightbox-nav.prev {
      left: 15px;
    }

    .lightbox-nav.next {
      right: 15px;
    }

    @media (max-width: 768px) {
      .lightbox-image {
        max-height: 60vh;
      }

      .lightbox-close {
        font-size: 30px;
      }

      .lightbox-nav {
        padding: 10px 15px;
        font-size: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  // Close button functionality
  const closeBtn = newLightbox.querySelector(".lightbox-close");
  closeBtn.addEventListener("click", function () {
    newLightbox.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      newLightbox.remove();
    }, 300);
  });

  // Close on outside click
  newLightbox.addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        this.remove();
      }, 300);
    }
  });

  // Navigation buttons
  const prevBtn = newLightbox.querySelector(".lightbox-nav.prev");
  const nextBtn = newLightbox.querySelector(".lightbox-nav.next");

  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation
  const keyHandler = function (e) {
    if (document.querySelector(".lightbox-modal")) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateLightbox(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateLightbox(1);
      }
      if (e.key === "Escape") {
        const modal = document.querySelector(".lightbox-modal");
        if (modal) {
          modal.style.animation = "fadeOut 0.3s ease";
          setTimeout(() => {
            modal.remove();
          }, 300);
        }
      }
    }
  };

  document.addEventListener("keydown", keyHandler);
}

function navigateLightbox(direction) {
  const modal = document.querySelector(".lightbox-modal");
  if (!modal) return;

  // Calculate next index
  currentLightboxIndex += direction;

  // Wrap around
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = visibleItemsCache.length - 1;
  } else if (currentLightboxIndex >= visibleItemsCache.length) {
    currentLightboxIndex = 0;
  }

  // Get the next item and its link
  const nextItem = visibleItemsCache[currentLightboxIndex];
  const nextLink = nextItem.querySelector(".lightbox-link");

  if (nextLink) {
    const nextImageSrc = nextLink.getAttribute("href");
    const nextTitle = nextLink.getAttribute("title");

    // Update the current lightbox image and caption
    const imageElement = modal.querySelector(".lightbox-image");
    const captionElement = modal.querySelector(".lightbox-caption");

    // Fade out transition
    imageElement.style.opacity = "0.5";
    captionElement.style.opacity = "0.5";

    // Update image and caption
    setTimeout(() => {
      imageElement.src = nextImageSrc;
      captionElement.textContent = nextTitle;
      imageElement.style.opacity = "1";
      captionElement.style.opacity = "1";
    }, 150);
  }
}
