const express = require('express');
const router = express.Router();
const Character = require('../models/Character');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Middleware to verify JWT token
const auth = require('../middleware/auth');

// Get all characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find().populate('createdBy', 'username');
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching characters', error: error.message });
  }
});

// Get character by ID
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).populate('createdBy', 'username');
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character', error: error.message });
  }
});

// Create new character (protected route)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const characterData = {
      ...req.body,
      createdBy: req.user.userId
    };

    if (req.file) {
      characterData.imageUrl = `/images/${req.file.filename}`;
    }

    const character = new Character(characterData);
    await character.save();
    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error creating character', error: error.message });
  }
});

// Update character (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // Check if user is the creator
    if (character.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this character' });
    }

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating character', error: error.message });
  }
});

// Delete character (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // Check if user is the creator
    if (character.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this character' });
    }

    await character.remove();
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting character', error: error.message });
  }
});

module.exports = router; 