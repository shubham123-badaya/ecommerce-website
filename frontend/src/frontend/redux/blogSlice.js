import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../admin/config";

// ✅ Async Thunks
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const { data } = await axios.get(`${API_URL}/blog/all_blogs`);
  return data.blogs;
});

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (id) => {
    const { data } = await axios.get(`${API_URL}/blog/blog_detail/${id}`);
    return data;
  }
);

// ✅ Slice
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single blog
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
