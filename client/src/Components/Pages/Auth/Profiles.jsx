import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUser } from "../../../actions/user";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
export default function Profiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userReducer.user);

  const handleLogout = () => {
    localStorage.clear();
    const clearUser = uploadUser({});
    dispatch(clearUser);
    navigate("/");
    message.success("Log out successfully!");
  };

  return (
    <div>
      <h2>{userInfo?.username}</h2>
      <p>{userInfo?.accessToken}</p>
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
