import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/userReducer";

export const login = (dispatch, data) => {
  dispatch(loginStart());
  axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/user/login`,
    method: "POST",
    data: data,
  })
    .then((res) => {
      dispatch(loginSuccess(res.data.user));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailure());
    });
};
