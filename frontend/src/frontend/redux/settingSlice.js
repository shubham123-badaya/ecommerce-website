// src/redux/settingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch setting from backend
export const fetchSetting = createAsyncThunk(
  "setting/fetchSetting",
  async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/setting", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
    return res.data.setting;
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    setting: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload;
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default settingSlice.reducer;
