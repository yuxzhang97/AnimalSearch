const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
  cart: [
    {
      productId: String,
      quantity: Number,
    }
  ]
});

// Define the model
const User = mongoose.model('User', userSchema);

module.exports = User;
