const Video = require('../models/Video');

// Get all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

// Get video by ID
const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video", error: error.message });
  }
};

// Search videos
const searchVideos = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' }
    });

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error searching for videos", error: error.message });
  }
};

// ✅ Create a new video
const createVideo = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl } = req.body;

  try {
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      uploader: req.user.id
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Error creating video", error: error.message });
  }
};

// ✅ Update video
const updateVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating video", error: error.message });
  }
};

// ✅ Delete video
const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Video.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video", error: error.message });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  searchVideos,
  createVideo,
  updateVideo,
  deleteVideo
};
