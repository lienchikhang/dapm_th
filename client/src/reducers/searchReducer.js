import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    word: "",
  },
  reducers: {
    searching: (state, action) => {
      state.word = action.payload;
    },
  },
});

export const { searching } = searchSlice.actions;
export default searchSlice.reducer;
