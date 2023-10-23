import { Menu } from "antd";
import React, { useState } from "react";
import "../pages/Default/default.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

export default function ManageShoes() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="default__wrapper">
      <div className="my-border">
        <h3>Danh sách sản phẩm</h3>
        <p>Quản lý</p>
      </div>
      <Outlet />
    </div>
  );
}
