import axios from 'axios';

// Get token from localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`; // Attach token to every request
}

export default axiosInstance;
