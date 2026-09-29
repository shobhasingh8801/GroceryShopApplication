const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [
      {
        id: String,
        name: String,
        price: Number,
        count: Number,
        image: String,
      }
    ],
    totalPrice: Number,
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true},
    userData:{
      name: String,
      number: Number,
      email: String,
      address: String,
    }
  });
  
  module.exports = mongoose.model('Order', OrderSchema);