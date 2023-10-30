import React from "react";
import { Header } from "antd/es/layout/layout";
import { Layout, Switch } from "antd";
import Logo from "./Logo";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/reducer/authReducer";

export default function Top() {
  const { username } = useSelector((state) => state.user.currentUser.payload);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    localStorage.clear();
  };
  return (
    <div className="my-header">
      <Header>
        <div className="d-flex align-items-center justify-content-between">
          <Logo />
          <div
            className="d-flex align-items-center justify-content-around"
            style={{ width: "20%" }}
          >
            <div className="account__section d-flex align-items-center">
              <div className="account__title mx-2">
                <h5 className="text-white">{username}</h5>
              </div>
              <div className="mx-2">
                <button className="btn btn-primary" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
}
