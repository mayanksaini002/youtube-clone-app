const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// Routes
router.post('/:videoId', addComment);
router.get('/:videoId', getComments);
router.put('/edit/:commentId', updateComment);
router.delete('/delete/:commentId', deleteComment);

module.exports = router;
