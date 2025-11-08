// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingSlice";

const store = configureStore({
  reducer: {
    setting: settingReducer,
  },
});

export default store;
