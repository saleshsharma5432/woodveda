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
    rating: "4.9 ★ (150+ Verified Flipkart Reviews)",
    image: "assets/images/bonsai_tree.jpg",
    secondaryImage: "assets/images/bonsai_tree.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-black-bonsai-shape-mirror-tree/p/itm1c6be1e5a55c5?pid=DECHPXFZGGQDYBA5",
    description: "Authentic WoodVeda Black Bonsai tree shape mirror decor featuring metallic bronze tinted acrylic reflective leaf clusters for living room walls.",
    inBox: "1x Bonsai Tree Mirror Wall Art, Heavy Duty Mounting Strips, Wall Stencil, Microfiber Cleaning Cloth"
  },
  3: {
    id: 3,
    title: "WoodVeda Luffy One Piece Metal Wall Art Laser Cut Decor",
    category: "Anime & Pop Culture Wall Art",
    dimensions: "18 INCH (L) x 18 INCH (W)",
    material: "Precision CNC Laser Cut Black Metal & Matte Finish Accent",
    rating: "4.9 ★ (110+ Verified Flipkart Reviews)",
    image: "assets/images/luffy_wall_art.jpg",
    secondaryImage: "assets/images/luffy_wall_art.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-luffy-one-piece-metal-wall-art-laser-cut-decor/p/itm90aeef5fe84c5?pid=WDCHQ66HCPFSU2TM",
    description: "Iconic Monkey D. Luffy silhouette laser cut wall decor art piece. Precision cut with smooth edges for anime lovers and gaming setup accent walls.",
    inBox: "1x Luffy One Piece Wall Art Decor, Heavy Duty Mounting Tape, Installation Stencil"
  },
  4: {
    id: 4,
    title: "WoodVeda Circular Elephant Family Wall Art Decor",
    category: "Nature & Wildlife Wall Decor",
    dimensions: "20 INCH (L) x 20 INCH (W)",
    material: "Handcrafted Layered Black Wood/Acrylic Silhouette",
    rating: "4.8 ★ (95+ Verified Flipkart Reviews)",
    image: "assets/images/elephant_family_art.jpg",
    secondaryImage: "assets/images/elephant_family_art.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-circular-elephant-family-wall-art/p/itm59e086b37cded?pid=WDCHQ66FS6UB968H",
    description: "Serene circular elephant family silhouette wall art symbolizing harmony and family unity. Adds warm, natural charm to entryways and living spaces.",
    inBox: "1x Circular Elephant Family Wall Art, Mounting Hardware, Wall Template"
  },
  5: {
    id: 5,
    title: "WoodVeda Roronoa Zoro One Piece Laser Cut Wall Art",
    category: "Anime & Pop Culture Wall Art",
    dimensions: "18 INCH (L) x 18 INCH (W)",
    material: "Laser Cut Black Acrylic & Metallic Accent Backdrop",
    rating: "4.9 ★ (140+ Verified Flipkart Reviews)",
    image: "assets/images/zoro_roronoa_art.jpg",
    secondaryImage: "assets/images/zoro_roronoa_art.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-roronoa-zoro/p/itmc0b34a9667c38?pid=WDCHQ3NK24Q6Q8VZ",
    description: "Badass Roronoa Zoro Three-Sword Style silhouette laser cut wall artwork. Designed for One Piece fans wanting a bold anime aesthetic.",
    inBox: "1x Roronoa Zoro Wall Art Piece, Pre-installed Wall Adhesive Strips, User Guide"
  },
  6: {
    id: 6,
    title: "WoodVeda Zoro Swordsman Silhouette Wall Decor",
    category: "Anime & Pop Culture Wall Art",
    dimensions: "20 INCH (L) x 16 INCH (W)",
    material: "High-Grade CNC Cut Acrylic Wall Sculpture",
    rating: "4.8 ★ (88+ Verified Flipkart Reviews)",
    image: "assets/images/zoro_swordsman_art.jpg",
    secondaryImage: "assets/images/zoro_swordsman_art.jpg",
    flipkartLink: "https://www.flipkart.com/woodveda-zoro/p/itm787dd749c3349?pid=WDCHQ6523RQ6QHCM",
    description: "Detailed Zoro swordsman action stance laser cut wall sculpture. Perfect statement wall accent for bedrooms, studios, and entertainment rooms.",
    inBox: "1x Zoro Swordsman Wall Decor Art, Mounting Tape, Microfiber Wipe"
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
