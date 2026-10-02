/* =====================================================
   CRAFT TECH BD - COMPLETE SCRIPT
===================================================== */


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
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        description:
            "Premium wireless headphones with clear sound, deep bass and long battery life."
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 3999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        description:
            "A stylish smart watch with fitness tracking, notifications and modern features."
    },

    {
        id: 3,
        name: "Premium T-Shirt",
        category: "fashion",
        price: 899,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
        description:
            "Comfortable premium cotton t-shirt suitable for everyday casual wear."
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "shoes",
        price: 2999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        description:
            "Modern classic sneakers designed for comfort and everyday performance."
    },

    {
        id: 5,
        name: "Leather Backpack",
        category: "accessories",
        price: 1899,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
        description:
            "Premium backpack with a spacious interior and elegant design."
    },

    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 1299,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
        description:
            "Stylish sunglasses with a modern frame and UV protection."
    },

    {
        id: 7,
        name: "Denim Jacket",
        category: "fashion",
        price: 2199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
        description:
            "Classic denim jacket with a timeless look and comfortable fit."
    },

    {
        id: 8,
        name: "Running Shoes",
        category: "shoes",
        price: 3499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80",
        description:
            "Lightweight running shoes built for comfort and active lifestyles."
    }
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

let cart = JSON.parse(
    localStorage.getItem("shopnest-cart")
) || [];

let wishlist = JSON.parse(
    localStorage.getItem("shopnest-wishlist")
) || [];


/* =====================================================
   FLASH SALE PRODUCTS
   Static HTML cards automatically become products.
===================================================== */

const flashProducts = [];


function initFlashProducts() {

    const cards =
        document.querySelectorAll(".flash-product-card");

    cards.forEach((card, index) => {

        const id = 101 + index;

        const name =
            card.querySelector("h3")?.textContent.trim()
            || `Flash Product ${index + 1}`;

        const category =
            card.querySelector(".product-category")
                ?.textContent.trim()
            || "Flash Sale";

        const image =
            card.querySelector("img")?.src || "";

        const priceText =
            card.querySelector(".product-price strong")
                ?.textContent || "0";

        const oldPriceText =
            card.querySelector(".product-price del")
                ?.textContent || "0";

        const price =
            Number(
                priceText.replace(/[^0-9.]/g, "")
            ) || 0;

        const oldPrice =
            Number(
                oldPriceText.replace(/[^0-9.]/g, "")
            ) || 0;

        const reviewText =
            card.querySelector(".product-rating span")
                ?.textContent || "";

        const reviews =
            Number(
                reviewText.replace(/[^0-9]/g, "")
            ) || 0;


        const product = {

            id: id,

            name: name,

            category: category,

            price: price,

            oldPrice: oldPrice,

            rating: 5,

            reviews: reviews,

            image: image,

            description:
                `${name} — premium quality product available at a special flash-sale price.`

        };


        flashProducts.push(product);


        /* Wishlist */

        const wishlistButton =
            card.querySelector(".wishlist-btn");

        if (wishlistButton) {

            wishlistButton.dataset.id = id;

            wishlistButton.classList.add(
                "wishlist-product"
            );

            updateFlashWishlistButton(
                wishlistButton,
                id
            );
        }


        /* Quick View */

        const quickViewButton =
            card.querySelector(".quick-view");

        if (quickViewButton) {

            quickViewButton.dataset.id = id;

        }


        /* Cart Button */

        const cartButton =
            Array.from(
                card.querySelectorAll(".sale-cart-btn")
            ).find(
                button =>
                    !button.classList.contains(
                        "details_btn"
                    )
            );


        if (cartButton) {

            cartButton.dataset.id = id;

            cartButton.classList.add(
                "add-cart"
            );

        }

    });

}


/* =====================================================
   FIND PRODUCT
===================================================== */

function findProductById(id) {

    return (
        products.find(
            product => product.id === id
        ) ||

        flashProducts.find(
            product => product.id === id
        )
    );

}


/* =====================================================
   PRICE FORMAT
===================================================== */

function formatPrice(price) {

    return (
        "৳" +
        Number(price).toLocaleString("en-BD")
    );

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "shopnest-cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   SAVE WISHLIST
===================================================== */

function saveWishlist() {

    localStorage.setItem(
        "shopnest-wishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
   STAR RATING
===================================================== */

function createStars(rating) {

    let stars = "";

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (
            i <= Math.floor(rating)
        ) {

            stars +=
                `<i class="fa-solid fa-star"></i>`;

        } else {

            stars +=
                `<i class="fa-regular fa-star"></i>`;

        }

    }

    return stars;

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(
    productList = products
) {

    if (!productGrid) return;


    productGrid.innerHTML = "";


    if (
        productList.length === 0
    ) {

        productGrid.innerHTML = `

            <div
                class="empty-cart"
                style="grid-column:1/-1;"
            >

                <i class="fa-solid fa-box-open"></i>

                <h3>No Products Found</h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    productList.forEach(
        (product, index) => {

            const isLiked =
                wishlist.includes(
                    product.id
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card reveal";


            card.style.transitionDelay =
                `${index * 70}ms`;


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >


                    <div class="product-actions">

                        <button
                            class="wishlist-product ${
                                isLiked
                                    ? "liked"
                                    : ""
                            }"
                            data-id="${product.id}"
                            title="Wishlist"
                        >

                            <i
                                class="fa-${
                                    isLiked
                                        ? "solid"
                                        : "regular"
                                } fa-heart"
                            ></i>

                        </button>


                        <button
                            class="quick-view"
                            data-id="${product.id}"
                            title="Quick View"
                        >

                            <i
                                class="fa-solid fa-eye"
                            ></i>

                        </button>

                    </div>

                </div>


                <div class="product-info">

                    <span class="product-category">

                        ${product.category}

                    </span>


                    <h3>
                        ${product.name}
                    </h3>


                    <div class="product-rating">

                        ${createStars(
                            product.rating
                        )}

                        <span>
                            ${product.rating}
                        </span>

                    </div>


                    <div class="product-bottom">

                        <span class="product-price">

                            ${formatPrice(
                                product.price
                            )}

                        </span>


                        <button
                            class="add-cart"
                            data-id="${product.id}"
                            title="Add to cart"
                        >

                            <i
                                class="fa-solid fa-cart-plus"
                            ></i>

                        </button>

                    </div>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );


    observeRevealElements();

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    const product =
        findProductById(id);


    if (!product) {

        console.warn(
            "Product not found:",
            id
        );

        return;

    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: id,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    showToast(
        "Product added to cart"
    );

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    renderCart();

    showToast(
        "Product removed"
    );

}


/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

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

    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i
                    class="fa-solid fa-cart-shopping"
                ></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products
                    to get started.
                </p>

            </div>

        `;


        updateCartCount();


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(0);

        }


        return;

    }


    let total = 0;


    cart.forEach(item => {

        const product =
            findProductById(
                item.id
            );


        if (!product) return;


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement(
                "div"
            );


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div>

                <h4>
                    ${product.name}
                </h4>


                <span
                    class="cart-item-price"
                >
                    ${formatPrice(
                        product.price
                    )}
                </span>


                <div
                    class="quantity-controls"
                >

                    <button
                        class="quantity-minus"
                        data-id="${product.id}"
                    >
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


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

                <i
                    class="fa-solid fa-trash"
                ></i>

            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(total);

    }


    updateCartCount();

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    if (!cartCount) return;


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        count;

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(id) {

    const product =
        findProductById(id);


    if (!product) {

        console.warn(
            "Wishlist product not found:",
            id
        );

        return;

    }


    if (
        wishlist.includes(id)
    ) {

        wishlist =
            wishlist.filter(
                productId =>
                    productId !== id
            );


        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(id);


        showToast(
            "Added to wishlist"
        );

    }


    saveWishlist();

    updateWishlistCount();

    renderProducts(
        getCurrentProducts()
    );


    document
        .querySelectorAll(
            ".flash-product-card .wishlist-btn"
        )
        .forEach(button => {

            updateFlashWishlistButton(
                button,
                Number(
                    button.dataset.id
                )
            );

        });

}


/* =====================================================
   FLASH WISHLIST BUTTON
===================================================== */

function updateFlashWishlistButton(
    button,
    id
) {

    if (!button) return;


    const liked =
        wishlist.includes(id);


    button.classList.toggle(
        "liked",
        liked
    );


    button.textContent =
        liked ? "♥" : "♡";

}


/* =====================================================
   WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    if (!wishlistCount) return;


    wishlistCount.textContent =
        wishlist.length;

}


/* =====================================================
   CURRENT PRODUCTS
===================================================== */

function getCurrentProducts() {

    const activeFilter =
        document.querySelector(
            ".filter-btn.active"
        );


    const filter =
        activeFilter?.dataset.filter
        || "all";


    let result =
        [...products];


    if (
        filter !== "all"
    ) {

        result =
            result.filter(
                product =>
                    product.category ===
                    filter
            );

    }


    const searchTerm =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    if (searchTerm) {

        result =
            result.filter(
                product =>

                    product.name
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    product.category
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )
            );

    }


    return result;

}


/* =====================================================
   FILTER BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".filter-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                renderProducts(
                    getCurrentProducts()
                );

            }
        );

    });


/* =====================================================
   CATEGORY CARDS
===================================================== */

document
    .querySelectorAll(
        ".category-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );


                        if (
                            btn.dataset.filter ===
                            category
                        ) {

                            btn.classList.add(
                                "active"
                            );

                        }

                    });


                renderProducts(
                    getCurrentProducts()
                );


                const productsSection =
                    document.getElementById(
                        "products"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =====================================================
   SEARCH
===================================================== */

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "active"
            );


            setTimeout(
                () => {

                    searchInput.focus();

                },
                300
            );

        }
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        () => {

            searchOverlay.classList.remove(
                "active"
            );

        }
    );

}


if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                searchOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderProducts(
                getCurrentProducts()
            );

        }
    );

}


/* =====================================================
   SORT PRODUCTS
===================================================== */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            let result =
                getCurrentProducts();


            const sort =
                sortSelect.value;


            if (sort === "low") {

                result.sort(
                    (a, b) =>
                        a.price - b.price
                );

            }


            if (sort === "high") {

                result.sort(
                    (a, b) =>
                        b.price - a.price
                );

            }


            if (sort === "name") {

                result.sort(
                    (a, b) =>
                        a.name.localeCompare(
                            b.name
                        )
                );

            }


            renderProducts(result);

        }
    );

}


/* =====================================================
   UNIVERSAL PRODUCT BUTTON EVENTS

   Works for:
   - Dynamic products
   - Flash sale products
   - Wishlist
   - Quick View
   - Add to cart
===================================================== */

document.addEventListener(
    "click",
    event => {

        const cartButton =
            event.target.closest(
                ".add-cart, .sale-cart-btn:not(.details_btn)"
            );


        const wishlistButton =
            event.target.closest(
                ".wishlist-product, .wishlist-btn"
            );


        const quickViewButton =
            event.target.closest(
                ".quick-view"
            );


        /* Add to Cart */

        if (cartButton) {

            const id =
                Number(
                    cartButton.dataset.id
                );


            if (
                !Number.isNaN(id)
            ) {

                addToCart(id);

            }


            return;

        }


        /* Wishlist */

        if (wishlistButton) {

            const id =
                Number(
                    wishlistButton.dataset.id
                );


            if (
                !Number.isNaN(id)
            ) {

                toggleWishlist(id);

            }


            return;

        }


        /* Quick View */

        if (quickViewButton) {

            const id =
                Number(
                    quickViewButton.dataset.id
                );


            if (
                !Number.isNaN(id)
            ) {

                openProductModal(id);

            }

        }

    }
);


/* =====================================================
   QUICK VIEW MODAL
===================================================== */

function openProductModal(id) {

    const product =
        findProductById(id);


    if (!product) {

        console.warn(
            "Quick View product not found:",
            id
        );

        return;

    }


    modalContent.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="modal-info">

                <span
                    class="product-category"
                >
                    ${product.category}
                </span>


                <h2>
                    ${product.name}
                </h2>


                <div
                    class="product-rating"
                >

                    ${createStars(
                        product.rating
                    )}

                    ${product.rating}

                </div>


                <div
                    class="modal-price"
                >
                    ${formatPrice(
                        product.price
                    )}
                </div>


                <p>
                    ${product.description}
                </p>


                <button
                    class="btn primary-btn modal-add-cart"
                    data-id="${product.id}"
                >

                    <i
                        class="fa-solid fa-cart-plus"
                    ></i>

                    Add To Cart

                </button>

            </div>

        </div>

    `;


    productModal.classList.add(
        "active"
    );

}


/* =====================================================
   MODAL CLOSE
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        () => {

            productModal.classList.remove(
                "active"
            );

        }
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


if (modalContent) {

    modalContent.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".modal-add-cart"
                );


            if (!button) return;


            const id =
                Number(
                    button.dataset.id
                );


            addToCart(id);


            productModal.classList.remove(
                "active"
            );

        }
    );

}


/* =====================================================
   CART OPEN
===================================================== */

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        () => {

            cartSidebar.classList.add(
                "active"
            );

            cartOverlay.classList.add(
                "active"
            );

        }
    );

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartSidebar
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartSidebar
    );

}


/* =====================================================
   CART ITEM EVENTS
===================================================== */

if (cartItems) {

    cartItems.addEventListener(
        "click",
        event => {

            const plus =
                event.target.closest(
                    ".quantity-plus"
                );


            const minus =
                event.target.closest(
                    ".quantity-minus"
                );


            const remove =
                event.target.closest(
                    ".remove-item"
                );


            if (plus) {

                changeQuantity(
                    Number(
                        plus.dataset.id
                    ),
                    1
                );

            }


            if (minus) {

                changeQuantity(
                    Number(
                        minus.dataset.id
                    ),
                    -1
                );

            }


            if (remove) {

                removeFromCart(
                    Number(
                        remove.dataset.id
                    )
                );

            }

        }
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (
                cart.length === 0
            ) {

                showToast(
                    "Your cart is empty"
                );

                return;

            }


            showToast(
                "Checkout is ready for backend integration"
            );

        }
    );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    if (!toast || !toastMessage)
        return;


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            navbar.classList.toggle(
                "active"
            );


            const icon =
                menuBtn.querySelector(
                    "i"
                );


            if (
                navbar.classList.contains(
                    "active"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}


document
    .querySelectorAll(
        ".navbar a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove(
                    "active"
                );


                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    });


/* =====================================================
   SCROLL REVEAL
===================================================== */

let revealObserver;


function observeRevealElements() {

    if (
        !revealObserver
    ) {

        revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );

    }


    document
        .querySelectorAll(
            ".reveal:not(.show)"
        )
        .forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.getElementById(
                "header"
            );


        if (!header) return;


        if (
            window.scrollY > 30
        ) {

            header.style.boxShadow =
                "0 5px 25px rgba(0,0,0,0.08)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }
);


/* =====================================================
   FLASH SALE COUNTDOWN
===================================================== */

const saleEndTime =
    new Date().getTime() +
    (
        2 *
        24 *
        60 *
        60 *
        1000
    );


function updateSaleTimer() {

    const now =
        new Date().getTime();


    const distance =
        saleEndTime - now;


    const daysElement =
        document.getElementById(
            "sale-days"
        );


    const hoursElement =
        document.getElementById(
            "sale-hours"
        );


    const minutesElement =
        document.getElementById(
            "sale-minutes"
        );


    const secondsElement =
        document.getElementById(
            "sale-seconds"
        );


    if (
        distance <= 0
    ) {

        if (daysElement)
            daysElement.textContent = "00";

        if (hoursElement)
            hoursElement.textContent = "00";

        if (minutesElement)
            minutesElement.textContent = "00";

        if (secondsElement)
            secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    if (daysElement)
        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );


    if (hoursElement)
        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );


    if (minutesElement)
        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );


    if (secondsElement)
        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

}


updateSaleTimer();


setInterval(
    updateSaleTimer,
    1000
);


/* =====================================================
   VIEW ALL FLASH SALE
===================================================== */

const flashBtn =
    document.getElementById(
        "viewFlashBtn"
    );


const extraProducts =
    document.getElementById(
        "extraProducts"
    );


if (
    flashBtn &&
    extraProducts
) {

    flashBtn.addEventListener(
        "click",
        () => {

            extraProducts.classList.add(
                "show"
            );


            flashBtn.style.opacity =
                "0";


            flashBtn.style.transform =
                "translateY(20px)";


            setTimeout(
                () => {

                    flashBtn.style.display =
                        "none";

                },
                400
            );


            setTimeout(
                () => {

                    extraProducts.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                },
                300
            );

        }
    );

}


/* =====================================================
   FIZZY BUTTON ANIMATION
===================================================== */

const fizzyButtons =
    document.querySelectorAll(
        ".fizzyBtn"
    );


const fizzyColors = [

    "#6c4df6",
    "#5034d4",
    "#8c76ff",
    "#ff6b6b",
    "#ff8a8a",
    "#9b8aff",
    "#c4baff",
    "#6f5cff"

];


fizzyButtons.forEach(
    button => {

        const box =
            button.querySelector(
                ".fizzy-particles"
            );


        if (!box) return;


        let hover = false;

        let interval = null;


        function particle() {

            if (!hover) return;


            const p =
                document.createElement(
                    "i"
                );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const start =
                15 +
                Math.random() *
                20;


            const end =
                80 +
                Math.random() *
                120;


            const duration =
                0.8 +
                Math.random() *
                1.2;


            const color =
                fizzyColors[
                    Math.floor(
                        Math.random() *
                        fizzyColors.length
                    )
                ];


            const size =
                3 +
                Math.random() *
                7;


            p.className =
                "fizzy-particle";


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


            setTimeout(
                () => p.remove(),
                duration * 1000 + 100
            );

        }


        function start() {

            if (interval)
                return;


            for (
                let i = 0;
                i < 8;
                i++
            ) {

                setTimeout(
                    particle,
                    i * 40
                );

            }


            interval =
                setInterval(
                    particle,
                    30
                );

        }


        function stop() {

            clearInterval(
                interval
            );

            interval = null;

        }


        button.addEventListener(
            "mouseenter",
            () => {

                hover = true;

                start();

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                hover = false;

                stop();

            }
        );

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        )
            return;


        if (searchOverlay)
            searchOverlay.classList.remove(
                "active"
            );


        if (productModal)
            productModal.classList.remove(
                "active"
            );


        closeCartSidebar();

    }
);


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (themeToggle) {

    const themeIcon =
        themeToggle.querySelector(
            "i"
        );


    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );


        if (themeIcon) {

            themeIcon.classList.remove(
                "fa-moon"
            );


            themeIcon.classList.add(
                "fa-sun"
            );

        }

    }


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );


                if (themeIcon) {

                    themeIcon.classList.remove(
                        "fa-moon"
                    );

                    themeIcon.classList.add(
                        "fa-sun"
                    );

                }

            } else {

                localStorage.setItem(
                    "theme",
                    "light"
                );


                if (themeIcon) {

                    themeIcon.classList.remove(
                        "fa-sun"
                    );

                    themeIcon.classList.add(
                        "fa-moon"
                    );

                }

            }

        }
    );

}


/* =====================================================
   NEWSLETTER
===================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                document.getElementById(
                    "emailMsg"
                );


            const message =
                input
                    ? input.value.trim()
                    : "";


            if (!message)
                return;


            const email =
                "crafttechbd@gmail.com";


            window.location.href =
                `mailto:${email}?subject=New Message&body=${encodeURIComponent(message)}`;


            newsletterForm.reset();

        }
    );

}


/* =====================================================
   INITIALIZATION
===================================================== */

function init() {

    /*
       Flash products must be initialized
       before cart/wishlist rendering.
    */

    initFlashProducts();


    renderProducts();


    renderCart();


    updateWishlistCount();


    observeRevealElements();

}


init();


/* =====================================================
   CRAFT TECH BD CHATBOT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const chatHead =
            document.getElementById(
                "ctChatHead"
            );


        const chatWindow =
            document.getElementById(
                "ctChatWindow"
            );


        const closeChat =
            document.getElementById(
                "ctCloseChat"
            );


        const resetChat =
            document.getElementById(
                "ctResetChat"
            );


        const notification =
            document.getElementById(
                "ctNotification"
            );


        const chatBody =
            document.getElementById(
                "ctChatBody"
            );


        const quickQuestions =
            document.getElementById(
                "ctQuickQuestions"
            );


        const typingMessage =
            document.getElementById(
                "ctTypingMessage"
            );


        if (
            !chatHead ||
            !chatWindow ||
            !chatBody
        ) {

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

            `

        };


        /* =================================================
           OPEN CHAT
        ================================================= */

        chatHead.addEventListener(
            "click",
            () => {

                chatWindow.classList.add(
                    "ct-open"
                );


                if (notification) {

                    notification.style.display =
                        "none";

                }


                setTimeout(
                    () => {

                        chatBody.scrollTop =
                            chatBody.scrollHeight;

                    },
                    100
                );

            }
        );


        /* =================================================
           CLOSE CHAT
        ================================================= */

        if (closeChat) {

            closeChat.addEventListener(
                "click",
                () => {

                    chatWindow.classList.remove(
                        "ct-open"
                    );

                }
            );

        }


        /* =================================================
           USER MESSAGE
        ================================================= */

        function addUserMessage(
            text
        ) {

            const message =
                document.createElement(
                    "div"
                );


            message.className =
                "ct-message ct-user-message";


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


            chatBody.insertBefore(
                message,
                typingMessage
            );


            scrollChat();

        }


        /* =================================================
           BOT MESSAGE
        ================================================= */

        function addBotMessage(
            answer
        ) {

            const message =
                document.createElement(
                    "div"
                );


            message.className =
                "ct-message ct-bot-message";


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


            chatBody.insertBefore(
                message,
                typingMessage
            );


            scrollChat();

        }


        /* =================================================
           TYPING
        ================================================= */

        function showTyping() {

            if (!typingMessage)
                return;


            typingMessage.style.display =
                "flex";


            scrollChat();

        }


        function hideTyping() {

            if (!typingMessage)
                return;


            typingMessage.style.display =
                "none";

        }


        /* =================================================
           CHAT SCROLL
        ================================================= */

        function scrollChat() {

            setTimeout(
                () => {

                    chatBody.scrollTo({

                        top:
                            chatBody.scrollHeight,

                        behavior:
                            "smooth"

                    });

                },
                50
            );

        }


        /* =================================================
           QUICK QUESTIONS
        ================================================= */

        if (quickQuestions) {

            quickQuestions.addEventListener(
                "click",
                event => {

                    const button =
                        event.target.closest(
                            "button"
                        );


                    if (!button)
                        return;


                    const questionType =
                        button.dataset.question;


                    const questionText =
                        button.textContent.trim();


                    const answer =
                        botAnswers[
                            questionType
                        ];


                    if (!answer)
                        return;


                    addUserMessage(
                        questionText
                    );


                    const buttons =
                        quickQuestions.querySelectorAll(
                            "button"
                        );


                    buttons.forEach(
                        btn => {

                            btn.disabled =
                                true;

                            btn.style.opacity =
                                "0.5";

                        }
                    );


                    setTimeout(
                        () => {

                            showTyping();

                        },
                        250
                    );


                    setTimeout(
                        () => {

                            hideTyping();


                            addBotMessage(
                                answer
                            );


                            buttons.forEach(
                                btn => {

                                    btn.disabled =
                                        false;

                                    btn.style.opacity =
                                        "1";

                                }
                            );

                        },
                        1100
                    );

                }
            );

        }


        /* =================================================
           RESET CHAT
        ================================================= */

        if (resetChat) {

            resetChat.addEventListener(
                "click",
                () => {

                    const messages =
                        chatBody.querySelectorAll(
                            ".ct-message:not(.ct-typing-message)"
                        );


                    messages.forEach(
                        (
                            message,
                            index
                        ) => {

                            if (
                                index > 0
                            ) {

                                message.remove();

                            }

                        }
                    );


                    scrollChat();

                }
            );

        }

    }
);