import React, { useState } from "react";
import "../../../css/Cart.css";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
            <NavLink to="/CheckOut">
              <button className="">Thanh toán</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
