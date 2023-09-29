import React from "react";
import "../../../css/Cart.css";
export default function CartFooter() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <div className="cart__footer">
            <p className="">
              Tổng tiền: <span>600</span>
            </p>
            <button className="">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}
