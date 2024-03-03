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
import LoginForm from "./LoginForm.jsx";
import Noti from "../../Noti.jsx";

export default function Login() {
  return (
    <div className="container p-4">
      <div class="row">
        <div className="col-6">
          <Lottie animationData={loginLottie} loop={true} autoplay={true} />
        </div>
        <div className="col-6">
          <div className="login__wrapper">
            <LoginForm />
            <span className="my-login-sub">
              Chưa có tài khoản?{" "}
              <NavLink to="/auth/register">Đăng ký ngay!</NavLink>
            </span>
            <Noti />
          </div>
        </div>
      </div>
    </div>
  );
}
