import React from "react";

import "../../../css/Cart.css";
import cartService from "../../../services/cart_KService";
export default function Cart_item({
  data,
  cartId,
  idUser,
  openLoading,
  closeLoading,
}) {
  const { _id, img, name, price, quantity } = data;

  const handleDelete = async (idShoe) => {
    console.log({ idShoe, cartId, idUser });
    const local = JSON.parse(localStorage.getItem("userToken"));
    const token = local.accessToken;
    try {
      const result = await cartService.deleteCart(
        idUser,
        cartId,
        idShoe,
        token
      );
      console.log(result);
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

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
        <button
          className="btn"
          onClick={() => {
            openLoading();
            handleDelete(_id);
          }}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
