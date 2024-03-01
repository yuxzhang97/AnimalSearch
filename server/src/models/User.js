const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
      quantity: Number,
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
