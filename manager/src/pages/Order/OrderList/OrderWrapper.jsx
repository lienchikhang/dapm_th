import React from "react";
import { Outlet } from "react-router-dom";

export default function OrderWrapper() {
  return (
    <div className="default__wrapper">
      <div className="my-border">
        <h3>Danh sách đơn hàng</h3>
        <p>Quản lý</p>
      </div>
      <Outlet />
    </div>
  );
}
