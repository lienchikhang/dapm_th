import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Services } from "../classes/Services";
import { useDispatch } from "react-redux";
import { hasError } from "./notificationReducer";
let service = new Services();

export const login = createAsyncThunk(
  "user/login",
  async (account, thunkAPI) => {
    try {
      const rs = await service.createService("user").login("login", account);
      return rs;
    } catch (error) {
      thunkAPI.dispatch(hasError());
      return thunkAPI.rejected();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    auth: true,
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.auth = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    logout: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = true;
      state.currentUser = action.payload.data.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = true;
      state.isFetching = false;
      state.auth = false;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
