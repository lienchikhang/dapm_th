import axios from 'axios'
import {loginStart, loginSuccess, loginFailure} from '../reducer/authReducer'
export const login =  (dispatch, user) => { 
    // return (dispatch) => {
    //     dispatch(loginStart());
    //     axios({
    //         url: 'http://localhost:5000/api/user/login',
    //         method: 'POST',
    //         data: user
    //     })
    //     .then((res) => {
    //         localStorage.setItem('userToken', JSON.stringify(res.data.user));
    //         dispatch(loginSuccess(res.data.user));
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         dispatch(loginFailure());
    //     })
    // }
    dispatch(loginStart())
    axios({
        url: 'http://localhost:5000/api/user/login',
        method: 'POST',
        data: user
    })
    .then((res) => {
        // localStorage.setItem('userToken', JSON.stringify(res.data.user));
        dispatch(loginSuccess(res.data.user));
    })
    .catch((err) => {
        console.log(err)
        dispatch(loginFailure());
    })
}