const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1 
    }
  }],
  dateOrdered: {
    type: Date,
    default: Date.now 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
