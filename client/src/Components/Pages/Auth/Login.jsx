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
import Lottie from "lottie-react";
import loginLottie from "../../../utils/login.json";
import "../../../css/login.css";
import LOGO from "../../../utils/LOGO.png";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.authReducer?.user);
  if (status?.error) {
    message.error("Tài khoản hoặc mật khẩu không đúng");
  }

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
      <div class="row">
        <div className="col-6">
          <Lottie
            animationData={loginLottie} // Đường dẫn đến tệp JSON
            loop={true} // Tuỳ chọn: lặp hoặc không lặp
            autoplay={true} // Tuỳ chọn: tự động phát khi trang web được nạp
          />
        </div>
        <div className="col-6">
          <div className="login__wrapper">
            {/* <h1 className="text-center display-3">LOGO</h1> */}
            <img width={200} src={LOGO} alt="" className="my-login-logo" />
            <form action="">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-login-form"
                  name="username"
                  placeholder="Tài khoản"
                  value={user.username}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="" className="my-login-label">
                  Mật khẩu
                </label> */}
                <input
                  type="password"
                  className="form-control my-login-form"
                  name="password"
                  placeholder="Mật khẩu"
                  value={user.password}
                  onChange={onChangeForm}
                  required={true}
                />
              </div>
              <button
                type="button"
                className="my-login-button"
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
            <span className="my-login-sub">
              Chưa có tài khoản?{" "}
              <NavLink to="/auth/register">Đăng ký ngay!</NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
