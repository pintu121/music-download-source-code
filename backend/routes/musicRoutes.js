const express = require('express');
const router = express.Router();
const multer = require('multer');
const Music = require('../models/Music');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    const music = new Music({
      title,
      artist,
      album,
      genre,
      filePath: req.file.path
    });
    await music.save();
    res.status(201).json({ message: 'Music uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
