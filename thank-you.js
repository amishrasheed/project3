document.addEventListener('DOMContentLoaded', () => {
    const orderTotal = localStorage.getItem('orderTotal');
    const expectedShipDate = new Date(localStorage.getItem('expectedShipDate'));

    document.getElementById('order-total').textContent = orderTotal;
    document.getElementById('expected-ship-date').textContent = expectedShipDate.toLocaleDateString();

    localStorage.removeItem('orderTotal');
    localStorage.removeItem('expectedShipDate');
});
