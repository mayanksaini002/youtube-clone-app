import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card-wrapper">
      <div className="video-card">
        <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
        <div className="video-info">
          <img
            src={`https://i.pravatar.cc/40?u=${video.channelId}`}
            alt="avatar"
            className="avatar"
          />
          <div className="video-text">
            <h4 className="video-title">{video.title}</h4>
            <p className="video-channel">{video.uploader}</p>
            <p className="video-meta">
              {video.views.toLocaleString()} views • {new Date(video.uploadDate).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
