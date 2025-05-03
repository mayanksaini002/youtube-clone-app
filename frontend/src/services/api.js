import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchVideos = () => API.get('/videos');
export const fetchVideoById = (id) => API.get(`/videos/${id}`);
export const likeVideo = (id) => API.post(`/videos/${id}/like`);
export const dislikeVideo = (id) => API.post(`/videos/${id}/dislike`);
export const addComment = (videoId, comment) => API.post(`/videos/${videoId}/comments`, comment);
export const fetchChannel = (channelId) => API.get(`/channels/${channelId}`);
export const fetchUserChannels = () => API.get('/channels');
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
