
let cart = [];


async function fetchProducts() {
const res = await fetch('https://mocki.io/v1/539c3a78-25e4-4fc6-8b35-6f1550d2b7c6');
    //const products1 = await res1.json();
    const products = await res.json();
    console.log(products);
    
    
    const container = document.getElementById('products-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button id="cartButton" class="button-18" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
}

function addToCart(id, title, price) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({id, title, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert('Added to Cart!');
}

function renderCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>$${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button style="float:right" onclick="updateQuantity(${item.id}, -1)">🗑️</button>
        `;
        container.appendChild(cartItem);
    });

    if (cart.length === 0) {
        container.innerHTML = '<h2>Cart is empty!</h2>';
    }

    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}
function updateQuantity(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(c => c.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

if (document.getElementById('products-container')) {
    fetchProducts();
}

if (document.getElementById('cart-container')) {
    renderCart();
}


document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartButton");
    const cartCanvas = document.getElementById("cartCanvas");
    const closeCart = document.getElementById("closeCart");
    const overlay = document.getElementById("overlay");

    // Open cart
    cartButton.addEventListener("click", () => {
        cartCanvas.classList.add("active");
        overlay.classList.add("active");
    });

    // Close cart
    closeCart.addEventListener("click", () => {
        cartCanvas.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Close cart on overlay click
    overlay.addEventListener("click", () => {
        cartCanvas.classList.remove("active");
        overlay.classList.remove("active");
    });
});

