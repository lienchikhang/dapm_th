//không dùng redux toolKit
// const initialState = {
//   currentUser: null,
//   isFetching: false,
//   error: false,
// }

// const authReducer =  (state = initialState, { type, payload }) => {
//   switch (type) {

//   case 'LOGIN_START':
//     return { ...state, isFetching: true }

//   case 'LOGIN_SUCCESS':
//     return {
//       ...state,
//       currentUser: payload,
//       isFetching: false,
//     }

//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         error: true,
//         isFetching: false,
//       }
//   default:
//     return state
//   }
// }

// export default authReducer

//dùng redux toolKit
import { createSlice } from "@reduxjs/toolkit";

//các slice giống như 1 mảnh reducer nhỏ trong redux reducer toolkit
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //với mỗi prop trong reducers, nó sẽ tạo ra 1 action creators
    //trong đó type = name của slice + "/" + name props
    loginStart: (state, action) => {
      //cũng trả về 1 state mới, nhưng thao tác trực tiếp trên state
      state.isFetching = false;
    }, // type: user/loginStart
    loginSuccess: (state, action) => {
      state.currentUser = action;
      state.isFetching = false;
    },
    loginFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = null;
      state.isFetching = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
