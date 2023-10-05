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
import { useDispatch, useSelector } from "react-redux";
import { login, uploadUser } from "../../../actions/user";
import { setAuth } from "../../../actions/authAction.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const login = useSelector((state) => state.authReducer.user);

  const onChangeForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(dispatch, user);
  };

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
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-group">
            <label htmlFor />
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={onChangeForm}
            />
          </div>
          <button
            type="button"
            className="btn"
            onClick={onSubmit}
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
