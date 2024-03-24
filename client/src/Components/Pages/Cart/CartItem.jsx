import React, { useState } from "react";

import "../../../css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCartList } from "../../../reducers/cartReducer";
import { Services } from "../../../classes/Services";

let services = new Services();

export default function Cart_item({
  data,
  cartId,
  idUser,
  openLoading,
  closeLoading,
  sizeShoe,
}) {
  const cartUser = useSelector((state) => state.cart.cartUser);
  const dispatch = useDispatch();
  const { _id, img, name, price, quantity, size } = data;
  const local = JSON.parse(localStorage.getItem("persist:root"));
  const accessToken = JSON.parse(local.user).currentUser.accessToken;

  const handleDelete = async (idShoe) => {
    try {
      await services
        .createService("cart")
        .deleteCart(idUser, cartId, idShoe, data?.size);
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDesc = async () => {
    try {
      const cartUser = await services
        .createService("cart")
        .descCart("desc", { size: size, shoeId: _id });
      // const cartUser = await cartService.descCart(
      //   "desc",
      //   "POST",
      //   { size: size, shoeId: _id },
      //   accessToken
      // );
      dispatch(updateCartList(cartUser.data.newListCart));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncre = async () => {
    try {
      const cartUser = await services
        .createService("cart")
        .increaseCart("increase", { size: size, shoeId: _id });
      // const cartUser = await cartService.increaseCart(
      //   "increase",
      //   "POST",
      //   { size: size, shoeId: _id },
      //   accessToken
      // );
      dispatch(updateCartList(cartUser.data.newListCart));
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
      <td style={{ paddingRight: "45px" }}>
        <h3 className="cartItem__name">{name}</h3>
        <h4 className="cartItem__name">Size:{size}</h4>
      </td>
      <td style={{ padding: "0" }}>
        <button
          className="btn"
          onClick={() => {
            handleDesc();
          }}
        >
          <i class="fa-solid fa-minus"></i>
        </button>
        <span className="cartItem__amount">{quantity}</span>
        <button
          className="btn"
          onClick={() => {
            handleIncre();
          }}
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </td>
      <td>
        <span>{price.toLocaleString()}</span>
      </td>
      <td>
        <span>{(price * quantity).toLocaleString()}</span>
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
