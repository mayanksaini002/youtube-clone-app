// User model
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  channels: [String],
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
});

module.exports = mongoose.model('User', UserSchema);
