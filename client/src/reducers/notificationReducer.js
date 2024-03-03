import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "noti",
  initialState: {
    error: false,
    success: false,
  },
  reducers: {
    hasError: (state, action) => {
      state.error = true;
    },
    hasSuccess: (state, action) => {
      state.success = true;
    },
  },
});

export const { hasError, hasSuccess } = notificationSlice.actions;
export default notificationSlice.reducer;
