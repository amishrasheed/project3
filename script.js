let cart = [];
let products = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/api/products') 
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    })
    .catch(error => console.error('Fetching error:', error));

    const viewCartButton = document.getElementById('view-cart');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', () => {
            window.location.href = 'cart.html'; 
        });
    }
});

function toggleDescription(productId) {
    const description = document.getElementById(`description-${productId}`);
    if (description) {
        description.style.display = description.style.display === 'block' ? 'none' : 'block';
    }
}

function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    const quantitySelect = document.getElementById(`quantity-${productId}`);
    const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;

    if (product) {
        const cartItem = cart.find(item => item._id === productId);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        console.log(cart); 
        alert('Product added to cart successfully!');
    }
    localStorage.setItem('cart', JSON.stringify(cart));

}




function viewCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartItemsDiv = document.getElementById('cart-items');

    cartItemsDiv.innerHTML = '';

    cart.forEach(product => { 
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <p>${product.name} - Quantity: ${product.quantity} - Total: $${(product.price * product.quantity).toFixed(2)}</p>
        `;
        itemDiv.innerHTML += `<button onclick="removeFromCart('${product._id}')">Remove from cart</button>`;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
    document.getElementById('checkout').addEventListener('click', checkout);

}

function removeFromCart(productId) {
    cart = cart.filter(item => item._id !== productId);
    viewCart();
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');    
    console.log(products);
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        const imageUrl = `http://localhost:3001${product.imageUrl}`;
        productDiv.innerHTML = `
            <img src='${imageUrl}' alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description" id="description-${product._id}" style="display: none;">${product.description}</p>
            <select class="quantity-select" id="quantity-${product._id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>
            <button onclick="toggleDescription('${product._id}')">More</button>
        `;
        productContainer.appendChild(productDiv);
    });

    const viewCartButton = document.getElementById('view-cart');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', viewCart);
    }
    
}


