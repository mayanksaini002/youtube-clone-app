import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu, MdSearch } from 'react-icons/md';
import { IoCreateSharp } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import './Header.css';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/search`, {
        params: { query: searchQuery },
      });
      const searchResults = res.data;
      navigate(`/search?query=${searchQuery}`, { state: { results: searchResults } });
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <header className="yt-header">
      <div className="yt-left">
        <MdMenu className="icon menu-icon" onClick={toggleSidebar} />
        <img
          src="../src/data/logo.webp"
          alt="YouTube"
          className="yt-logo"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="yt-center">
        <div className="yt-search-container">
          <input
            type="text"
            className="yt-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="yt-search-button" onClick={handleSearch}>
            <MdSearch />
          </button>
        </div>
      </div>

      <div className="yt-right">
        {user ? (
          <>
        <button className="create-button" onClick={() => navigate('/create-channel')}>
  Create
</button>



            <UserMenu user={user} />
          </>
        ) : (
          <button className="yt-signin-btn" onClick={() => navigate('/login')}>
            <FaRegUserCircle className="yt-signin-icon" /> Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
