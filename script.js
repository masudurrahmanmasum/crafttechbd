/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    description:
      "Premium wireless headphones with clear sound, deep bass and long battery life.",
  },

  {
    id: 2,
    name: "Smart Watch Pro",
    category: "electronics",
    price: 3999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    description:
      "A stylish smart watch with fitness tracking, notifications and modern features.",
  },

  {
    id: 3,
    name: "Premium T-Shirt",
    category: "fashion",
    price: 899,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    description:
      "Comfortable premium cotton t-shirt suitable for everyday casual wear.",
  },

  {
    id: 4,
    name: "Classic Sneakers",
    category: "shoes",
    price: 2999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    description:
      "Modern classic sneakers designed for comfort and everyday performance.",
  },

  {
    id: 5,
    name: "Leather Backpack",
    category: "accessories",
    price: 1899,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    description:
      "Premium backpack with a spacious interior and elegant design.",
  },

  {
    id: 6,
    name: "Sunglasses",
    category: "accessories",
    price: 1299,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    description: "Stylish sunglasses with a modern frame and UV protection.",
  },

  {
    id: 7,
    name: "Denim Jacket",
    category: "fashion",
    price: 2199,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
    description:
      "Classic denim jacket with a timeless look and comfortable fit.",
  },

  {
    id: 8,
    name: "Running Shoes",
    category: "shoes",
    price: 3499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80",
    description:
      "Lightweight running shoes built for comfort and active lifestyles.",
  },
];

/* =====================================================
   DOM ELEMENTS
===================================================== */

const productGrid = document.getElementById("productGrid");

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const wishlistCount = document.getElementById("wishlistCount");

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const sortSelect = document.getElementById("sortSelect");

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const newsletterForm = document.getElementById("newsletterForm");

const checkoutBtn = document.getElementById("checkoutBtn");

/* =====================================================
   LOCAL STORAGE
===================================================== */

let cart = JSON.parse(localStorage.getItem("shopnest-cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("shopnest-wishlist")) || [];

/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {
  return "৳" + price.toLocaleString("en-BD");
}

/* =====================================================
   SAVE DATA
===================================================== */

function saveCart() {
  localStorage.setItem("shopnest-cart", JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem("shopnest-wishlist", JSON.stringify(wishlist));
}

/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(productList = products) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = `
            <div class="empty-cart" style="grid-column:1/-1;">
                <i class="fa-solid fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

    return;
  }

  productList.forEach((product, index) => {
    const isLiked = wishlist.includes(product.id);

    const card = document.createElement("article");

    card.className = "product-card reveal";

    card.style.transitionDelay = `${index * 70}ms`;

    card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="product-actions">

                    <button
                        class="wishlist-product ${isLiked ? "liked" : ""}"
                        data-id="${product.id}"
                        title="Wishlist"
                    >
                        <i class="fa-${isLiked ? "solid" : "regular"} fa-heart"></i>
                    </button>

                    <button
                        class="quick-view"
                        data-id="${product.id}"
                        title="Quick View"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                </div>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-rating">
                    ${createStars(product.rating)}
                    <span>${product.rating}</span>
                </div>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                        title="Add to cart"
                    >
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>

                </div>

            </div>
        `;

    productGrid.appendChild(card);
  });

  observeRevealElements();
}

/* =====================================================
   STAR RATING
===================================================== */

function createStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += `<i class="fa-solid fa-star"></i>`;
    } else {
      stars += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return stars;
}

/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }

  saveCart();

  renderCart();

  showToast("Product added to cart");
}

/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();

  renderCart();

  showToast("Product removed");
}

/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(id, amount) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);

    return;
  }

  saveCart();

  renderCart();
}

/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add some products to get started.</p>

            </div>
        `;

    updateCartCount();

    cartTotal.textContent = formatPrice(0);

    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const product = products.find((product) => product.id === item.id);

    if (!product) return;

    const itemTotal = product.price * item.quantity;

    total += itemTotal;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h4>${product.name}</h4>

                <span class="cart-item-price">
                    ${formatPrice(product.price)}
                </span>

                <div class="quantity-controls">

                    <button
                        class="quantity-minus"
                        data-id="${product.id}"
                    >
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="quantity-plus"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                data-id="${product.id}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = formatPrice(total);

  updateCartCount();
}

/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = count;
}

/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((productId) => productId !== id);

    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);

    showToast("Added to wishlist");
  }

  saveWishlist();

  updateWishlistCount();

  renderProducts(getCurrentProducts());
}

/* =====================================================
   WISHLIST COUNT
===================================================== */

function updateWishlistCount() {
  wishlistCount.textContent = wishlist.length;
}

/* =====================================================
   GET CURRENT PRODUCTS
===================================================== */

function getCurrentProducts() {
  const activeFilter = document.querySelector(".filter-btn.active");

  const filter = activeFilter?.dataset.filter || "all";

  let result = [...products];

  if (filter !== "all") {
    result = result.filter((product) => product.category === filter);
  }

  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm) {
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    );
  }

  return result;
}

/* =====================================================
   FILTER PRODUCTS
===================================================== */

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    renderProducts(getCurrentProducts());
  });
});

/* =====================================================
   CATEGORY CARDS
===================================================== */

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");

      if (btn.dataset.filter === category) {
        btn.classList.add("active");
      }
    });

    renderProducts(getCurrentProducts());

    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* =====================================================
   SEARCH
===================================================== */

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("active");

  setTimeout(() => {
    searchInput.focus();
  }, 300);
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("active");
});

searchOverlay.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    searchOverlay.classList.remove("active");
  }
});

searchInput.addEventListener("input", () => {
  renderProducts(getCurrentProducts());
});

/* =====================================================
   SORT PRODUCTS
===================================================== */

sortSelect.addEventListener("change", () => {
  let result = getCurrentProducts();

  const sort = sortSelect.value;

  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProducts(result);
});

/* =====================================================
   PRODUCT GRID EVENTS
===================================================== */

productGrid.addEventListener("click", (event) => {
  const cartButton = event.target.closest(".add-cart");

  const wishlistButton = event.target.closest(".wishlist-product");

  const quickViewButton = event.target.closest(".quick-view");

  if (cartButton) {
    const id = Number(cartButton.dataset.id);

    addToCart(id);
  }

  if (wishlistButton) {
    const id = Number(wishlistButton.dataset.id);

    toggleWishlist(id);
  }

  if (quickViewButton) {
    const id = Number(quickViewButton.dataset.id);

    openProductModal(id);
  }
});

/* =====================================================
   OPEN PRODUCT MODAL
===================================================== */

function openProductModal(id) {
  const product = products.find((product) => product.id === id);

  if (!product) return;

  modalContent.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="modal-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>${product.name}</h2>

                <div class="product-rating">
                    ${createStars(product.rating)}
                    ${product.rating}
                </div>

                <div class="modal-price">
                    ${formatPrice(product.price)}
                </div>

                <p>
                    ${product.description}
                </p>

                <button
                    class="btn primary-btn modal-add-cart"
                    data-id="${product.id}"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    Add To Cart
                </button>

            </div>

        </div>
    `;

  productModal.classList.add("active");
}

modalClose.addEventListener("click", () => {
  productModal.classList.remove("active");
});

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    productModal.classList.remove("active");
  }
});

modalContent.addEventListener("click", (event) => {
  const button = event.target.closest(".modal-add-cart");

  if (!button) return;

  const id = Number(button.dataset.id);

  addToCart(id);

  productModal.classList.remove("active");
});

/* =====================================================
   CART EVENTS
===================================================== */

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");

  cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);

function closeCartSidebar() {
  cartSidebar.classList.remove("active");

  cartOverlay.classList.remove("active");
}

/* =====================================================
   CART ITEM EVENTS
===================================================== */

cartItems.addEventListener("click", (event) => {
  const plus = event.target.closest(".quantity-plus");

  const minus = event.target.closest(".quantity-minus");

  const remove = event.target.closest(".remove-item");

  if (plus) {
    changeQuantity(Number(plus.dataset.id), 1);
  }

  if (minus) {
    changeQuantity(Number(minus.dataset.id), -1);
  }

  if (remove) {
    removeFromCart(Number(remove.dataset.id));
  }
});

/* =====================================================
   CHECKOUT
===================================================== */

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty");

    return;
  }

  showToast("Checkout is ready for backend integration");
});

/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {
  toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =====================================================
   NEWSLETTER
===================================================== */

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("emailInput").value.trim();

  if (!email) return;

  showToast("Successfully subscribed!");

  newsletterForm.reset();
});

/* =====================================================
   MOBILE MENU
===================================================== */

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");

  const icon = menuBtn.querySelector("i");

  if (navbar.classList.contains("active")) {
    icon.classList.remove("fa-bars");

    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");
  }
});

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");
  });
});

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

let revealObserver;

function observeRevealElements() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );
  }

  document.querySelectorAll(".reveal:not(.show)").forEach((element) => {
    revealObserver.observe(element);
  });
}

/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (window.scrollY > 30) {
    header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  searchOverlay.classList.remove("active");

  productModal.classList.remove("active");

  closeCartSidebar();
});

/* =====================================================
   INITIALIZATION
===================================================== */

function init() {
  renderProducts();

  renderCart();

  updateWishlistCount();

  observeRevealElements();
}

init();

// local storage data wishlist and cart by reloading browser 
localStorage.removeItem("shopnest-cart");
localStorage.removeItem("shopnest-wishlist");