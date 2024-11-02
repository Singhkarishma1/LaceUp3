let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        // If it exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add it to the cart
        cart.push(product);
    }

    // Update the cart count display
    updateCartCount();
    
    // Optional: Show alert
    
}

// Function to update the cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems; // Update the cart count
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});


function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
    };

    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart.`);
    updateCartCount();
}


// Retrieve cart data from local storage
let carti = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear the container
    let totalPrice = 0; // Initialize total price

    // Iterate over cart items and create elements
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name} - $${item.price.toFixed(2)} (Qty: ${item.quantity})</h3>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity; // Update total price
    });

    totalPriceDisplay.innerText = totalPrice.toFixed(2); // Display total price
}

// Event listener for the place order button
document.getElementById('place-order').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Order placed successfully!');
        cart = []; // Clear cart after order
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        renderCartItems(); // Refresh cart display
    }
});

// Initial rendering of cart items
renderCartItems();
