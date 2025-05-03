const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  handle: { type: String, required: true, unique: true }, // Added handle field
  channelBanner: { type: String }, // Stores uploaded image filename
  subscribers: { type: Number, default: 0 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

module.exports = mongoose.model('Channel', ChannelSchema);
