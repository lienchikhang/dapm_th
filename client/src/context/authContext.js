import React, { createContext, useContext, useEffect, useReducer } from 'react'
import setAuthHeader from '../setAuthHeader';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from '../reducers/authReducer';
import axios from 'axios';


export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
const authState = useSelector(state => state.authReducer)

const dispatch = useDispatch();

const setAuth = (data) => {
  return (dispatch) => {
      axios({
          url: `http://localhost:5000/api/user/login`,
          method: 'POST',
          data: data,
      })
      .then((res)=>{
          if(res.data.success) {
              const {user } = res.data;
              localStorage.setItem('token', JSON.stringify({ _id: user._id,
                  username: user.username,
                  accessToken: user.accessToken,}))
              let action = {
                  type: 'SET_AUTH',
                  payload: res.data.user,
              }
              dispatch(action);
          }
      })
      .catch((err) => {
          console.log(err)
      })
  }
}


  const userLoad = async () => {
    if(localStorage.getItem('token')) {
      setAuthHeader(localStorage['token']);
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/user`);
      console.log('ré', response)
      if (response.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            ...authState,
            isAuthenticated: true,
          }
        })
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('token');
      setAuthHeader(null);
      dispatch({
        type: 'SET_AUTH',
        payload: {
          ...authState,
          isAuthenticated: false,
          user: null
        }
      })
    }
  };


  useEffect(() => {
    userLoad();
  }, [])

const AuthContextData = {setAuth, authState}

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider;
