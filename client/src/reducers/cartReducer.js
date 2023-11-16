import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     cartUser: 0,
// }

// const cartReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case 'UPDATE_CART_LIST': {
//         return {
//             ...state,
//             cartUser: payload
//         }
//     }
//   default:
//     return state
//   }
// }

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartUser: 0,
    hasNewItem: false,
  },
  reducers: {
    updateCartList: (state, action) => {
      state.cartUser = action.payload;
    },
    hasNewItem: (state, action) => {
      state.hasNewItem = action.payload;
    },
  },
});

export const { updateCartList, hasNewItem } = cartReducer.actions;
export default cartReducer.reducer;
