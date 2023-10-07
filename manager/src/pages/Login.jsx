import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/action/user";

export default function Login() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const isAdmin = useSelector(
    (state) => state.user.currentUser?.payload?.isAdmin
  );
  const error = useSelector((state) => state.user.error);
  console.log("isAdmin", isAdmin);
  // const { isFetching, error } = useSelector((state) => state.user.authReducer);

  const onChangeLoginForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);

  const onSubmit = (e) => {
    e.preventDefault();
    login(dispatch, user);
  };

  return (
    <div>
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
                onChange={onChangeLoginForm}
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
                onChange={onChangeLoginForm}
              />
            </div>
            <button
              type="button"
              className="btn"
              onClick={onSubmit}
              disabled={false ? true : false}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "55%",
                margin: "0 auto",
              }}
            >
              Đăng nhập
            </button>
            {!isAdmin && (
              <p style={{ color: "red", padding: "8px 0" }}>
                Bạn không có quyền truy cập!
              </p>
            )}
            {error && (
              <p style={{ color: "red", padding: "8px 0" }}>
                Mật khẩu hoặc tài khoản không đúng!
              </p>
            )}
          </form>
          <span>
            Chưa có tài khoản?{" "}
            <NavLink to="/auth/register">Đăng ký ngay!</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}
