import React, { useState } from "react";
import "../../../css/Cart.css";
import { useSelector } from "react-redux";
export default function CartFooter({ total }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <div className="cart__footer">
            <p className="">
              Tổng tiền: <span>{total}</span>
            </p>
            <button className="">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}
