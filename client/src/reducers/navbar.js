import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     navItem: [],
//     selectedCate: '',
//     qPrice: 0,
// }

// const navbarReducer = (state = initialState, {type, payload}) => {
//     switch(type) {
//         case 'QUERY_PRICE': {
//             return {
//                 ...state,
//                 qPrice: payload
//             }
//         }
//         case 'UPDATE_CATES': {
//             return {
//                 ...state,
//                 navItem: payload
//             }
//         }
//         case 'REMOVE_CATE': {
//             let cloneCate = [...state.navItem]
//             const indexRemove = cloneCate.findIndex((item) => item === payload)
//             if(indexRemove != -1) cloneCate.splice(indexRemove, 1)
//             return {
//                 ...state,
//                 navItem: [...cloneCate]
//             }
//         }
//         case 'SELECT_CATE': {
//             return {
//                 ...state,
//                 navItem: [payload],
//                 selectedCate: payload
//             }
//         }
//         case 'SELECT_COLOR': {
//             return {
//                 ...state,
//                 navItem: [...state.navItem, payload]
//             }
//         }
//         default: {
//             return {
//                 ...state
//             }
//         }
//     }
// }

// export default navbarReducer

const navbarReducer = createSlice({
  name: "navbar",
  initialState: {
    navItem: [],
    selectedCate: "",
    qPrice: 0,
    qSize: [],
  },
  reducers: {
    queryPrice: (state, action) => {
      state.qPrice = action;
    },
    updateCate: (state, action) => {
      state.navItem = action;
    },
    removeCate: (state, action) => {
      const indexRemove = state.navItem.findIndex((item) => item === action);
      if (indexRemove != -1) state.navItem.splice(indexRemove, 1);
    },
    selectCate: (state, action) => {
      state.navItem = [action];
      state.selectedCate = action;
    },
    selectColor: (state, action) => {
      state.navItem = [...state.navItem, action];
    },
    selectSize: (state, action) => {
      state.qSize = action.payload;
    },
  },
});
export const {
  queryPrice,
  updateCate,
  removeCate,
  selectCate,
  selectColor,
  selectSize,
} = navbarReducer.actions;
export default navbarReducer.reducer;
