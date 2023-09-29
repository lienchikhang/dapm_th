import React from "react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import "../../../css/Cart.css";
export default function Cart() {
  return (
    <div>
      <div className="container cart__wrapper">
        <div className="row">
          <div className="col-12">
            <h1 className="cart__title">Giỏ hàng</h1>
            <table className="table table-borderless">
              <thead>
                <th>SẢN PHẨM</th>
                <th></th>
                <th>SỐ LƯỢNG</th>
                <th>GIÁ</th>
                <th>TỔNG</th>
                <th></th>
              </thead>
              <tbody>
                <CartItem></CartItem>
                <CartItem></CartItem>
              </tbody>
            </table>
          </div>
          <CartFooter></CartFooter>
        </div>
      </div>
    </div>
  );
}
