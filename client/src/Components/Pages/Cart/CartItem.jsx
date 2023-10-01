import React from "react";

import "../../../css/Cart.css";
export default function Cart_item({ data }) {
  const { img, name, price, quantity } = data;
  return (
    <tr>
      <td width={"200px"}>
        <div className="cartItem__img">
          <img alt="img" className="img-fluid" src={img} />
        </div>
      </td>
      <td>
        <h3 className="cartItem__name">{name}</h3>
      </td>
      <td style={{ padding: "0" }}>
        <button className="btn">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span className="cartItem__amount">{quantity}</span>
        <button className="btn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </td>
      <td>
        <span>{price}</span>
      </td>
      <td>
        <span>{price * quantity}</span>
      </td>
      <td>
        <i class="fa-solid fa-trash"></i>
      </td>
    </tr>
  );
}
