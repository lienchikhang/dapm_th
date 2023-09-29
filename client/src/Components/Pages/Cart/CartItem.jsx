import React from "react";

import "../../../css/Cart.css";
export default function Cart_item() {
  return (
    <tr>
      <td width={"200px"}>
        <div className="cartItem__img">
          <img
            alt="img"
            className="img-fluid"
            src="https://th.bing.com/th/id/R.c32c12600ea011e5839a8805fd567b43?rik=pLiqZNlEG5W4Hg&pid=ImgRaw&r=0"
          />
        </div>
      </td>
      <td>
        <h3 className="cartItem__name">Van Old Skul</h3>
      </td>
      <td style={{ padding: "0" }}>
        <button className="btn">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span className="cartItem__amount">1</span>
        <button className="btn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </td>
      <td>
        <span>$300</span>
      </td>
      <td>
        <span>$300</span>
      </td>
      <td>
        <i class="fa-solid fa-trash"></i>
      </td>
    </tr>
  );
}
