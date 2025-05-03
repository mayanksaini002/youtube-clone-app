import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, fetchComments , editComment ,deleteComment } from '../redux/slices/commentSlice';

import './VideoPlayer.css';
import axios from 'axios';

const VideoPlayer = ({ isSidebarOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);


  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  const comments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}`);
        const current = res.data;
        if (!current) throw new Error("Video not found");

        setVideo(current);
        setLikes(current.likes || 0);
        setDislikes(current.dislikes || 0);
        dispatch(fetchComments(id));
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Failed to load video:", err);
        setVideo(null);
      }
    };

    fetchVideo();
  }, [id, dispatch]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos`);
        setAllVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchAllVideos();
  }, []);

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !user) return;
    dispatch(postComment({ videoId: id, text: newComment , userId: user._id }));
    setNewComment('');
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentText(comment.text);
  };

  const handleSaveEdit = () => {
    dispatch(editComment({ commentId: editingCommentId, text: editedCommentText }))
      .unwrap()
      .then(() => {
        setEditingCommentId(null);
        setEditedCommentText('');
      })
      .catch((err) => {
        console.error("Failed to update comment:", err);
      });
  };
  

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId))
      .unwrap()
      .catch((err) => {
        console.error("Failed to delete comment:", err);
      });
  };
  
  const handleVideoClick = (selectedId) => {
    if (selectedId !== id) {
      navigate(`/watch/${selectedId}`);
    }
  };

  if (!video) return <div>Video not found or failed to load</div>;

  return (
    <div className={`video-player-page ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
      <div className="video-main">
        <div className="video-frame">
          <iframe
            title={video.title}
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-info-panel">
          <h2>{video.title}</h2>
          <p className="uploader">{video.uploader}</p>
          <div className="video-stats">
            <span>{(video.views || 0).toLocaleString()} views</span>
            <div className="like-buttons">
              <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
              <button onClick={() => setDislikes(dislikes + 1)}>👎 {dislikes}</button>
            </div>
          </div>
          <div className="video-description">
  <p>
    {showFullDescription ? video.description : `${video.description?.slice(0, 150)}...`}
  </p>
  {video.description && video.description.length > 150 && (
    <button
      className="toggle-description-btn"
      onClick={() => setShowFullDescription(!showFullDescription)}
    >
      {showFullDescription ? 'Show Less' : 'Show More'}
    </button>
  )}
</div>

          <div className="comment-section">
            <h3>Comments</h3>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handleCommentSubmit}>Post</button>

            {comments.length > 0 ? (
              comments.map((c) => (
                <div className="comment" key={c._id}>
                  {editingCommentId === c._id ? (
                    <>
                      <textarea
                        className="edit-input"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                      />
                      <div className="comment-actions">
                        <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                        <button className="cancel-btn" onClick={() => setEditingCommentId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{c.text}</p>
                      <span>
                       @{user.username}
                      </span>
                      <span>{new Date(c.timestamp).toLocaleString()}</span>
                      {user && user._id === c.userId && (
                        <div className="comment-actions">
                          <button onClick={() => handleEditClick(c)}>Edit</button>
                          <button onClick={() => handleDelete(c._id)}>Delete</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="video-sidebar">
        <h3>Up next</h3>
        <div className="recommended-videos">
          {allVideos
            .filter((vid) => vid._id !== id)
            .slice(0, 5)
            .map((vid) => (
              <div className="side-video" key={vid._id} onClick={() => handleVideoClick(vid._id)}>
                <div className="side-video-link">
                  <img
                    className="side-thumbnail"
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                  />
                  <div className="side-info">
                    <p className="side-title">{vid.title}</p>
                    <p className="side-uploader">{vid.uploader}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
