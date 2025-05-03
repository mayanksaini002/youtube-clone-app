const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getVideos,
  getVideoById,
  searchVideos,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

// Place search route first to avoid conflict
router.get('/search', searchVideos);

// 🔽 General CRUD routes
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.post('/', authMiddleware, createVideo);
router.put('/:id', authMiddleware, updateVideo);
router.delete('/:id', authMiddleware, deleteVideo);

module.exports = router;
