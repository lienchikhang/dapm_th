import React, { useState } from "react";

import "../../../css/Cart.css";
import cartService from "../../../services/cart_KService";
import { useDispatch, useSelector } from "react-redux";
import { updateCartList } from "../../../reducers/cartReducer";
export default function Cart_item({
  data,
  cartId,
  idUser,
  openLoading,
  closeLoading,
}) {
  const cartUser = useSelector((state) => state.cart.cartUser);
  const dispatch = useDispatch();
  const { _id, img, name, price, quantity, size } = data;
  const local = JSON.parse(localStorage.getItem("persist:root"));
  // const idUser = JSON.parse(local.user).currentUser.payload._id;
  const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;

  const handleDelete = async (idShoe) => {
    try {
      const result = await cartService.deleteCart(
        idUser,
        cartId,
        idShoe,
        accessToken
      );
      console.log(result);
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDesc = async (idShoe) => {
    try {
      const cartUser = await cartService.descCart(
        "desc",
        "POST",
        { size: size, shoeId: _id },
        accessToken
      );
      dispatch(updateCartList(cartUser.data.newListCart));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncre = async (idShoe) => {
    try {
      const cartUser = await cartService.increaseCart(
        "increase",
        "POST",
        { size: size, shoeId: _id },
        accessToken
      );
      console.log("cartItem cartUser", cartUser.data.newListCart);
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
            handleDesc(_id);
          }}
        >
          <i class="fa-solid fa-minus"></i>
        </button>
        <span className="cartItem__amount">{quantity}</span>
        <button
          className="btn"
          onClick={() => {
            handleIncre(_id);
          }}
        >
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
