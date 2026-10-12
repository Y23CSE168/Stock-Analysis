/* =====================================================
   GIFTLY - MAIN JAVASCRIPT
   ===================================================== */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Birthday Gift Hamper",
        price: 799,
        category: "Birthday",
        icon: "🎁",
        rating: 4.8
    },

    {
        id: 2,
        name: "Rose Bouquet",
        price: 599,
        category: "Anniversary",
        icon: "🌹",
        rating: 4.7
    },

    {
        id: 3,
        name: "Personalized Mug",
        price: 399,
        category: "Birthday",
        icon: "☕",
        rating: 4.6
    },

    {
        id: 4,
        name: "Teddy Bear",
        price: 699,
        category: "Birthday",
        icon: "🧸",
        rating: 4.9
    },

    {
        id: 5,
        name: "Wedding Gift Box",
        price: 1299,
        category: "Wedding",
        icon: "💍",
        rating: 4.8
    },

    {
        id: 6,
        name: "Graduation Gift",
        price: 899,
        category: "Graduation",
        icon: "🎓",
        rating: 4.7
    },

    {
        id: 7,
        name: "Baby Gift Basket",
        price: 999,
        category: "Baby",
        icon: "👶",
        rating: 4.8
    },

    {
        id: 8,
        name: "Chocolate Gift Box",
        price: 499,
        category: "Anniversary",
        icon: "🍫",
        rating: 4.5
    },

    {
        id: 9,
        name: "Love Gift Box",
        price: 1099,
        category: "Anniversary",
        icon: "💝",
        rating: 4.9
    },

    {
        id: 10,
        name: "Cute Soft Toy",
        price: 599,
        category: "Baby",
        icon: "🧸",
        rating: 4.6
    },

    {
        id: 11,
        name: "Achievement Frame",
        price: 749,
        category: "Graduation",
        icon: "🏆",
        rating: 4.7
    },

    {
        id: 12,
        name: "Wedding Hamper",
        price: 1499,
        category: "Wedding",
        icon: "🎀",
        rating: 4.9
    }

];


/* ================= STORAGE ================= */

let cart =
    JSON.parse(
        localStorage.getItem("giftlyCart")
    ) || [];

let wishlist =
    JSON.parse(
        localStorage.getItem("giftlyWishlist")
    ) || [];


/* ================= ELEMENTS ================= */

const productsContainer =
    document.getElementById("productsContainer");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(productList) {

    if (!productsContainer) {
        return;
    }

    productsContainer.innerHTML = "";


    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
            ">
                😔 No gifts found.
            </p>
        `;

        return;
    }


    productList.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);


        const productCard =
            document.createElement("div");

        productCard.classList.add(
            "product-card"
        );


        productCard.innerHTML = `

            <div class="product-image">

                ${product.icon}

                <button
                    class="wishlist-button"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "❤️" : "♡"}
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;


        productsContainer.appendChild(
            productCard
        );

    });

}


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        "🎁 Product added to cart!"
    );
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "giftlyCart",
        JSON.stringify(cart)
    );

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;
}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

    } else {

        wishlist.push(id);

    }


    localStorage.setItem(
        "giftlyWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    displayProducts(products);
}


/* ================= WISHLIST COUNT ================= */

function updateWishlistCount() {

    if (!wishlistCount) {
        return;
    }


    wishlistCount.textContent =
        wishlist.length;
}


/* ================= SEARCH ================= */

function searchProducts() {

    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

            ||

            product.category
                .toLowerCase()
                .includes(keyword)

        );


    displayProducts(filtered);
}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


/* ================= CATEGORY ================= */

document
    .querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;


                const filtered =
                    products.filter(
                        product =>
                            product.category === category
                    );


                displayProducts(filtered);


                document
                    .getElementById("products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* ================= SORT ================= */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            let sorted =
                [...products];


            if (
                sortSelect.value === "low"
            ) {

                sorted.sort(
                    (a, b) =>
                        a.price - b.price
                );

            }


            if (
                sortSelect.value === "high"
            ) {

                sorted.sort(
                    (a, b) =>
                        b.price - a.price
                );

            }


            displayProducts(sorted);

        }
    );

}


/* ================= CART MODAL ================= */

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        () => {

            renderCart();

            cartModal.style.display =
                "flex";

        }
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        () => {

            cartModal.style.display =
                "none";

        }
    );

}


/* ================= RENDER CART ================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:30px;
            ">
                🛒 Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        const div =
            document.createElement("div");


        div.style.display = "flex";
        div.style.justifyContent =
            "space-between";
        div.style.alignItems =
            "center";
        div.style.padding =
            "15px 0";
        div.style.borderBottom =
            "1px solid #eee";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.icon}
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price}
                    ×
                    ${item.quantity}
                </p>

            </div>


            <div>

                <button
                    onclick="changeQuantity(
                        ${item.id},
                        -1
                    )"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(
                        ${item.id},
                        1
                    )"
                >
                    +
                </button>

                <button
                    onclick="removeFromCart(
                        ${item.id}
                    )"
                    style="
                        margin-left:10px;
                    "
                >
                    🗑️
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    cartTotal.textContent =
        `₹${total}`;
}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveCart();

    updateCartCount();

    renderCart();
}


/* ================= REMOVE CART ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            product =>
                product.id !== id
        );


    saveCart();

    updateCartCount();

    renderCart();
}


/* ================= WISHLIST MODAL ================= */

const wishlistBtn =
    document.getElementById(
        "wishlistBtn"
    );

const wishlistModal =
    document.getElementById(
        "wishlistModal"
    );

const closeWishlist =
    document.getElementById(
        "closeWishlist"
    );


if (wishlistBtn) {

    wishlistBtn.addEventListener(
        "click",
        () => {

            renderWishlist();

            wishlistModal.style.display =
                "flex";

        }
    );

}


if (closeWishlist) {

    closeWishlist.addEventListener(
        "click",
        () => {

            wishlistModal.style.display =
                "none";

        }
    );

}


/* ================= RENDER WISHLIST ================= */

function renderWishlist() {

    const wishlistItems =
        document.getElementById(
            "wishlistItems"
        );


    if (!wishlistItems) {
        return;
    }


    wishlistItems.innerHTML = "";


    const wishlistProducts =
        products.filter(
            product =>
                wishlist.includes(product.id)
        );


    if (wishlistProducts.length === 0) {

        wishlistItems.innerHTML = `
            <p style="
                text-align:center;
                padding:30px;
            ">
                ❤️ Your wishlist is empty.
            </p>
        `;

        return;
    }


    wishlistProducts.forEach(product => {

        const div =
            document.createElement("div");


        div.style.padding = "15px 0";

        div.style.borderBottom =
            "1px solid #eee";


        div.innerHTML = `

            <strong>
                ${product.icon}
                ${product.name}
            </strong>

            <p>
                ₹${product.price}
            </p>

            <button
                onclick="addToCart(${product.id})"
                style="
                    margin-top:8px;
                    padding:8px 15px;
                    border:none;
                    border-radius:6px;
                    background:#e85d75;
                    color:white;
                    cursor:pointer;
                "
            >
                Add to Cart
            </button>

        `;


        wishlistItems.appendChild(div);

    });

}


/* ================= INITIAL LOAD ================= */

displayProducts(products);

updateCartCount();

updateWishlistCount();