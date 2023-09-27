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
  const user = useSelector((state) => state.userReducer.user);
  console.log("get user from redux", user);

  let data = JSON.parse(localStorage.getItem("userToken"));
  console.log(data);
  useEffect(() => {
    console.log("reload");
  }, [user]);

  return (
    <div className={`my-header container d-flex `}>
      <div
        className="row justify-content-between py-4 px-3 align-items-center"
        style={{
          width: "100%",
        }}
      >
        <div style={{ fontWeight: "700", fontSize: "24px" }}>LOGO</div>
        <HeaderNav />
        <div className="d-flex">
          <HeaderRight user={true} data={data} logined={user} />
          <HeaderRight user={false} />
        </div>
      </div>
    </div>
  );
}
