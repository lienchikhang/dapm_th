import React from "react";
import { Header } from "antd/es/layout/layout";
import { Layout, Switch } from "antd";
import Logo from "./Logo";
import "../css/header.css";

export default function Top() {
  return (
    <div className="my-header">
      <Header>
        <div className="d-flex align-items-center justify-content-between">
          <Logo />
          <div
            className="d-flex align-items-center justify-content-around"
            style={{ width: "20%" }}
          >
            <div className="account__section">
              <div className="account__title">
                <h5 className="text-white">Admin</h5>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
}
