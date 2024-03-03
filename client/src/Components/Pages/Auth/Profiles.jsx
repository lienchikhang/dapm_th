import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUser } from "../../../actions/user";
import { Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import setAuthHeader from "../../../setAuthHeader";
import { logout } from "../../../reducers/userReducer";
import "../../../css/profile.css";
export default function Profiles() {
  const { username } = useSelector((state) => state.user.currentUser);
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
    <div className="profile__wrapper">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="nav__wrapper">
              <div className="user__wrapper">
                <div className="user__block">
                  <i class="fa-solid fa-user"></i>
                  <div className="user__info">
                    <h4 className="profile__title">{username}</h4>
                    <p className="edit__info" onClick={() => handleChange("")}>
                      <i class="fa-solid fa-pen-to-square"></i> Sửa hồ sơ
                    </p>
                  </div>
                </div>
              </div>
              <ul className="user__nav">
                <li onClick={() => handleChange("history")}>
                  <p>
                    {" "}
                    <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử đơn
                    hàng
                  </p>
                </li>
                <li onClick={() => handleChange("")}>
                  <p>
                    <i class="fa-solid fa-pen-to-square"></i> thay đổi thông tin
                  </p>
                </li>
                <li>
                  <p onClick={() => handleChange("developing")}>
                    <i class="fa-solid fa-warehouse"></i> Kho voucher
                  </p>
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
          </div>
          <div className="col-9">
            <div className="content__wrapper">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
