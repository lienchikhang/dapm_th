import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import navbarReducer from "./reducers/navbar";
import cartReducer from "./reducers/cartReducer";
import checkOutReducer from "./reducers/checkOutReducer";
import searchReducer from "./reducers/searchReducer";
import FilterReducer from "./reducers/FilterReducer";
import notificationReducer from "./reducers/notificationReducer";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //sử dụng 1 số reducer mong muốn
  whitelist: ["user", "navbar", "cart", "checkOutInfo", "search", "filter"],
};

const rootReducer = combineReducers({
  user: userReducer,
  navbar: navbarReducer,
  cart: cartReducer,
  checkOutInfo: checkOutReducer,
  search: searchReducer,
  filter: FilterReducer,
  noti: notificationReducer,
});

const ignoredReducers = ["noti"];

const persistedReducer = persistReducer(
  { ...persistConfig, ignoredReducers },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
