// ...imports remain the same
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ChannelPage.css';
import { MdDelete } from "react-icons/md";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [showVideoList, setShowVideoList] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchChannel();
  }, [channelId]);

  const fetchChannel = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannel(res.data);
    } catch (err) {
      console.error('Failed to fetch channel:', err);
    }
  };

  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(`${baseURL}/videos`);
      setAllVideos(res.data);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const handleAddVideoClick = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${baseURL}/channels/${channelId}/videos/${videoId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchChannel();
      setShowVideoList(false);
    } catch (err) {
      console.error('Failed to add video to channel:', err);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${baseURL}/channels/${channelId}/videos/${videoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchChannel();
    } catch (err) {
      console.error('Failed to delete video from channel:', err);
    }
  };

  const handleOpenVideoList = () => {
    fetchAllVideos();
    setShowVideoList(true);
  };

  if (!channel) return <div>Loading...</div>;

  const bannerURL = channel.channelBanner ? `${baseURL}/uploads/${channel.channelBanner}` : null;
  const profileURL = bannerURL;

  return (
    <div className="channel-page">
      {/* Banner and Profile */}
      <div className="channel-banner-container">
        {bannerURL && <img className="channel-banner-image" src={bannerURL} alt="Channel banner" />}
      </div>
      <div className="channel-profile-container">
        {profileURL ? (
          <img className="channel-profile-image" src={profileURL} alt="Channel avatar" />
        ) : (
          <div className="channel-profile-placeholder">📺</div>
        )}
      </div>

      {/* Channel Info & Buttons */}
      <div className="channel-header-info-container">
        <div className="channel-header-info">
          <h1 className="channel-name">{channel.channelName}</h1>
          <p className="channel-handle">@{channel.handle}</p>
          <p className="channel-subscribers">{channel.subscribers} subscribers</p>
        </div>
        <div className="channel-header-buttons">
          <button className="add-video-button" onClick={handleOpenVideoList}>
            ➕ Add Video
          </button>
          <button className="edit-video-button" onClick={() => setEditMode(!editMode)}>
            ✏️ {editMode ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="channel-tabs">
        <button className="tab active">VIDEOS</button>
        <button className="tab">SHORTS</button>
        <button className="tab">PLAYLISTS</button>
        <button className="tab">COMMUNITY</button>
        <button className="tab">CHANNELS</button>
        <button className="tab">ABOUT</button>
      </div>

      {/* Video Grid */}
      <div className="channel-video-list">
        {channel.videos.filter(v => typeof v === 'object' && v.title).length === 0 ? (
          <p className="no-videos">No videos available</p>
        ) : (
          <div className="channel-video-grid">
            {channel.videos
              .filter((video) => typeof video === 'object' && video.title)
              .map((video) => (
                <div key={video._id} className="channel-video-card">
                  {editMode && (
                    <button
                      className="delete-video-btn"
                      onClick={() => handleDeleteVideo(video._id)}
                    >
                      <MdDelete />
                    </button>
                  )}
                  <Link to={`/watch/${video._id}`} className="channel-video-link">
                    <div className="thumbnail-container">
                      <img src={video.thumbnailUrl} alt={video.title} className="channel-video-thumbnail" />
                    </div>
                    <div className="channel-video-info">
                      <h3 className="channel-video-title">{video.title}</h3>
                      <p className="channel-video-meta">{video.views/1000}<span> K</span> • 2 days ago</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Modal Video List */}
      {showVideoList && (
        <div className="video-list-modal">
          <div className="video-list-box">
            <h2>Select a video to add</h2>
            <button className="close-button" onClick={() => setShowVideoList(false)}>✖</button>
            {allVideos.map((video) => (
              <div className="video-list-item" key={video._id} onClick={() => handleAddVideoClick(video._id)}>
                <img src={video.thumbnailUrl} alt={video.title} className="video-list-thumbnail" />
                <span className="video-list-title">{video.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
