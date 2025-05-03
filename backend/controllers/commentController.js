const Comment = require('../models/Comment');
const Video = require('../models/Video')
// Add a comment
exports.addComment = async (req, res) => {
  const { videoId } = req.params;
  const { text, userId } = req.body;

  if (!text || !userId || !videoId) {
    return res.status(400).json({ message: 'Missing required fields' });
}
  try {
    const newComment = new Comment({ videoId, text, userId,timestamp: new Date() });
    await newComment.save();
    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id }
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a video
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const updated = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
