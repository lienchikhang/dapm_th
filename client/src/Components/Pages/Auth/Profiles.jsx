import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUser } from "../../../actions/user";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import setAuthHeader from "../../../setAuthHeader";
import { logout } from "../../../reducers/userReducer";
export default function Profiles() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    setAuthHeader(null);
    message.success("Log out successfully!");
    dispatch(logout());
  };

  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        lOG OUT
      </button>
    </div>
  );
}
