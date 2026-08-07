// ==========================================================================
// WoodVeda.arts — Official Flipkart Showcase Application
// Authentic Products & Direct Flipkart Link Engine
// ==========================================================================

const productsData = {
  1: {
    id: 1,
    title: "WoodVeda Anime Swirl Acrylic Wall Mirror (18\" x 18\")",
    category: "Anime Wall Decor & Statement Mirror",
    dimensions: "18 INCH (L) x 18 INCH (W) / 45.7cm x 45.7cm",
    material: "High-Grade Shatterproof Acrylic Mirror & Laser-Cut Black Frame",
    price: "₹840",
    originalPrice: "₹2,899",
    discount: "Save 71%",
    rating: "4.8 ★ (120+ Verified Flipkart Reviews)",
    image: "assets/images/anime_swirl_mirror.jpg",
    secondaryImage: "assets/images/anime_swirl_mirror.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-wall-decor/p/itm26ffecabd775c?pid=WDCHPWQKQGMQAQ7V",
    description: "Authentic WoodVeda Devil Fruit inspired anime swirl mirror decor. Crafted with precision CNC laser cutting and premium shatterproof reflective acrylic mirror.",
    inBox: "1x Acrylic Swirl Mirror (18\"x18\"), Pre-applied 3M Mounting Tape, Alignment Guide, Protective Scratch Film"
  },
  2: {
    id: 2,
    title: "WoodVeda Black Bonsai Shape Mirror Tree Decor",
    category: "Nature & Zen Wall Decor",
    dimensions: "24 INCH (L) x 20 INCH (W) / 61cm x 50.8cm",
    material: "Black Acrylic Silhouette & Bronze Reflective Acrylic Leaf Clusters",
    price: "₹680",
    originalPrice: "₹2,999",
    discount: "Save 77%",
    rating: "4.9 ★ (150+ Verified Flipkart Reviews)",
    image: "assets/images/bonsai_tree.jpg",
    secondaryImage: "assets/images/bonsai_tree.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-black-bonsai-shape-mirror-tree/p/itm1c6be1e5a55c5?pid=DECHPXFZGGQDYBA5",
    description: "Authentic WoodVeda Black Bonsai tree shape mirror decor featuring metallic bronze tinted acrylic reflective leaf clusters for living room walls.",
    inBox: "1x Bonsai Tree Mirror Wall Art, Heavy Duty Mounting Strips, Wall Stencil, Microfiber Cleaning Cloth"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initWallVisualizer();
  initQuickViewModal();
});

function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function initWallVisualizer() {
  const wallCanvas = document.getElementById("wallCanvas");
  const wallArtworkImg = document.getElementById("wallArtworkImg");
  const colorSwatches = document.querySelectorAll(".swatch-btn");
  const artSelectBtns = document.querySelectorAll(".btn-select-art");

  colorSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      const color = swatch.getAttribute("data-color");
      wallCanvas.style.backgroundColor = color;
    });
  });

  artSelectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      artSelectBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const artImgSrc = btn.getAttribute("data-img");
      
      wallArtworkImg.style.opacity = "0";
      setTimeout(() => {
        wallArtworkImg.src = artImgSrc;
        wallArtworkImg.style.opacity = "1";
      }, 200);
    });
  });

  // Size adjustment slider
  const sizeSlider = document.getElementById("sizeSlider");
  const sizeLabel = document.getElementById("sizeLabel");

  if (sizeSlider) {
    sizeSlider.addEventListener("input", (e) => {
      const val = e.target.value;
      wallArtworkImg.style.maxWidth = val + "px";
      wallArtworkImg.style.maxHeight = val + "px";
      sizeLabel.textContent = val + " px";
    });
  }
}

function initQuickViewModal() {
  const modalOverlay = document.getElementById("quickViewModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const quickViewBtns = document.querySelectorAll(".btn-quickview");

  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrice = document.getElementById("modalPrice");
  const modalOriginalPrice = document.getElementById("modalOriginalPrice");
  const modalDiscount = document.getElementById("modalDiscount");
  const modalRating = document.getElementById("modalRating");
  const modalDimensions = document.getElementById("modalDimensions");
  const modalMaterial = document.getElementById("modalMaterial");
  const modalDesc = document.getElementById("modalDesc");
  const modalInBox = document.getElementById("modalInBox");
  const modalFkBtn = document.getElementById("modalFkBtn");

  quickViewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const prodId = btn.getAttribute("data-product-id");
      const item = productsData[prodId];
      if (!item) return;

      modalImg.src = item.image;
      modalTitle.textContent = item.title;
      modalCategory.textContent = item.category;
      modalPrice.textContent = item.price;
      modalOriginalPrice.textContent = item.originalPrice;
      modalDiscount.textContent = item.discount;
      modalRating.textContent = item.rating;
      modalDimensions.textContent = item.dimensions;
      modalMaterial.textContent = item.material;
      modalDesc.textContent = item.description;
      modalInBox.textContent = item.inBox;
      modalFkBtn.href = item.flipkartLink;

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
}

// ===== Custom Order Form: Upload + Submit =====
document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.getElementById("uploadDropzone");
  const fileInput = document.getElementById("custImage");
  const preview = document.getElementById("uploadPreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  const removeBtn = document.getElementById("uploadRemoveBtn");
  const form = document.getElementById("customOrderForm");
  const submitBtn = document.getElementById("submitOrderBtn");
  const successDiv = document.getElementById("orderSuccess");

  if (!dropzone) return;

  // Click to browse
  dropzone.addEventListener("click", (e) => {
    if (e.target === removeBtn || e.target.closest(".upload-remove-btn")) return;
    fileInput.click();
  });

  // File selected via browse
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) showPreview(fileInput.files[0]);
  });

  // Drag & drop events
  ["dragenter", "dragover"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      showPreview(file);
    }
  });

  // Remove uploaded image
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.value = "";
    preview.style.display = "none";
    removeBtn.style.display = "none";
    placeholder.style.display = "";
  });

  function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = "block";
      removeBtn.style.display = "block";
      placeholder.style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  // Form submit via AJAX to FormSubmit.co → salesh54322@gmail.com
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const idea = document.getElementById("custIdea").value.trim();

    if (!name || !email || !phone || !idea) {
      alert("Please fill in all required fields.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>🔄 Sending to WoodVeda...</span>";

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/salesh54322@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          form.style.display = "none";
          successDiv.style.display = "block";
        } else {
          alert("Something went wrong. Please try again.");
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>🚀 Submit Custom Request</span>";
        }
      })
      .catch(() => {
        alert("Network error. Please check your connection and try again.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<span>🚀 Submit Custom Request</span>";
      });
  });
});

// Reset form to allow another submission
function resetCustomForm() {
  const form = document.getElementById("customOrderForm");
  const successDiv = document.getElementById("orderSuccess");
  const submitBtn = document.getElementById("submitOrderBtn");
  const preview = document.getElementById("uploadPreview");
  const removeBtn = document.getElementById("uploadRemoveBtn");
  const placeholder = document.getElementById("uploadPlaceholder");
  const fileInput = document.getElementById("custImage");

  form.reset();
  fileInput.value = "";
  preview.style.display = "none";
  removeBtn.style.display = "none";
  placeholder.style.display = "";
  submitBtn.disabled = false;
  submitBtn.innerHTML = "<span>🚀 Submit Custom Request</span>";
  successDiv.style.display = "none";
  form.style.display = "";
}
