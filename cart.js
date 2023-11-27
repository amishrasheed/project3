let cart = []; 

document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('checkout').addEventListener('click', checkout);
    document.getElementById('continue-shopping').addEventListener('click', continueShopping);
    renderCartItems();
    fetchOrders();
});

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = ''; 
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemCost = item.price * item.quantity;
        total += itemCost;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)} - Total: $${itemCost.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove from cart</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    const orderTotalDiv = document.getElementById('order-total');
    orderTotalDiv.textContent = `Order Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

function checkout() {
    submitOrderToServer(cart).then(response => {
        const orderTotal = response.orderTotal;
        const expectedShipDate = new Date();
        expectedShipDate.setDate(expectedShipDate.getDate() + 2);

        localStorage.setItem('orderTotal', JSON.stringify(orderTotal));
        localStorage.setItem('expectedShipDate', expectedShipDate.toISOString());

        cart = [];
        localStorage.removeItem('cart');

        window.location.href = 'thank-you.html';
    }).catch(error => {
        console.error('Checkout error:', error);
    });
}

function submitOrderToServer(cart) {
    return fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map(item => ({ itemId: item._id, quantity: item.quantity })) })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

function continueShopping() {
    window.location.href = 'home.html'; 
}
