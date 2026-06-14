const PRODUCTS = [
  {
    id: "kids-multi",
    name: "Kids Good Multi-Vitamin",
    price: 29.99,
    category: "kids",
    flavor: "Wild Raspberry",
    animal: "Pippa the Yellow-Eyed Penguin",
    image: "assets/kids_multivitamin.png",
    rating: 4.9,
    reviewsCount: 148,
    description: "Packed full of goodness, our Kids Good Multi-Vitamin soft chews are designed to support your child's daily health, growth, and immune vitality. Specially formulated for busy Kiwi kids, they make getting daily nutrients easy and delicious!",
    benefits: [
      "Supports daily growth & development",
      "Pectin fruit base (No Gelatin)",
      "Gluten-free, dairy-free & nut-free",
      "Halal certified & Vegan friendly"
    ],
    ingredients: "Active Ingredients per chew: Vitamin A (as Retinyl Acetate) 120mcg, Vitamin C (as L-Ascorbic Acid) 15mg, Vitamin D3 (as Cholecalciferol) 2.5mcg (100IU), Vitamin E (as DL-Alpha-Tocopheryl Acetate) 3.5mg, Vitamin B6 0.5mg, Vitamin B12 1.2mcg, Folic Acid 100mcg, Biotin 15mcg, Zinc 1.5mg. Also contains: Pectin, Sodium Citrate, Citric Acid, Natural Raspberry Flavor.",
    dosage: "Children 2+ years: Take 1-2 soft-chews daily, or as advised by your healthcare professional."
  },
  {
    id: "kids-vitac",
    name: "Kids Good Vita-C + Zinc",
    price: 29.99,
    category: "kids",
    flavor: "Natural Peach",
    animal: "Finley the King Salmon",
    image: "assets/kids_vitac.png",
    rating: 4.8,
    reviewsCount: 92,
    description: "Help keep your children's immunity strong year-round with our Vita-C + Zinc soft chews. Combined with essential Zinc, this duo acts as a powerful antioxidant support system to help ward off winter ills and support skin health.",
    benefits: [
      "Dual action immune defense",
      "Powerful antioxidant support",
      "100% natural peach flavor",
      "No artificial colors, preservatives or sugar coatings"
    ],
    ingredients: "Active Ingredients per chew: Vitamin C (L-Ascorbic Acid) 50mg, Zinc (as Zinc Citrate) 3mg. Other Ingredients: Sugar, Glucose Syrup, Pectin, Citric Acid, Sodium Citrate, Natural Peach Flavor, Beta-Carotene (for color).",
    dosage: "Children 2+ years: Take 1-2 soft-chews daily, or as advised by your healthcare professional."
  },
  {
    id: "adult-acv",
    name: "Adults Good Apple Cider Vinegar",
    price: 34.99,
    category: "adults",
    flavor: "Sweet Apple",
    animal: null,
    image: "assets/adult_acv.png",
    rating: 4.7,
    reviewsCount: 215,
    description: "Enjoy all the incredible health benefits of traditional Apple Cider Vinegar without the harsh, sour taste! Formulated to support digestive health, natural detox, energy metabolism, and radiant skin, these chews make wellness a treat.",
    benefits: [
      "Supports healthy digestion & gut flora",
      "Aids in natural body detoxification",
      "Contains the 'Mother' for maximum potency",
      "No sour vinegar taste or tooth enamel damage"
    ],
    ingredients: "Active Ingredients per chew: Apple Cider Vinegar Powder 500mg (equivalent to 10ml liquid ACV, 5% Acetic Acid). Also contains: Pectin, Sodium Citrate, Citric Acid, Natural Apple Flavor, Spinach Powder (for natural color).",
    dosage: "Adults: Take 2 soft-chews daily, or as advised by your healthcare professional."
  },
  {
    id: "adult-collagen",
    name: "Adults Good Collagen Beauty",
    price: 34.99,
    category: "adults",
    flavor: "Pomegranate & Berry",
    animal: null,
    image: "assets/adult_collagen.png",
    rating: 4.9,
    reviewsCount: 189,
    description: "Nourish your skin, hair, and nails from within. Formulated with high-quality Marine Collagen peptides and Vitamin C, these delicious soft chews help promote collagen production, skin elasticity, and a youthful glow.",
    benefits: [
      "Promotes skin elasticity & hydration",
      "Supports strong nails & healthy hair growth",
      "High absorption Marine Collagen peptides",
      "Rich in antioxidant Vitamin C"
    ],
    ingredients: "Active Ingredients per chew: Marine Collagen Peptides (Type I & III) 1000mg, Vitamin C (L-Ascorbic Acid) 20mg. Other Ingredients: Pectin, Fruit Juice Concentrate (Pomegranate), Natural Berry Flavor, Tapioca Syrup.",
    dosage: "Adults: Take 2-3 soft-chews daily, or as advised by your healthcare professional."
  }
];

// App State
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let discountPercent = 0;
let discountCode = "";

const FREE_SHIPPING_THRESHOLD = 50.00;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  initCart();
  initQuiz();
  setupEventListeners();
  loadCartFromStorage();
});

// Setup event listeners
function setupEventListeners() {
  // Category buttons
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      activeCategory = e.target.dataset.category;
      renderProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Cart side drawer toggle
  const cartIcon = document.getElementById("cart-icon-btn");
  const closeCart = document.getElementById("close-cart-btn");
  if (cartIcon) cartIcon.addEventListener("click", () => toggleCart(true));
  if (closeCart) closeCart.addEventListener("click", () => toggleCart(false));

  // Modal close
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalOverlay = document.getElementById("product-modal");
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Discount code submit
  const discountBtn = document.getElementById("apply-discount-btn");
  const discountInput = document.getElementById("discount-input");
  if (discountBtn && discountInput) {
    discountBtn.addEventListener("click", () => {
      const code = discountInput.value.toUpperCase().trim();
      if (code === "GOODPANDA10") {
        discountPercent = 0.10;
        discountCode = code;
        showToast("Coupon 'GOODPANDA10' applied! 10% Off your order.", "success");
      } else if (code === "") {
        showToast("Please enter a valid coupon code.", "error");
      } else {
        showToast("Invalid coupon code.", "error");
      }
      renderCart();
    });
  }

  // Checkout simulator
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
      }
      showToast("Processing order... Redirecting to simulated checkout!", "success");
      checkoutBtn.disabled = true;
      checkoutBtn.innerText = "Processing...";
      setTimeout(() => {
        alert("🎉 Purchase complete! This is a demo transaction. Thank you for choosing The Good Panda!");
        cart = [];
        saveCartToStorage();
        renderCart();
        toggleCart(false);
        checkoutBtn.disabled = false;
        checkoutBtn.innerText = "Checkout Now";
      }, 1500);
    });
  }
}

// Products Rendering
function initProducts() {
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || 
                          p.flavor.toLowerCase().includes(searchQuery) ||
                          (p.animal && p.animal.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products-msg">
        <p>No products found matching your search. Try adjusting your filter!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = `product-card card-${p.category}`;
    card.id = `card-${p.id}`;
    card.innerHTML = `
      <div class="product-badge">${p.category === 'kids' ? 'For Kids' : 'For Adults'}</div>
      <div class="product-img-wrapper" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
        <div class="product-hover-overlay">
          <span>Quick View</span>
        </div>
      </div>
      <div class="product-card-info">
        <span class="product-flavor">${p.flavor} Flavor</span>
        <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>
        ${p.animal ? `<p class="product-animal"><i class="tag-icon">🐾</i> ${p.animal}</p>` : `<p class="product-animal-placeholder"></p>`}
        <div class="product-rating">
          <span class="stars">★ ★ ★ ★ ★</span>
          <span class="rating-count">(${p.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" id="add-btn-${p.id}" onclick="event.stopPropagation(); addToCart('${p.id}')">
            Add To Cart
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Product Modal (Quick View)
let activeTab = "description";

function openProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById("product-modal");
  const content = document.getElementById("modal-dynamic-content");

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-left">
        <div class="modal-img-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </div>
      <div class="modal-right">
        <span class="modal-category">${product.category.toUpperCase()} RANGE</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="modal-meta">
          <span class="modal-flavor">🍒 ${product.flavor} Flavor</span>
          ${product.animal ? `<span class="modal-animal">🐾 ${product.animal}</span>` : ""}
        </div>
        <div class="modal-price">$${product.price.toFixed(2)}</div>
        
        <!-- Tabs Nav -->
        <div class="modal-tabs">
          <button class="tab-btn active" onclick="switchModalTab(event, 'description')">Details</button>
          <button class="tab-btn" onclick="switchModalTab(event, 'ingredients')">Ingredients</button>
          <button class="tab-btn" onclick="switchModalTab(event, 'benefits')">Benefits</button>
          <button class="tab-btn" onclick="switchModalTab(event, 'dosage')">Usage</button>
        </div>

        <!-- Tab Contents -->
        <div class="tab-content-container">
          <div id="tab-description" class="tab-pane active-pane">
            <p>${product.description}</p>
          </div>
          <div id="tab-ingredients" class="tab-pane">
            <p>${product.ingredients}</p>
          </div>
          <div id="tab-benefits" class="tab-pane">
            <ul class="modal-benefits-list">
              ${product.benefits.map(b => `<li>✓ ${b}</li>`).join("")}
            </ul>
          </div>
          <div id="tab-dosage" class="tab-pane">
            <p>${product.dosage}</p>
          </div>
        </div>

        <div class="modal-actions">
          <div class="qty-selector">
            <button onclick="adjustModalQty(-1)" class="qty-btn" id="modal-qty-minus">-</button>
            <span id="modal-qty-val">1</span>
            <button onclick="adjustModalQty(1)" class="qty-btn" id="modal-qty-plus">+</button>
          </div>
          <button class="modal-buy-btn" id="modal-add-to-cart-btn" onclick="addModalProductToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Disable background scrolling
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function switchModalTab(event, tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active-pane"));
  document.getElementById(`tab-${tabName}`).classList.add("active-pane");
}

function adjustModalQty(delta) {
  const qtyEl = document.getElementById("modal-qty-val");
  let qty = parseInt(qtyEl.innerText) + delta;
  if (qty < 1) qty = 1;
  qtyEl.innerText = qty;
}

function addModalProductToCart(id) {
  const qty = parseInt(document.getElementById("modal-qty-val").innerText);
  addToCart(id, qty);
  closeModal();
}

// Cart Management
function initCart() {
  renderCart();
}

function toggleCart(open) {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (open) {
    drawer.classList.add("open");
    overlay.classList.add("open");
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }
}

function addToCart(id, qty = 1) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.product.id === id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ product, quantity: qty });
  }

  // Animate button state briefly
  const addBtn = document.getElementById(`add-btn-${id}`);
  if (addBtn) {
    const originalText = addBtn.innerText;
    addBtn.innerText = "Added! ✓";
    addBtn.classList.add("added-animation");
    setTimeout(() => {
      addBtn.innerText = originalText;
      addBtn.classList.remove("added-animation");
    }, 1200);
  }

  saveCartToStorage();
  renderCart();
  toggleCart(true); // Open drawer on addition
  showToast(`Added ${qty} x ${product.name} to Cart`, "success");
}

function updateCartQuantity(id, delta) {
  const item = cart.find(item => item.product.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.product.id !== id);
    showToast(`${item.product.name} removed from cart`, "info");
  }
  saveCartToStorage();
  renderCart();
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const cartBadge = document.getElementById("cart-badge");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const discountRow = document.getElementById("cart-discount-row");

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    subtotal += item.product.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <span class="cart-item-flavor">🍒 ${item.product.flavor}</span>
        <div class="cart-item-price-row">
          <span class="cart-item-price">$${(item.product.price * item.quantity).toFixed(2)}</span>
          <div class="cart-item-qty">
            <button onclick="updateCartQuantity('${item.product.id}', -1)" class="cart-qty-btn">-</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.product.id}', 1)" class="cart-qty-btn">+</button>
          </div>
        </div>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  // Badge updates
  if (cartBadge) {
    cartBadge.innerText = totalItems;
    if (totalItems > 0) {
      cartBadge.style.display = "flex";
      cartBadge.classList.add("pulse");
      setTimeout(() => cartBadge.classList.remove("pulse"), 400);
    } else {
      cartBadge.style.display = "none";
    }
  }

  // Show empty cart message
  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <p>Your cart is empty!</p>
        <button onclick="toggleCart(false)" class="continue-shopping-btn">Shop Our Gummies</button>
      </div>
    `;
  }

  // Discount calculation
  let discountAmount = subtotal * discountPercent;
  let finalTotal = subtotal - discountAmount;

  if (discountPercent > 0) {
    discountRow.style.display = "flex";
    discountEl.innerText = `-$${discountAmount.toFixed(2)}`;
  } else {
    discountRow.style.display = "none";
  }

  subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  totalEl.innerText = `$${finalTotal.toFixed(2)}`;

  // Shipping progress bar
  const shippingBar = document.getElementById("shipping-bar-fill");
  const shippingMsg = document.getElementById("shipping-bar-msg");
  if (shippingBar && shippingMsg) {
    if (subtotal === 0) {
      shippingBar.style.width = "0%";
      shippingMsg.innerHTML = `Add products to unlock **FREE shipping**!`;
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingBar.style.width = "100%";
      shippingMsg.innerHTML = `🎉 You have unlocked **FREE shipping**!`;
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      const percentage = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
      shippingBar.style.width = `${percentage}%`;
      shippingMsg.innerHTML = `Spend **$${remaining.toFixed(2)}** more to unlock **FREE shipping**!`;
    }
  }
}

// Local Storage Helper
function saveCartToStorage() {
  localStorage.setItem("tgv_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const stored = localStorage.getItem("tgv_cart");
  if (stored) {
    try {
      cart = JSON.parse(stored);
      renderCart();
    } catch (e) {
      cart = [];
    }
  }
}

// Interactive Quiz Logic
let quizAnswers = {};
let quizStep = 1;

function initQuiz() {
  const quizNext = document.getElementById("quiz-next-btn");
  const quizPrev = document.getElementById("quiz-prev-btn");
  const quizRestart = document.getElementById("quiz-restart-btn");

  if (quizNext) quizNext.addEventListener("click", handleQuizNext);
  if (quizPrev) quizPrev.addEventListener("click", handleQuizPrev);
  if (quizRestart) quizRestart.addEventListener("click", restartQuiz);

  // Setup options selection
  document.querySelectorAll(".quiz-option").forEach(option => {
    option.addEventListener("click", (e) => {
      const card = e.currentTarget;
      const questionId = card.dataset.question;
      const val = card.dataset.value;

      // Deselect siblings
      document.querySelectorAll(`.quiz-option[data-question="${questionId}"]`).forEach(opt => {
        opt.classList.remove("selected");
      });
      card.classList.add("selected");
      quizAnswers[questionId] = val;
      
      // Enable Next button
      document.getElementById("quiz-next-btn").disabled = false;
    });
  });
}

function handleQuizNext() {
  if (quizStep === 1) {
    goToQuizStep(2);
  } else if (quizStep === 2) {
    showQuizResults();
  }
}

function handleQuizPrev() {
  if (quizStep === 2) {
    goToQuizStep(1);
  }
}

function goToQuizStep(step) {
  quizStep = step;
  document.querySelectorAll(".quiz-step").forEach(s => s.classList.remove("active-step"));
  document.getElementById(`quiz-step-${step}`).classList.add("active-step");

  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");

  if (step === 1) {
    prevBtn.style.display = "none";
    nextBtn.innerText = "Next Step ➔";
    nextBtn.disabled = !quizAnswers["age"];
  } else if (step === 2) {
    prevBtn.style.display = "inline-block";
    nextBtn.innerText = "Find My Gummy ➔";
    nextBtn.disabled = !quizAnswers["goal"];
  }
}

function showQuizResults() {
  quizStep = 3;
  document.querySelectorAll(".quiz-step").forEach(s => s.classList.remove("active-step"));
  document.getElementById("quiz-step-results").classList.add("active-step");

  document.getElementById("quiz-prev-btn").style.display = "none";
  document.getElementById("quiz-next-btn").style.display = "none";

  // Recommendation logic
  const age = quizAnswers["age"];
  const goal = quizAnswers["goal"];
  let recProduct = null;

  if (age === "kids") {
    if (goal === "immunity" || goal === "skin") {
      recProduct = PRODUCTS.find(p => p.id === "kids-vitac");
    } else {
      recProduct = PRODUCTS.find(p => p.id === "kids-multi");
    }
  } else {
    if (goal === "digestion" || goal === "detox") {
      recProduct = PRODUCTS.find(p => p.id === "adult-acv");
    } else {
      recProduct = PRODUCTS.find(p => p.id === "adult-collagen");
    }
  }

  const resultContainer = document.getElementById("quiz-result-product");
  if (recProduct) {
    resultContainer.innerHTML = `
      <div class="recommended-product-card">
        <div class="rec-ribbon">Recommended For You</div>
        <img src="${recProduct.image}" alt="${recProduct.name}" class="rec-img">
        <h3>${recProduct.name}</h3>
        <p class="rec-flavor">🍒 ${recProduct.flavor} Flavor</p>
        <p class="rec-desc">${recProduct.description}</p>
        <div class="rec-footer">
          <span class="rec-price">$${recProduct.price.toFixed(2)}</span>
          <button class="rec-buy-btn" onclick="addToCart('${recProduct.id}'); restartQuiz();">Add to Cart & Checkout</button>
        </div>
      </div>
    `;
  }
}

function restartQuiz() {
  quizAnswers = {};
  quizStep = 1;
  document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
  document.getElementById("quiz-prev-btn").style.display = "none";
  document.getElementById("quiz-next-btn").style.display = "inline-block";
  document.getElementById("quiz-next-btn").innerText = "Next Step ➔";
  document.getElementById("quiz-next-btn").disabled = true;

  document.querySelectorAll(".quiz-step").forEach(s => s.classList.remove("active-step"));
  document.getElementById("quiz-step-1").classList.add("active-step");
}

// Toast Notifications System
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button onclick="this.parentElement.remove()" class="toast-close-btn">&times;</button>
  `;

  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
