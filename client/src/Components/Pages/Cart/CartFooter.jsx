import React, { useState } from "react";
import "../../../css/Cart.css";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function CartFooter({ total, disable }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <div className="cart__footer">
            <p className="">
              Tổng tiền: <span>{total ? total.toLocaleString() : 0}</span>
            </p>
            {disable?.length > 0 ? (
              <NavLink to="/CheckOut">
                <button className="">Thanh toán</button>
              </NavLink>
            ) : (
              <NavLink to="/CheckOut">
                <button className="" disabled style={{ cursor: "crosshair" }}>
                  Thanh toán
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
