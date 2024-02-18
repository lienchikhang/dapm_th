import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../reducers/userReducer"

export const login = (dispatch, data) => {
    dispatch(loginStart());
    axios({
        url: `http://localhost:5050/api/user/login`,
        method: 'POST',
        data: data
    })
        .then((res) => {
            dispatch(loginSuccess(res.data.user));
        })
        .catch((err) => {
            console.log(err);
            dispatch(loginFailure());
        })
}