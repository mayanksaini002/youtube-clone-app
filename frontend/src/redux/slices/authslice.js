import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const token = localStorage.getItem('token');
let user = null;
let channelId = localStorage.getItem('channelId');
if (token) {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  user = JSON.parse(localStorage.getItem('user'));
  channelId = user ? user.channelId : null;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('channelId', res.data.user.channelId || null);

      axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      

      axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user,
    channelId: channelId,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('channelId');
      state.user = null;
      state.channelId = null;
      delete axios.defaults.headers['Authorization'];
    },
    setChannelId: (state, action) => {
      state.channelId = action.payload;
      if (state.user) {
        state.user.channelId = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
      localStorage.setItem('channelId', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setChannelId } = authSlice.actions;
export default authSlice.reducer;
