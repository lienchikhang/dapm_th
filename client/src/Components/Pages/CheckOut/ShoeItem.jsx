import React from "react";
import "../../../css/CheckOut.css";

export default function ShoeItem({ data }) {
  const { _id, img, name, price, quantity, size } = data;
  return (
    <div className="d-flex justify-content-between mb-4">
      <div className="checkout__img">
        <img src={img} alt="" className="img-fluid" width={150} />
      </div>
      <div className="checkout__info">
        <h4>{name}</h4>
        <div className="d-flex my-field justify-content-between align-items-center">
          <span>Số lượng</span>
          <span>{quantity}</span>
        </div>
        <div className="d-flex my-field justify-content-between align-items-center">
          <span>Giá</span>
          <span>{price.toLocaleString()}</span>
        </div>
        <div className="d-flex my-field justify-content-between align-items-center">
          <span>Tổng</span>
          <span>{(price * quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
