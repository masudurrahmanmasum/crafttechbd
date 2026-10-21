/* =====================================================
   CRAFT TECH BD - COMPLETE SCRIPT
===================================================== */


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

/*-----------------------------------------------------------

flash sale product script 

-------------------------------------------------------------*/

(() => {
  "use strict";

  const grid = document.getElementById("poProductGrid");
  const moreBtn = document.getElementById("poMoreBtn");
  const status = document.getElementById("poStatus");
  const modal = document.getElementById("poQuickModal");
  const modalContent = document.getElementById("poModalContent");

  let products = [];
  let showAll = false;

  let cart = JSON.parse(localStorage.getItem("crafttech_cart") || "[]");

  let wishlist = JSON.parse(localStorage.getItem("crafttech_wishlist") || "[]");

  const money = (value) => "৳" + Number(value || 0).toLocaleString("en-US");

  const safe = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );

  const productById = (id) => products.find((p) => String(p.id) === String(id));

  function saveState() {
    localStorage.setItem("crafttech_cart", JSON.stringify(cart));

    localStorage.setItem("crafttech_wishlist", JSON.stringify(wishlist));
  }

  function cardTemplate(p, index) {
    const wished = wishlist.some((id) => String(id) === String(p.id));

    const sold = Math.max(0, Math.min(100, Number(p.soldPercent) || 0));

    const outOfStock = Number(p.stock) <= 0;

    return `
      <article class="po-card"
        style="animation-delay:${Math.min(index, 7) * 35}ms">

        <div class="po-card-media">

          <img
            class="po-card-image"
            src="${safe(p.image)}"
            alt="${safe(p.name)}"
            loading="lazy"
          >

          <span class="po-discount">
            -${safe(p.discount)}%
          </span>

          <button
            class="po-wish ${wished ? "is-active" : ""}"
            type="button"
            data-po-wish="${safe(p.id)}"
            aria-pressed="${wished}"
            aria-label="Wishlist-এ যোগ করুন"
          >
            ${wished ? "♥" : "♡"}
          </button>

          <button
            class="po-quick"
            type="button"
            data-po-quick="${safe(p.id)}"
          >
            Quick View
          </button>

        </div>

        <div class="po-card-body">

          <p class="po-category">
            ${safe(p.category)}
          </p>

          <h3 class="po-name">
            ${safe(p.name)}
          </h3>

          <div class="po-rating">
            <span class="po-stars">★★★★★</span>
            <span class="po-review">
              (${safe(p.reviews)})
            </span>
          </div>

          <div class="po-price-row">
            <span class="po-price">
              ${money(p.price)}
            </span>

            <span class="po-old-price">
              ${money(p.oldPrice)}
            </span>
          </div>

          <div class="po-stock-head">
            <span class="po-stock-label">
              মাত্র কিছু বাকি
            </span>

            <span class="po-stock-percent">
              ${sold}%
            </span>
          </div>

          <div class="po-stock-track">
            <div
              class="po-stock-fill"
              style="width:${sold}%"
            ></div>
          </div>

          <div class="po-actions">

            

            <a
  class="po-action-btn po-buy-link"
  href="${safe(p.link || "#")}"
  ${outOfStock ? 'aria-disabled="true"' : ""}
  ${outOfStock ? 'tabindex="-1"' : ""}
>
  🛍 কিনুন
</a>

          </div>

        </div>
      </article>
    `;
  }

  function render() {
    const visibleProducts = showAll ? products : products.slice(0, 4);

    grid.innerHTML = visibleProducts.map((p, i) => cardTemplate(p, i)).join("");

    moreBtn.hidden = products.length <= 4;

    moreBtn.innerHTML = showAll
      ? "কম দেখুন <span>↑</span>"
      : "আজকের অফার দেখুন <span>→</span>";
  }

  function openQuickView(id) {
    const p = productById(id);

    if (!p) return;

    modalContent.innerHTML = `
      <div class="po-modal-product">
    

        <img
          src="${safe(p.image)}"
          alt="${safe(p.name)}"
        >

        <div class="go_middle">

        <div>
                  <p class="po-category">
            ${safe(p.category)}
          </p>

          <h3 id="poModalTitle">
            ${safe(p.name)}
          </h3>

          <div class="po-rating">
            <span class="po-stars">★★★★★</span>
            <span class="po-review">
              (${safe(p.reviews)} reviews)
            </span>
          </div>

          <span class="po-price">
            ${money(p.price)}
          </span>

          <span class="po-old-price">
            ${money(p.oldPrice)}
          </span>

          <p>
            ${safe(p.shortDescription)}
          </p>

          <p class="po-modal-stock">
            ${
              Number(p.stock) > 0 ? `স্টকে আছে: ${safe(p.stock)}টি` : "স্টক শেষ"
            }
          </p>

        </div>
        
          

        </div>
      </div>
    `;

    addQuickViewWhatsAppButton(p, modalContent);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modal.querySelector(".po-modal-close").focus();
  }

  function closeQuickView() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  moreBtn.addEventListener("click", () => {
    showAll = !showAll;
    render();

    if (!showAll) {
      document.getElementById("todayOffers").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  document.addEventListener("click", (event) => {
    const quick = event.target.closest("[data-po-quick]");
    const wish = event.target.closest("[data-po-wish]");
    const cartButton = event.target.closest("[data-po-cart]");
    const buy = event.target.closest("[data-po-buy]");
    const close = event.target.closest("[data-po-close]");

    if (quick) {
      openQuickView(quick.dataset.poQuick);
    }

    if (wish) {
      const id = wish.dataset.poWish;

      const index = wishlist.findIndex((item) => String(item) === String(id));

      if (index >= 0) {
        wishlist.splice(index, 1);
      } else {
        wishlist.push(id);
      }

      saveState();
      render();

      status.textContent =
        index >= 0 ? "Wishlist থেকে সরানো হয়েছে।" : "Wishlist-এ যোগ করা হয়েছে।";
    }

    if (cartButton) {
      addToCart(cartButton.dataset.poCart);
    }

    if (buy) {
      addToCart(buy.dataset.poBuy, true);
    }

    if (close) {
      closeQuickView();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeQuickView();
    }
  });

  fetch("flash_product.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("flash_product.json ফাইল পাওয়া যায়নি।");
      }

      return response.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.products)) {
        throw new Error("JSON ফরম্যাট সঠিক নয়।");
      }

      products = data.products.filter((p) => p.enabled !== false).slice(0, 8);

      if (!products.length) {
        throw new Error("কোনো প্রোডাক্ট পাওয়া যায়নি।");
      }

      render();
    })
    .catch((error) => {
      grid.innerHTML = `
        <p class="po-loading">
          প্রোডাক্ট লোড হয়নি: ${safe(error.message)}
          <br>
          Live Server দিয়ে ওয়েবসাইট চালু করুন।
        </p>
      `;

      moreBtn.hidden = true;
      console.error(error);
    });
})();

/* =====================================================
   CURRENT PRODUCTS
===================================================== */

function getCurrentProducts() {
  const activeFilter = document.querySelector(".filter-btn.active");

  const filter = activeFilter?.dataset.filter || "all";

  let result = [...products];

  if (filter !== "all") {
    result = result.filter((product) => product.category === filter);
  }

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

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
   FILTER BUTTONS
===================================================== */

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

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

    const productsSection = document.getElementById("products");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =====================================================
   SEARCH
===================================================== */

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");

    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });
}

if (closeSearch) {
  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });
}

if (searchOverlay) {
  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderProducts(getCurrentProducts());
  });
}

/* =====================================================
   SORT PRODUCTS
===================================================== */

if (sortSelect) {
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
}



/* =====================================================
   MOBILE MENU
===================================================== */

if (menuBtn) {
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
}

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");

      icon.classList.add("fa-bars");
    }
  });
});

/* =====================================================
   SCROLL REVEAL
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

  if (!header) return;

  if (window.scrollY > 30) {
    header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* =====================================================
   FLASH SALE COUNTDOWN
===================================================== */

const saleEndTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;

function updateSaleTimer() {
  const now = new Date().getTime();

  const distance = saleEndTime - now;

  const daysElement = document.getElementById("sale-days");

  const hoursElement = document.getElementById("sale-hours");

  const minutesElement = document.getElementById("sale-minutes");

  const secondsElement = document.getElementById("sale-seconds");

  if (distance <= 0) {
    if (daysElement) daysElement.textContent = "00";

    if (hoursElement) hoursElement.textContent = "00";

    if (minutesElement) minutesElement.textContent = "00";

    if (secondsElement) secondsElement.textContent = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysElement) daysElement.textContent = String(days).padStart(2, "0");

  if (hoursElement) hoursElement.textContent = String(hours).padStart(2, "0");

  if (minutesElement)
    minutesElement.textContent = String(minutes).padStart(2, "0");

  if (secondsElement)
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateSaleTimer();

setInterval(updateSaleTimer, 1000);

/* =====================================================
   VIEW ALL FLASH SALE
===================================================== */

const flashBtn = document.getElementById("viewFlashBtn");

const extraProducts = document.getElementById("extraProducts");

if (flashBtn && extraProducts) {
  flashBtn.addEventListener("click", () => {
    extraProducts.classList.add("show");

    flashBtn.style.opacity = "0";

    flashBtn.style.transform = "translateY(20px)";

    setTimeout(() => {
      flashBtn.style.display = "none";
    }, 400);

    setTimeout(() => {
      extraProducts.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  });
}

/* =====================================================
   FIZZY BUTTON ANIMATION
===================================================== */

const fizzyButtons = document.querySelectorAll(".fizzyBtn");

const fizzyColors = [
  "#6c4df6",
  "#5034d4",
  "#8c76ff",
  "#ff6b6b",
  "#ff8a8a",
  "#9b8aff",
  "#c4baff",
  "#6f5cff",
];

fizzyButtons.forEach((button) => {
  const box = button.querySelector(".fizzy-particles");

  if (!box) return;

  let hover = false;

  let interval = null;

  function particle() {
    if (!hover) return;

    const p = document.createElement("i");

    const angle = Math.random() * Math.PI * 2;

    const start = 15 + Math.random() * 20;

    const end = 80 + Math.random() * 120;

    const duration = 0.8 + Math.random() * 1.2;

    const color = fizzyColors[Math.floor(Math.random() * fizzyColors.length)];

    const size = 3 + Math.random() * 7;

    p.className = "fizzy-particle";

    p.style.cssText = `

                --sx:${Math.cos(angle) * start}px;

                --sy:${Math.sin(angle) * start}px;

                --ex:${Math.cos(angle) * end}px;

                --ey:${Math.sin(angle) * end}px;

                --d:${duration}s;

                width:${size}px;

                height:${size}px;

                background:${color};

                color:${color};

            `;

    box.appendChild(p);

    setTimeout(() => p.remove(), duration * 1000 + 100);
  }

  function start() {
    if (interval) return;

    for (let i = 0; i < 8; i++) {
      setTimeout(particle, i * 40);
    }

    interval = setInterval(particle, 30);
  }

  function stop() {
    clearInterval(interval);

    interval = null;
  }

  button.addEventListener("mouseenter", () => {
    hover = true;

    start();
  });

  button.addEventListener("mouseleave", () => {
    hover = false;

    stop();
  });
});

/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (searchOverlay) searchOverlay.classList.remove("active");

  if (productModal) productModal.classList.remove("active");

  closeCartSidebar();
});

/* =====================================================
   DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");

      themeIcon.classList.add("fa-sun");
    }
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");

      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");
      }
    } else {
      localStorage.setItem("theme", "light");

      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");
      }
    }
  });
}

/* =====================================================
   NEWSLETTER
===================================================== */

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById("emailMsg");

    const message = input ? input.value.trim() : "";

    if (!message) return;

    const email = "crafttechbd@gmail.com";

    window.location.href = `mailto:${email}?subject=New Message&body=${encodeURIComponent(message)}`;

    newsletterForm.reset();
  });
}

/* =====================================================
   INITIALIZATION
===================================================== */

function init() {
  /*
       Flash products must be initialized
       before cart/wishlist rendering.
    */

  observeRevealElements();
}

init();

/* =====================================================
   CRAFT TECH BD CHATBOT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const chatHead = document.getElementById("ctChatHead");

  const chatWindow = document.getElementById("ctChatWindow");

  const closeChat = document.getElementById("ctCloseChat");

  const resetChat = document.getElementById("ctResetChat");

  const notification = document.getElementById("ctNotification");

  const chatBody = document.getElementById("ctChatBody");

  const quickQuestions = document.getElementById("ctQuickQuestions");

  const typingMessage = document.getElementById("ctTypingMessage");

  if (!chatHead || !chatWindow || !chatBody) {
    return;
  }

  /* =================================================
           BOT ANSWERS
        ================================================= */

  const botAnswers = {
    product: `

                <p>
                    আমাদের ওয়েবসাইটে বিভিন্ন ধরনের
                    পণ্য পাওয়া যায়। 🛍️
                </p>

                <p>
                    যেমন:
                </p>

                <p>
                    👕 Men's Fashion<br>
                    👜 Bags & Accessories<br>
                    👟 Footwear<br>
                    ⌚ Watches<br>
                    এবং আরও অনেক পণ্য।
                </p>

            `,

    price: `

                <p>
                    প্রতিটি পণ্যের বর্তমান দাম
                    Product Card-এর মধ্যেই দেওয়া থাকে। 💰
                </p>

                <p>
                    কোনো পণ্যের বিস্তারিত জানতে
                    <strong>
                        View Details
                    </strong>
                    অথবা Product Card-এ ক্লিক করুন।
                </p>

            `,

    delivery: `

                <p>
                    🚚 আমরা সারা বাংলাদেশে
                    Delivery দিয়ে থাকি।
                </p>

                <p>
                    Delivery charge আপনার
                    location অনুযায়ী পরিবর্তিত হতে পারে।
                </p>

            `,

    cod: `

                <p>
                    💵 হ্যাঁ, আমাদের
                    <strong>
                        Cash on Delivery
                    </strong>
                    সুবিধা রয়েছে।
                </p>

                <p>
                    অর্ডার করার সময় Payment Method
                    থেকে Cash on Delivery নির্বাচন করতে পারবেন।
                </p>

            `,

    order: `

                <p>
                    🛒 অর্ডার করা খুব সহজ।
                </p>

                <p>
                    1️⃣ পছন্দের Product নির্বাচন করুন।<br>
                    2️⃣ <strong>Order Now</strong> চাপুন।<br>
                    3️⃣ আপনার নাম, ফোন ও ঠিকানা দিন।<br>
                    4️⃣ Confirm Order করুন।
                </p>

            `,

    return: `

                <p>
                    🔄 আমাদের Return / Exchange policy
                    পণ্যের ধরন অনুযায়ী প্রযোজ্য হতে পারে।
                </p>

                <p>
                    বিস্তারিত জানতে আমাদের
                    Customer Support-এর সাথে যোগাযোগ করুন।
                </p>

            `,

    payment: `

                <p>
                    💳 আমরা বিভিন্ন Payment Method
                    support করতে পারি।
                </p>

                <p>
                    যেমন:
                    Cash on Delivery,
                    bKash,
                    Nagad ইত্যাদি।
                </p>

            `,

    contact: `

                <p>
                    📞 আমাদের সাথে যোগাযোগ করতে
                    ওয়েবসাইটের
                    <strong>
                        যোগাযোগ
                    </strong>
                    section ব্যবহার করুন।
                </p>

                <p>
                    আপনার প্রয়োজনীয় তথ্য দিয়ে
                    আমরা আপনাকে সাহায্য করার চেষ্টা করব।
                </p>

            `,
  };

  /* =================================================
           OPEN CHAT
        ================================================= */

  chatHead.addEventListener("click", () => {
    chatWindow.classList.add("ct-open");

    if (notification) {
      notification.style.display = "none";
    }

    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
  });

  /* =================================================
           CLOSE CHAT
        ================================================= */

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWindow.classList.remove("ct-open");
    });
  }

  /* =================================================
           USER MESSAGE
        ================================================= */

  function addUserMessage(text) {
    const message = document.createElement("div");

    message.className = "ct-message ct-user-message";

    message.innerHTML = `

                <div
                    class="ct-message-content"
                >

                    <div
                        class="ct-message-bubble"
                    >

                        <p>
                            ${text}
                        </p>

                    </div>


                    <span
                        class="ct-message-time"
                    >
                        Just now
                    </span>

                </div>

            `;

    chatBody.insertBefore(message, typingMessage);

    scrollChat();
  }

  /* =================================================
           BOT MESSAGE
        ================================================= */

  function addBotMessage(answer) {
    const message = document.createElement("div");

    message.className = "ct-message ct-bot-message";

    message.innerHTML = `

                <div
                    class="ct-message-avatar"
                >
                    🤖
                </div>


                <div
                    class="ct-message-content"
                >

                    <div
                        class="ct-message-bubble"
                    >

                        ${answer}

                    </div>


                    <span
                        class="ct-message-time"
                    >
                        Just now
                    </span>

                </div>

            `;

    chatBody.insertBefore(message, typingMessage);

    scrollChat();
  }

  /* =================================================
           TYPING
        ================================================= */

  function showTyping() {
    if (!typingMessage) return;

    typingMessage.style.display = "flex";

    scrollChat();
  }

  function hideTyping() {
    if (!typingMessage) return;

    typingMessage.style.display = "none";
  }

  /* =================================================
           CHAT SCROLL
        ================================================= */

  function scrollChat() {
    setTimeout(() => {
      chatBody.scrollTo({
        top: chatBody.scrollHeight,

        behavior: "smooth",
      });
    }, 50);
  }

  /* =================================================
           QUICK QUESTIONS
        ================================================= */

  if (quickQuestions) {
    quickQuestions.addEventListener("click", (event) => {
      const button = event.target.closest("button");

      if (!button) return;

      const questionType = button.dataset.question;

      const questionText = button.textContent.trim();

      const answer = botAnswers[questionType];

      if (!answer) return;

      addUserMessage(questionText);

      const buttons = quickQuestions.querySelectorAll("button");

      buttons.forEach((btn) => {
        btn.disabled = true;

        btn.style.opacity = "0.5";
      });

      setTimeout(() => {
        showTyping();
      }, 250);

      setTimeout(() => {
        hideTyping();

        addBotMessage(answer);

        buttons.forEach((btn) => {
          btn.disabled = false;

          btn.style.opacity = "1";
        });
      }, 1100);
    });
  }

  /* =================================================
           RESET CHAT
        ================================================= */

  if (resetChat) {
    resetChat.addEventListener("click", () => {
      const messages = chatBody.querySelectorAll(
        ".ct-message:not(.ct-typing-message)",
      );

      messages.forEach((message, index) => {
        if (index > 0) {
          message.remove();
        }
      });

      scrollChat();
    });
  }
});











function addQuickViewWhatsAppButton(product, targetContainer) {
    if (!product || !targetContainer) return;

    // CSS একবারই যোগ হবে
    if (!document.getElementById("quickViewWhatsAppStyle")) {
        const style = document.createElement("style");
        style.id = "quickViewWhatsAppStyle";

        style.textContent = `
            .quick-view-wa-btn {
                display: flex;
                align-items: center;
                gap: 16px;
                width: 100%;
                box-sizing: border-box;
                margin-top: 22px;
                padding: 5px 24px;
                border: none;
                border-radius: 22px;
                color: #fff;
                text-decoration: none;
                background: linear-gradient(110deg, #25D366, #078c50);
                box-shadow: 0 12px 28px rgba(37, 211, 102, .20);
                transition: transform .25s ease, box-shadow .25s ease;
                animation: quickWaEnter .5s ease both;
            }

            .quick-view-wa-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 16px 32px rgba(37, 211, 102, .30);
            }

            .quick-view-wa-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255,255,255,.45);
                border-radius: 50%;
                background: rgba(255,255,255,.15);
                font-size: 30px;
            }

            .quick-view-wa-text {
                display: flex;
                flex-direction: column;
                gap: 5px;
                flex: 1;
            }

            .quick-view-wa-text strong {
                font-size: 18px;
                line-height: 1.5;
            }

            .quick-view-wa-text small {
                font-size: 14px;
                opacity: .9;
            }

            .quick-view-wa-arrow {
                font-size: 30px;
                transition: transform .25s ease;
            }

            .quick-view-wa-btn:hover .quick-view-wa-arrow {
                transform: translate(4px, -4px);
            }

            @keyframes quickWaEnter {
                from { opacity: 0; transform: translateY(12px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 480px) {
                .quick-view-wa-btn {
                    padding: 13px;
                    gap: 10px;
                    border-radius: 16px;
                }

                .quick-view-wa-icon {
                    width: 42px;
                    height: 42px;
                    font-size: 24px;
                }

                .quick-view-wa-text strong { font-size: 14px; }
                .quick-view-wa-text small { font-size: 12px; }
                .quick-view-wa-arrow { font-size: 22px; }
            }

            @media (prefers-reduced-motion: reduce) {
                .quick-view-wa-btn { animation: none; transition: none; }
            }
        `;

        document.head.appendChild(style);
    }

    // একই Popup-এ পুরোনো বাটন থাকলে সরাবে
    targetContainer.querySelector(".quick-view-wa-btn")?.remove();

    const whatsappNumber = "8801XXXXXXXXX"; // নিজের WhatsApp নম্বর বসাও

    const message =
        `আমি এই প্রোডাক্টটি সম্পর্কে জানতে চাই:\n` +
        `প্রোডাক্ট: ${product.name}\n` +
        `দাম: ${product.price} টাকা`;

    const button = document.createElement("a");
    button.className = "quick-view-wa-btn";
    button.href =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.innerHTML = `
        <span class="quick-view-wa-icon">
            <i class="fab fa-whatsapp"></i>
        </span>
        <span class="quick-view-wa-text">
            <strong>WhatsApp-এ মেসেজ দিন</strong>
            <small>প্রোডাক্ট সম্পর্কে জানতে</small>
        </span>
        <span class="quick-view-wa-arrow">↗</span>
    `;

    // Product Details-এর ভেতরে বাটন যোগ করবে
    targetContainer.appendChild(button);
}
