const express = require('express');
const router = express.Router();
const Product = require('./models/Product'); 
const Order = require('./models/Order'); 

// Get all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Create a new order
router.post('/api/orders', async (req, res) => {
    try {
        let orderTotal = 0;
        for (const item of req.body.items) {
            const product = await Product.findById(item.itemId);
            if (!product) {
                throw new Error(`Product with ID ${item.itemId} not found`);
            }
            orderTotal += product.price * item.quantity;
        }

        const newOrder = new Order({
            items: req.body.items,
            dateOrdered: new Date(),
        });

        await newOrder.save();

        res.status(201).json({ orderTotal: orderTotal, newOrder: newOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Error saving order" });
    }
});

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ dateOrdered: -1 }).populate('items.itemId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
