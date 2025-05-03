const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createChannel,
  getChannels,
  getChannel,
  addVideoToChannel,
  removeVideoFromChannel,
} = require('../controllers/channelController');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// Create channel (with image upload)
router.post('/', authMiddleware, upload.single('profileImage'), createChannel);

// Get all channels
router.get('/', getChannels);

// Get channel by ID
router.get('/:channelId',authMiddleware, getChannel);

// Add video to channel
router.put('/:channelId/videos/:videoId', authMiddleware, addVideoToChannel);

// Remove video from channel
router.delete('/:channelId/videos/:videoId', authMiddleware, removeVideoFromChannel);

module.exports = router;
