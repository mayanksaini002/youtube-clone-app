import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import './Home.css';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const Home = ({ isSidebarOpen }) => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['All', 'React', 'JavaScript', 'CSS', 'Node.js', 'Web Development'];

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((vid) => vid.category === selectedCategory);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/videos');
        setVideos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`home-page ${isSidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
      <div className="content-wrapper">
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="video-grid">
          {filteredVideos.map((vid) => (
            <Link key={vid._id} to={`/watch/${vid._id}`}>
              <VideoCard video={vid} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
