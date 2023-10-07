import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, Switch, theme } from "antd";
import { BrowserRouter, Link, NavLink, Route, Router } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import Test from "./Test";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/reducer/authReducer";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const dispatch = useDispatch();

  function getItem(label, key, icon, route, children) {
    return {
      key,
      icon,
      children,
      route,
      label,
    };
  }

  const handleExit = () => {
    console.log("yes");
    localStorage.removeItem("persist:root");
    dispatch(logoutSuccess());
  };

  const items = [
    getItem("Quản lý sản phẩm", "1", <ProfileFilled />, "products"),
    getItem("Option 2", "2", <DesktopOutlined />, "option2"),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          width: "200px",
          bodyBg: "#ffffff",
          colorBgLayout: "#ffffff",
          backgroundColor: "#ffffff",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu theme={"light"} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.route} style={{ textDecoration: "none" }}>
                  <span>{item.icon}</span>
                  {!collapsed && <span className="mx-2">{item.label}</span>}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleExit}
            >
              <LogoutOutlined />
            </button>
          </div>
        </Sider>
      </Layout>
    </div>
  );
}
