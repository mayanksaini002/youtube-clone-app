import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (videoId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/comments/${videoId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const postComment = createAsyncThunk(
  'comments/postComment',
  async ({ videoId, text, userId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/comments/${videoId}`, { text, userId });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ commentId, text }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_URL}/comments/edit/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/comments/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.comments[index].text = action.payload.text;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c._id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
