
/* =====================================
   CHAIRLY - WEBSITE FUNCTIONALITY
===================================== */

// Chair product database

const products = [
    {
        id: 1,
        name: "The Executive",
        category: "Office",
        price: 299,
        tag: "BESTSELLER",
        description: "Ergonomic comfort for productive workdays.",
        image: "https://images.unsplash.com/photo-1505843490701-5be5d0b0d9b1?w=700&q=85"
    },
    {
        id: 2,
        name: "The Gamer Pro",
        category: "Gaming",
        price: 399,
        tag: "POPULAR",
        description: "Premium support for your gaming setup.",
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=85"
    },
    {
        id: 3,
        name: "The Nordic",
        category: "Dining",
        price: 149,
        tag: "MINIMAL",
        description: "Simple elegance for your dining space.",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=700&q=85"
    },
    {
        id: 4,
        name: "The Celebration",
        category: "Event",
        price: 99,
        tag: "EVENT PICK",
        description: "Elegant seating for special occasions.",
        image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=700&q=85"
    },
    {
        id: 5,
        name: "The Lounge",
        category: "Lounge",
        price: 349,
        tag: "LUXURY",
        description: "Relax in timeless designer comfort.",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=700&q=85"
    },
    {
        id: 6,
        name: "The Modernist",
        category: "Office",
        price: 249,
        tag: "NEW ARRIVAL",
        description: "Contemporary style for modern offices.",
        image: "https://images.unsplash.com/photo-1598300053653-6e6d4c0d5c35?w=700&q=85"
    },
    {
        id: 7,
        name: "The Comfort Elite",
        category: "Gaming",
        price: 449,
        tag: "PREMIUM",
        description: "A comfortable seat for long sessions.",
        image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=700&q=85"
    },
    {
        id: 8,
        name: "The Classic",
        category: "Dining",
        price: 179,
        tag: "CLASSIC",
        description: "A timeless chair for everyday dining.",
        image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=700&q=85"
    },
    {
        id: 9,
        name: "The Velvet",
        category: "Lounge",
        price: 399,
        tag: "SIGNATURE",
        description: "A statement piece with luxurious style.",
        image: "https://images.unsplash.com/photo-1598300053653-6e6d4c0d5c35?w=700&q=85"
    }
];

// Elements

const productGrid = document.getElementById("productGrid");
const filterBar = document.getElementById("filterBar");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const bookingModal = document.getElementById("bookingModal");
const toast = document.getElementById("toast");

let cart = [];

// Display products

function displayProducts(category = "All") {

    const filteredProducts = category === "All"
        ? products
        : products.filter(product => product.category === category);

    productGrid.innerHTML = "";

    filteredProducts.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/600x450/f0ece3/75664f?text=CHAIRLY'">
                <span class="product-tag">${product.tag}</span>
            </div>

            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>

                <div class="product-bottom">
                    <div class="price">
                        ₹${product.price}
                        <small>/ day</small>
                    </div>

                    <button class="add-btn" data-id="${product.id}">
                        + Add to Bag
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// Category filtering

filterBar.addEventListener("click", function(event) {

    const button = event.target.closest(".filter-btn");

    if (!button) return;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    displayProducts(button.dataset.filter);
});

// Category cards also filter products

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", function() {

        const category = this.dataset.category;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.filter === category
            );
        });

        displayProducts(category);
    });

});

// Add products to bag

productGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    const id = Number(button.dataset.id);

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    showToast(product.name + " added to your rental bag!");
});

// Update cart

function updateCart() {

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    cartTotal.textContent = "₹" + totalPrice.toLocaleString("en-IN");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is waiting for something comfortable.
            </p>
        `;

        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">

            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} / day × ${item.quantity}</p>
            </div>

            <button class="remove-item" data-id="${item.id}">
                Remove
            </button>
        </div>
    `).join("");

}

// Remove products

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest(".remove-item");

    if (!button) return;

    const id = Number(button.dataset.id);

    cart = cart.filter(item => item.id !== id);

    updateCart();

    showToast("Chair removed from bag.");
});

// Open cart

function openCart() {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Close cart

function closeCart() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
}

cartButton.addEventListener("click", openCart);

document.getElementById("closeCart").addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

// Booking modal

document.getElementById("checkoutButton").addEventListener("click", function() {

    if (cart.length === 0) {
        showToast("Please add a chair before booking.");
        return;
    }

    closeCart();

    bookingModal.classList.add("show");

    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    document.getElementById("bookingDate").min = localDate;
    document.getElementById("bookingDate").value = localDate;

    document.body.style.overflow = "hidden";

});

function closeBooking() {
    bookingModal.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("closeBooking").addEventListener(
    "click", closeBooking
);

// Booking form submission

document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        showToast("Your rental bag is empty.");
        closeBooking();
        return;
    }

    const name = document.getElementById("bookingName").value;
    const email = document.getElementById("bookingEmail").value;
    const date = document.getElementById("bookingDate").value;
    const duration = Number(
        document.getElementById("rentalDuration").value
    );

    const address = document.getElementById("bookingAddress").value;

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity * duration,
        0
    );

    const bookingReference =
        "CH" + Date.now().toString().slice(-7);

    const booking = {
        reference: bookingReference,
        name,
        email,
        date,
        duration,
        address,
        chairs: cart.map(item => ({
            name: item.name,
            quantity: item.quantity
        })),
        estimatedTotal: total
    };

    // Save demo booking in browser storage

    try {
        const oldBookings = JSON.parse(
            localStorage.getItem("chairlyBookings") || "[]"
        );

        oldBookings.push(booking);

        localStorage.setItem(
            "chairlyBookings",
            JSON.stringify(oldBookings)
        );

    } catch (error) {
        console.log("Browser storage unavailable.");
    }

    alert(
        "Thank you, " + name + "!\n\n" +
        "Your demo booking has been created.\n" +
        "Reference: " + bookingReference + "\n" +
        "Rental duration: " + duration + " days\n" +
        "Estimated total: ₹" + total.toLocaleString("en-IN") +
        "\n\nThis is a frontend demonstration, not a real reservation."
    );

    cart = [];

    updateCart();

    this.reset();

    closeBooking();

});

// Contact form

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value;

    alert(
        "Thank you, " + name +
        "! Your demo message has been received in this browser session. " +
        "No email has been sent."
    );

    this.reset();

});

// Mobile menu

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "×" : "☰";

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });

});

// Toast message

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}

// Close booking when clicking outside

bookingModal.addEventListener("click", function(event) {

    if (event.target === bookingModal) {
        closeBooking();
    }

});

// Initial product display

displayProducts("All");

updateCart();
