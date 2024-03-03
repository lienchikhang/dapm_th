import React from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const Noti = () => {
  const { error } = useSelector((state) => state.noti);

  return (
    error && (
      <p className="warning-text sum">
        Tài khoản hoặc mật khẩu không chính xác!
      </p>
    )
  );
};

export default Noti;
