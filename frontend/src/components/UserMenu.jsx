import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authslice';
import './UserMenu.css';

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/');
  };

  const goToChannel = () => {
    const channelId = localStorage.getItem('channelId');
    if (channelId) {
      navigate(`/channel/${channelId}`);
    } else {
      alert("You don't have a channel yet. Please create one first.");
    }
    setOpen(false);
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="user-menu">
      <div className="avatar-circle" onClick={() => setOpen(!open)}>
        {getInitial(user.username)}
      </div>

      {open && (
        <div className="dropdown-menu">
          <div onClick={goToChannel}>Your Channel</div>
          <div>Your Subscriptions</div>
          <div>Settings</div>
          <div>Help</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
