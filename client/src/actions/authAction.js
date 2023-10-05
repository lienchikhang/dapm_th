import axios from "axios";

export const setAuth = (data) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:5000/api/user/login`,
            method: 'POST',
            data: data,
        })
        .then((res)=>{
            if(res.data.success) {
                const {user } = res.data;
                console.log(res.data)
                localStorage.setItem('userToken', JSON.stringify({ _id: user._id,
                    username: user.username,
                    accessToken: user.accessToken }))
                
                let action = {
                    type: 'SET_AUTH',
                    payload: {user: res.data.user, isAuthenticated: true},
                }
                dispatch(action);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}