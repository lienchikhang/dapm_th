import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../css/header.css";
import Right from "./HeaderRight";
import HeaderNav from "./HeaderNav";
import HeaderRight from "./HeaderRight";
import { useSelector } from "react-redux";

export default function Header() {
  //connect redux
  //lấy state từ redux
  const user = useSelector((state) => state.user.currentUser);
  console.log("header ", user);
  return (
    <div className="header__wrapper">
      <div className="container">
        <div className="row justify-content-between align-items-center header">
          <div className="header__logo">LOGO</div>
          <HeaderNav />
          <div className="row">
            <HeaderRight account={true} user={user} />
            <HeaderRight user={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
