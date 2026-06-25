// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  
  // Custom Cursor
  initCustomCursor();
  
  // Mobile Nav Drawer
  initMobileMenu();
  
  // Accordion Logic
  initAccordion();
  
  // Interactive Widget Controls (Zoom & Spin)
  initInteractiveWidget();
  
  // Image Uploader & Live Preview
  initImageUploader();
  
  // Font Customizer
  initFontCustomizer();
  
  // Video Player Showcase
  initVideoPlayer();
  
  // Additional Micro-interactions
  initMapPinsAndActions();
  
  // Let's Connect Form
  initContactForm();
});

/* ==========================================================================
   CUSTOM CURSOR LOGIC
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector(".custom-cursor");
  const follower = document.querySelector(".custom-cursor-follower");
  
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  // Track mouse coordinates
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move main tiny dot instantly
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smoothly follow with animation frame (inertia effect)
  function renderFollower() {
    // Basic interpolation formula: current = current + (target - current) * speed
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(renderFollower);
  }
  
  renderFollower();

  // Add hover state listeners for interactive elements
  const hoverables = document.querySelectorAll("a, button, input, label, .map-pin, .accordion-header");
  hoverables.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
      cursor.style.backgroundColor = "var(--color-green-light)";
      follower.style.transform = "translate(-50%, -50%) scale(1.5)";
      follower.style.borderColor = "var(--color-green-light)";
    });
    
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "var(--text-primary)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.borderColor = "var(--text-primary)";
    });
  });
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu-overlay");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!menuToggle || !mobileMenu || !closeMenuBtn) return;

  const openDrawer = () => {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll when open
  };

  const closeDrawer = () => {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = ""; // Enable scroll
  };

  menuToggle.addEventListener("click", openDrawer);
  closeMenuBtn.addEventListener("click", closeDrawer);
  
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/* ==========================================================================
   ACCORDION LOGIC
   ========================================================================== */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const item = this.parentElement;
      const isCurrentlyActive = item.classList.contains("active");

      // Close all other items first (exclusive accordion mode)
      document.querySelectorAll(".accordion-item").forEach(otherItem => {
        otherItem.classList.remove("active");
        const otherHeader = otherItem.querySelector(".accordion-header");
        const otherContent = otherItem.querySelector(".accordion-content");
        
        otherHeader.setAttribute("aria-expanded", "false");
        otherHeader.querySelector(".accordion-icon").textContent = "+";
        otherContent.style.maxHeight = null;
      });

      // Toggle current item
      if (!isCurrentlyActive) {
        item.classList.add("active");
        this.setAttribute("aria-expanded", "true");
        this.querySelector(".accordion-icon").textContent = "-";
        
        const content = item.querySelector(".accordion-content");
        // Dynamically compute height for smooth animation
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
  
  // Open the first accordion item by default
  const firstHeader = document.querySelector(".accordion-header");
  if (firstHeader) {
    firstHeader.click();
  }
}

/* ==========================================================================
   INTERACTIVE WIDGET CONTROLS (ZOOM & SPIN)
   ========================================================================== */
function initInteractiveWidget() {
  const widget = document.getElementById("interactive-widget");
  const btnZoom = document.getElementById("btn-zoom");
  const btnSpin = document.getElementById("btn-spin");
  const spinOverlay1 = document.getElementById("spin-overlay-1");
  const spinOverlay2 = document.getElementById("spin-overlay-2");

  if (!widget || !btnZoom || !btnSpin) return;

  // Zoom / Scale Toggle
  btnZoom.addEventListener("click", () => {
    widget.classList.toggle("zoomed");
    
    // Toggle Icon representation
    const zoomIcon = btnZoom.querySelector("svg");
    if (widget.classList.contains("zoomed")) {
      zoomIcon.innerHTML = `<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/>`; // shrink icon
      lucide.createIcons();
    } else {
      zoomIcon.innerHTML = `<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>`; // expand icon
      lucide.createIcons();
    }
  });

  // Spin speed accelerator
  let currentSpeedClass = "normal"; // normal, fast, hyper
  
  btnSpin.addEventListener("click", () => {
    if (currentSpeedClass === "normal") {
      // Switch to Fast
      spinOverlay1.style.animationDuration = "8s";
      spinOverlay2.style.animationDuration = "5s";
      btnSpin.style.backgroundColor = "var(--color-pink-light)";
      currentSpeedClass = "fast";
    } else if (currentSpeedClass === "fast") {
      // Switch to Hyper
      spinOverlay1.style.animationDuration = "2s";
      spinOverlay2.style.animationDuration = "1s";
      btnSpin.style.backgroundColor = "var(--color-green-light)";
      currentSpeedClass = "hyper";
    } else {
      // Switch back to Normal
      spinOverlay1.style.animationDuration = "25s";
      spinOverlay2.style.animationDuration = "15s";
      btnSpin.style.backgroundColor = "";
      currentSpeedClass = "normal";
    }
  });
}

/* ==========================================================================
   IMAGE UPLOADER & LOCAL STORAGE PERSISTENCE
   ========================================================================== */
function initImageUploader() {
  const openUploaderBtn = document.getElementById("open-uploader-btn");
  const uploaderModal = document.getElementById("uploader-modal");
  const closeUploaderBtn = document.getElementById("close-uploader-btn");
  const finishUploadBtn = document.getElementById("finish-upload-btn");
  const resetUploaderBtn = document.getElementById("reset-uploader-btn");
  const fileInputs = document.querySelectorAll(".modal-file-input");

  if (!uploaderModal || !closeUploaderBtn || !finishUploadBtn) return;

  // Open modal
  if (openUploaderBtn) {
    openUploaderBtn.addEventListener("click", () => {
      uploaderModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  // Close modal
  const closeModal = () => {
    uploaderModal.classList.remove("open");
    document.body.style.overflow = "";
  };

  closeUploaderBtn.addEventListener("click", closeModal);
  finishUploadBtn.addEventListener("click", closeModal);

  if (resetUploaderBtn) {
    resetUploaderBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn khôi phục ảnh mặc định và xóa bộ nhớ đệm không?")) {
        const savedKeys = [
          "img-main-left",
          "img-center-cutout",
          "img-middle-left",
          "img-right-standing",
          "img-earrings-detail",
          "img-insta-avatar"
        ];
        savedKeys.forEach(id => {
          localStorage.removeItem(`custom-img-${id}`);
        });
        localStorage.removeItem("custom-font-display");
        localStorage.removeItem("custom-font-body");
        alert("Đã khôi phục mặc định thành công! Trang web sẽ tải lại.");
        window.location.reload();
      }
    });
  }
  
  // Close on outer overlay click
  uploaderModal.addEventListener("click", (e) => {
    if (e.target === uploaderModal) {
      closeModal();
    }
  });

  // Load saved images from localStorage on start
  loadSavedImages();

  // Watch for file uploads
  fileInputs.forEach(input => {
    input.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        
        // Ensure it's an image
        if (!file.type.startsWith("image/")) {
          alert("Vui lòng tải lên một tệp hình ảnh!");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          const targetImgId = this.getAttribute("data-target");
          const previewImgId = this.getAttribute("data-preview");

          // Update page image
          const pageImg = document.getElementById(targetImgId);
          if (pageImg) {
            pageImg.src = dataUrl;
          }

          // Update modal preview
          const previewImg = document.getElementById(previewImgId);
          if (previewImg) {
            previewImg.src = dataUrl;
          }

          // Persist image in localStorage
          try {
            localStorage.setItem(`custom-img-${targetImgId}`, dataUrl);
          } catch (err) {
            console.warn("Storage quota exceeded, cannot save image permanently locally.", err);
          }
        };

        reader.readAsDataURL(file);
      }
    });
  });
}

function loadSavedImages() {
  const savedKeys = [
    "img-main-left",
    "img-center-cutout",
    "img-middle-left",
    "img-right-standing",
    "img-earrings-detail",
    "img-insta-avatar"
  ];

  savedKeys.forEach(id => {
    const dataUrl = localStorage.getItem(`custom-img-${id}`);
    if (dataUrl) {
      // Update page image
      const pageImg = document.getElementById(id);
      if (pageImg) pageImg.src = dataUrl;

      // Update preview in uploader modal
      const previewId = `preview-${id.replace("img-", "")}`;
      const previewImg = document.getElementById(previewId);
      if (previewImg) previewImg.src = dataUrl;
    }
  });
}

/* ==========================================================================
   ADDITIONAL MAP PIN & ACTIONS INTERACTIONS
   ========================================================================== */
function initMapPinsAndActions() {
  // Buttons 'Xem bản đồ' and 'Check in' have been removed.
}

/* ==========================================================================
   FONT CUSTOMIZER LOGIC
   ========================================================================== */
function initFontCustomizer() {
  const fontDisplaySelect = document.getElementById("font-display-select");
  const fontBodySelect = document.getElementById("font-body-select");

  if (!fontDisplaySelect || !fontBodySelect) return;

  // Load saved fonts from localStorage
  const savedDisplayFont = localStorage.getItem("custom-font-display");
  const savedBodyFont = localStorage.getItem("custom-font-body");

  if (savedDisplayFont) {
    document.documentElement.style.setProperty("--font-display", savedDisplayFont);
    fontDisplaySelect.value = savedDisplayFont;
  }
  if (savedBodyFont) {
    document.documentElement.style.setProperty("--font-body", savedBodyFont);
    fontBodySelect.value = savedBodyFont;
  }

  // Event listeners for change
  fontDisplaySelect.addEventListener("change", function() {
    const selectedFont = this.value;
    document.documentElement.style.setProperty("--font-display", selectedFont);
    localStorage.setItem("custom-font-display", selectedFont);
  });

  fontBodySelect.addEventListener("change", function() {
    const selectedFont = this.value;
    document.documentElement.style.setProperty("--font-body", selectedFont);
    localStorage.setItem("custom-font-body", selectedFont);
  });
}

/* ==========================================================================
   VIDEO PLAYER LOGIC
   ========================================================================== */
function initVideoPlayer() {
  const videoGridItems = document.querySelectorAll(".video-grid-item");
  const lightbox = document.getElementById("video-lightbox");
  const lightboxVideo = document.getElementById("lightbox-video-player");
  const lightboxTitle = document.getElementById("lightbox-title");
  const closeLightboxBtn = document.getElementById("close-lightbox-btn");
  const videoInputs = document.querySelectorAll(".modal-video-input");

  if (!lightbox || !lightboxVideo) return;

  // 1. Open Lightbox on item click
  videoGridItems.forEach(item => {
    item.addEventListener("click", function() {
      const videoSrc = this.getAttribute("data-video-src");
      const videoTitle = this.getAttribute("data-video-title") || "Chi Tiết Buổi Livestream";

      if (videoSrc) {
        if (lightboxTitle) {
          lightboxTitle.textContent = videoTitle;
        }
        lightboxVideo.src = videoSrc;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden"; // Disable scroll when modal open
        
        // Auto play the video
        lightboxVideo.play().catch(err => console.log("Auto-play blocked by browser, user interaction required.", err));
      }
    });
  });

  // 2. Close Lightbox on close button click
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src"); // reset video source to release memory/stop loading
    lightboxVideo.load();
    document.body.style.overflow = ""; // Restore scroll
  };

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
  }

  // Close Lightbox on backdrop overlay click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // 3. Handle local Video File inputs in customization modal
  videoInputs.forEach(input => {
    input.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];

        // Ensure it's an MP4/Video file
        if (!file.type.startsWith("video/")) {
          alert("Vui lòng chọn một tệp video (định dạng MP4)!");
          return;
        }

        // Create a temporary Blob URL for the video file
        const blobUrl = URL.createObjectURL(file);
        const targetId = this.getAttribute("data-target-id");
        const gridItem = document.getElementById(targetId);

        if (gridItem) {
          // Update the grid item's custom video data source attribute
          gridItem.setAttribute("data-video-src", blobUrl);
          
          // Inform the user
          const labelEl = this.closest(".upload-row").querySelector(".upload-label");
          const originalLabelText = labelEl.textContent.split(" (")[0];
          labelEl.innerHTML = `${originalLabelText} <span style="color: #27c462; font-weight:bold;">(Đã chèn video mới! ✔)</span>`;
        }
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM SUBMIT LOGIC
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("form-name");
    const name = nameInput ? nameInput.value : "bạn";

    // Show a beautiful Vietnamese custom alert
    alert(`✔ Cảm ơn ${name} đã kết nối! Lời nhắn của bạn đã được gửi thành công. Quế Thơ sẽ phản hồi sớm nhất có thể!`);

    // Reset the form
    form.reset();
  });
}
