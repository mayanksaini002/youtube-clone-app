import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateChannel.css';
import { setChannelId } from '../redux/slices/authslice'; // ✅ import the new action

const CreateChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [handle, setHandle] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.auth.user); // get the user from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!channelName.trim() || !handle.trim()) {
      setError('Channel name and handle are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('channelName', channelName);
      formData.append('handle', handle);
      formData.append('userId', user._id); // Add the user ID to associate channel with the user
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/channels`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const newChannelId = response.data._id;
      const updatedUser = { ...user, channelId: newChannelId }; // Update user object with new channelId

      // Update Redux and localStorage
      dispatch(setChannelId(newChannelId)); // Update the channelId in Redux
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update the user in localStorage
      localStorage.setItem('channelId', newChannelId);

      navigate(`/channel/${newChannelId}`); // Navigate to the newly created channel page
    } catch (err) {
      setError('Failed to create channel. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="create-channel-container">
      <h2>How you'll appear</h2>

      <div className="channel-avatar-upload">
        <label htmlFor="profileImage" className="avatar-label">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Avatar Preview"
              className="avatar-preview"
            />
          ) : (
            <div className="avatar-placeholder">+</div>
          )}
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>

      <div className="input-group">
        <label>Channel name</label>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter your channel name"
        />
      </div>

      <div className="input-group">
        <label>Handle</label>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="yourhandle"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} className="create-channel-btn">
        Create Channel
      </button>
    </div>
  );
};

export default CreateChannel;
