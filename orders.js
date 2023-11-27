document.addEventListener('DOMContentLoaded', () => {
    const viewCartButton = document.getElementById('view-cart');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', viewCart);
    }
    fetchOrders();
});

function fetchOrders() {
    fetch('http://localhost:3001/api/orders')
        .then(response => {
            console.log(response); 
            return response.json();
        })
        .then(orders => displayOrders(orders))
        .catch(error => console.error('Error fetching orders:', error));
}

function viewCart() {
    window.location.href = 'cart.html';
}


function displayOrders(orders) {
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        let orderContent = `<h3>Order ID: ${order._id}</h3>`;
        orderContent += `<p>Date: ${new Date(order.dateOrdered).toLocaleDateString()}</p>`;
        orderContent += `<p>Order Total: $${order.items.reduce((total, item) => total + item.itemId.price * item.quantity, 0).toFixed(2)}</p>`;
        orderContent += '<ul>';

        order.items.forEach(item => {
            orderContent += `<li>${item.itemId.name} - Quantity: ${item.quantity} - Cost: $${(item.itemId.price * item.quantity).toFixed(2)}</li>`;
        });

        orderContent += '</ul>';
        orderDiv.innerHTML = orderContent;
        ordersContainer.appendChild(orderDiv);
    });
}
