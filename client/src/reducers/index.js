import { combineReducers } from "redux";
import userReducer from "./user";
import shoeReducer from "./shoe";
import navbarReducer from "./navbar";
import shoeDetailReducer from "./shoeDetail_Khang";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
const rootReducer = combineReducers({
  userReducer,
  shoeReducer,
  navbarReducer,
  shoeDetailReducer,
  cartReducer,
  authReducer,
  searchReducer,
});

export default rootReducer;
