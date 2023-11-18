import { createSlice } from "@reduxjs/toolkit";

const FilterReducer = createSlice({
  name: "filter",
  initialState: {
    filter: null,
    totalFindedProduct: 0,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateTotalFinded: (state, action) => {
      state.totalFindedProduct = action.payload;
    },
  },
});

export const { updateFilter, updateTotalFinded } = FilterReducer.actions;
export default FilterReducer.reducer;
