import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || {};

  return (
    <div className="container">
      <div className="search-results">
        <h2>Search Results</h2>
        {results && results.length > 0 ? (
          <div className="video-list">
            {results.map((video) => (
              <Link
                to={`/watch/${video._id}`} // Assuming /watch/:id is your VideoPlayer route
                key={video._id}
                className="video-card"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                />
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No results found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
