import axios from "axios";
import React, { useContext, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../../../context/authContext";
import setAuthHeader from "../../../setAuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
export default function Auth({ authRoute }) {
  const authState = useSelector((state) => state.authReducer);
  console.log(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userLoad = async () => {
      if (localStorage.getItem("userToken")) {
        const getToken = JSON.parse(localStorage.getItem("userToken"));
        const token = getToken.accessToken;
        setAuthHeader(token);
      }

      try {
        const response = await axios.get(`http://localhost:5050/api/user`);
        console.log("ré", response);
        if (response.data.success) {
          dispatch({
            type: "SET_AUTH",
            payload: {
              ...authState,
              isAuthenticated: true,
              user: response.data.user,
            },
          });
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("userToken");
        setAuthHeader(null);
        dispatch({
          type: "SET_AUTH",
          payload: {
            ...authState,
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    userLoad();
  }, []);

  let body = [];

  if (authState.authLoading) {
    body = <h1>Loading...</h1>;
  } else if (authState.isAuthenticated && authState.user.isAdmin) {
    return navigate("/dashboard");
  } else if (authState.isAuthenticated) {
    return navigate("/");
  } else {
    body = (
      <div>
        <h1>Autddh</h1>
        {authRoute === "login" && <Login />}
        {authRoute === "register" && <Register />}
      </div>
    );
  }

  const rendering = () => {
    return body;
  };

  return <div>{rendering()}</div>;
}
