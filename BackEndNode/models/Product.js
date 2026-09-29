const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    qty: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;