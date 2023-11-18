import React, { useState } from "react";
import Navbar from "./Navbar";
import ColorPicker from "./ColorPicker";
import ShoeList from "./ShoeList";
import "../../../css/ShoeList.css";
import { Spin, ConfigProvider } from "antd";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Search from "./Search";

export default function Shoes() {
  const [loading, setLoading] = useState(true);

  const closeLoading = () => {
    setLoading(false);
  };

  const openLoading = () => {
    setLoading(true);
  };

  return (
    <div className="navbar__wrapper">
      <div className={`loadingScreen ${loading ? "active" : ""}`}>
        <ConfigProvider
          theme={{
            components: {
              Spin: {
                /* here is your component tokens */
                colorPrimary: "#1677ff",
                dotSizeLG: 60,
              },
            },
          }}
        >
          <Spin size="large" spinning={loading} />
        </ConfigProvider>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2 className="navbar__title">SẢN PHẨM CỦA CHÚNG TÔI</h2>
            <Navbar openLoadingg={openLoading} closeLoading={closeLoading} />
            <ColorPicker />
          </div>
          <div className="col-8">
            <Search />
            <ShoeList openLoading={openLoading} closeLoading={closeLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
