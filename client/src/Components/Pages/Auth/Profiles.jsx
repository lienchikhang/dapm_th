import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUser } from "../../../actions/user";
import { Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import setAuthHeader from "../../../setAuthHeader";
import { logout } from "../../../reducers/userReducer";
export default function Profiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    setAuthHeader(null);
    message.success("Log out successfully!");
    dispatch(logout());
  };

  const handleChange = (url) => {
    navigate(url);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-3">
          <h4>Thông tin người dùng</h4>
          <div className="user__block">
            <p>name</p>
            <p>age</p>
            <p>15/10/2003</p>
          </div>
          <ul>
            <li onClick={() => handleChange("history")}>
              <p>Lịch sử đơn hàng</p>
            </li>
            <li onClick={() => handleChange("change")}>
              <p>thay đổi thông tin</p>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                lOG OUT
              </button>
            </li>
          </ul>
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
