// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingSlice";
import blogReducer from "./blogSlice";

const store = configureStore({
  reducer: {
    setting: settingReducer,
     blog: blogReducer,
  },
});

export default store;
