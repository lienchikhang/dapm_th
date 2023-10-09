import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

export default function ManageShoes() {
  const items = [
    {
      label: "Create",
      key: "create",
      icon: <PlusCircleOutlined />,
      route: "create",
    },
    {
      label: "Stat",
      key: "stat",
      // icon: <MailOutlined />,
      route: "stat",
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu theme={"light"} mode="horizontal">
        {items.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.route} style={{ textDecoration: "none" }}>
              <span>{item.icon}</span>
              <span className="mx-2">{item.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <Outlet />
    </div>
  );
}
