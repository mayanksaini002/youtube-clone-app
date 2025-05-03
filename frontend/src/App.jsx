import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import ChannelPage from './pages/ChannelPage';
import LoginPage from './pages/LogInPage';
import SignInPage from './pages/SignInPage';
import CreateChannel from './components/CreateChannel';  // Corrected Import
import SearchResultsPage from './pages/SearchResultsPage'; // Import new SearchResultsPage
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header toggleSidebar={toggleSidebar} />
          <div className="main">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
                <Route path="/watch/:id" element={<VideoPlayer isSidebarOpen={isSidebarOpen} />} />
                <Route path="/channel" element={<ChannelPage />} /> {/* Route for current user's channel */}
                <Route path="/channel/:channelId" element={<ChannelPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/create-channel" element={<CreateChannel />} /> {/* Corrected Route */}
                <Route path="/search" element={<SearchResultsPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
