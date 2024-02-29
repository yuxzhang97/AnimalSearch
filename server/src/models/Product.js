const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
  _id:String,
  name: String,
  description: String,
  price: Number,
  category: String,
  imageURL: String,
});

// Define the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
