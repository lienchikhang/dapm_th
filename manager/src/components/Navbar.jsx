import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user.currentUser.payload);
  const navigate = useNavigate();
  const onClick = (path) => {
    navigate(path);
  };

  const items = [
    {
      key: "1",
      label: "Quản lý sản phẩm",
      children: [
        <p className="nav__manager" onClick={() => onClick("products")}>
          <i class="fa-solid fa-list"></i> Danh sách sản phẩm
        </p>,
        <p className="nav__manager" onClick={() => onClick("products/create")}>
          <i class="fa-solid fa-plus"></i> Thêm sản phẩm
        </p>,
      ],
    },
    {
      key: "2",
      label: "Quản lý người dùng",
      children: [
        <p className="nav__manager" onClick={() => onClick("users")}>
          <i class="fa-solid fa-list"></i> Danh sách người dùng
        </p>,
        <p className="nav__manager" onClick={() => onClick("users/create")}>
          <i class="fa-solid fa-plus"></i> Thêm người dùng
        </p>,
        <p className="nav__manager" onClick={() => onClick("users/stat")}>
          <i class="fa-solid fa-plus"></i> Thống kê người dùng
        </p>,
      ],
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>c</p>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="nav__wrapper">
      <div className="user__wrapper">
        <div className="user__block d-flex align-items-center">
          <div className="user__icon">
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="user__info">
            <h4 className="profile__title">dw</h4>
            <p className="edit__info">
              <i class="fa-solid fa-pen-to-square"></i> Sửa hồ sơ
            </p>
          </div>
        </div>
      </div>
      <nav>
        <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      </nav>
    </div>
  );
}
