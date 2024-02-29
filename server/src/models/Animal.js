const mongoose = require('mongoose');

// Define Animal schema
const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  habitat: { type: String, required: true },
  description: { type: String, required: true }
});

// Create Animal model
const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
