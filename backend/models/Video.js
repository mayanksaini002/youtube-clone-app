const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    unique: true,
    default: function() {
      return this._id.toString(); // Default to MongoDB's _id
    }
  }, // REQUIRED FIELD
  title: { type: String, required: true },
  description: { type: String },
  thumbnailUrl: { type: String },
  uploader: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [
    {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  channelId: { type: String },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', VideoSchema);
