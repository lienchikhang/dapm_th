import { createSlice } from "@reduxjs/toolkit";

const shoeDetailReducer = createSlice({
  name: "shoeDetail",
  initialState: {
    shoeDetail: {},
    success: false,
  },
  reducers: {
    getDetail: (state, action) => {
      state.shoeDetail = action.payload;
    },
    changDetail: (state, action) => {
      state.shoeDetail = action.payload;
    },
    changeSuccess: (state, action) => {
      state.success = true;
    },
  },
});

export const { getDetail, changDetail, changeSuccess } =
  shoeDetailReducer.actions;
export default shoeDetailReducer.reducer;
