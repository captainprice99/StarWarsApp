const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  species: {
    type: String,
    required: true
  },
  affiliation: {
    type: String,
    enum: ['Jedi', 'Sith', 'Rebel Alliance', 'Galactic Empire', 'Neutral'],
    required: true
  },
  era: {
    type: String,
    enum: ['Old Republic', 'Clone Wars', 'Galactic Civil War', 'First Order'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Character', characterSchema); 