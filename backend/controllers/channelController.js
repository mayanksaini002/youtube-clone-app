const Channel = require('../models/Channel');
const User = require('../models/User');

// Create a new channel
exports.createChannel = async (req, res) => {
  const { channelName, description, handle } = req.body;
  const userId = req.user.id;

  try {
    const profileImage = req.file ? req.file.filename : '';

    // Check if the handle is already taken
    const existingChannel = await Channel.findOne({ handle });
    if (existingChannel) {
      return res.status(400).json({ message: 'Handle already taken' });
    }

    const newChannel = new Channel({
      channelName,
      description,
      handle, // Added handle to be saved in the database
      channelBanner: profileImage, // Save image filename
      owner: userId,
    });

    await newChannel.save();

    await User.findByIdAndUpdate(userId, {
      $push: { channels: newChannel._id },
      channelId: newChannel._id 
    });

    res.status(201).json(newChannel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all channels (now supports filtering by owner via ?owner=<userId>)
exports.getChannels = async (req, res) => {
  try {
    const filter = {};
    if (req.query.owner) {
      filter.owner = req.query.owner;
    }
    const channels = await Channel.find(filter);
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a specific channel by ID
exports.getChannel = async (req, res) => {
  const { channelId } = req.params;
  try {
    const channel = await Channel.findById(channelId)
    .populate('videos') // Populate full video details
      .exec();
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add a video to a channel
exports.addVideoToChannel = async (req, res) => {
  const { channelId, videoId } = req.params;
  try {
    const channel = await Channel.findById(channelId)
   

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.videos.includes(videoId)) {
      return res.status(400).json({ message: 'Video already added' });
    }

    channel.videos.push(videoId);
    await channel.save();
    res.json({ message: 'Video added to channel', channel });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Remove a video from a channel
exports.removeVideoFromChannel = async (req, res) => {
  const { channelId, videoId } = req.params;
  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const initialLength = channel.videos.length;
    channel.videos = channel.videos.filter(
      vid => vid.toString() !== videoId.toString()
    );

    if (channel.videos.length === initialLength) {
      return res.status(404).json({ message: 'Video not found in channel' });
    }

    await channel.save();
    res.json({ message: 'Video removed from channel', channel });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
