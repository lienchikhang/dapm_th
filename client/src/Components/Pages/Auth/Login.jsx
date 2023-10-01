import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { uploadUser } from "../../../actions/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settingUserForAll = (userData) => {
    console.log("dispatch");
    const action = uploadUser(userData);
    dispatch(action);
  };

  useEffect(() => {
    if (buttonClicked) {
      axios({
        url: "http://localhost:5000/api/user/login",
        method: "POST",
        data: user,
      })
        .then((res) => {
          console.log(res);
          const { success, user } = res.data;
          console.log("userrr", user);
          if (success) {
            settingUserForAll(user);
            localStorage.setItem(
              "userToken",
              JSON.stringify({
                _id: user._id,
                username: user.username,
                accessToken: user.accessToken,
              })
            );
            message.success(res.data.message);
            navigate("/"); //ko bị load lại trang khi chuyển
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.message);
        });
    }
  }, [buttonClicked, user]);

  return (
    <div className="container p-4">
      <div
        style={{
          width: "40%",
          backgroundColor: "blue",
          margin: "0 auto",
          borderRadius: "10px",
          background: "rgba( 255, 255, 255, 0.45 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 5.5px )",
          webkitBackdropFilter: "blur( 5.5px )",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          padding: "16px",
        }}
      >
        <h1 className="text-center display-3">LOGO</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor />
            <input
              type="text"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor />
            <input
              type="password"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn"
            onClick={(e) => {
              setUser({ username, password });
              setButtonClicked(true);
              settingUserForAll({
                username: "dadwdw",
              });
            }}
            style={{
              backgroundColor: "black",
              color: "white",
              width: "55%",
              margin: "0 auto",
            }}
          >
            Đăng nhập
          </button>
        </form>
        <span>
          Chưa có tài khoản?{" "}
          <NavLink to="/auth/register">Đăng ký ngay!</NavLink>
        </span>
      </div>
    </div>
  );
}
