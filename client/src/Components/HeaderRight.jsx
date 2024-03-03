import React, { useEffect, useState } from "react";
import { NavLink, json } from "react-router-dom";
import "../css/header.css";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import cartService from "../services/cart_KService";
export default function HeaderRight({ account, user }) {
  const cartUser = useSelector((state) => state.cart.cartUser?.shoes);
  const hasNewItem = useSelector((state) => state.cart.hasNewItem);
  const [shoeArr, setShoeArr] = useState([]);

  // useEffect(() => {
  //   updateBadge();
  // }, [shoeArr]);

  // // useEffect(() => {
  // //   let callApi = async () => {
  // //     const local = JSON.parse(localStorage.getItem("persist:root"));
  // //     const idUser = JSON.parse(local.user).currentUser?.payload._id;
  // //     const accessToken = JSON.parse(local.user).currentUser?.payload
  // //       .accessToken;

  // //     // const { _id, accessToken } = local;
  // //     try {
  // //       const result = await cartService.getCart(idUser, accessToken);
  // //       // closeLoading();
  // //       console.log("result", result.data.cart.shoes);
  // //       setShoeArr(result.data.cart.shoes);
  // //     } catch (err) {
  // //       console.log(err);
  // //     }
  // //   };
  // //   callApi();
  // // }, [cartUser]);

  // // useEffect(() => {
  // //   setShoeArr(cartUser);
  // // }, [cartUser]);

  // const updateBadge = () => {
  //   return cartUser.reduce((accumulate, curCart) => {
  //     return accumulate + curCart.quantity;
  //   }, 0);
  // };

  return (
    <div className="mx-2">
      {account ? (
        <i class="fa-solid fa-user"></i>
      ) : (
        <i class="fa-solid fa-cart-shopping"></i>
      )}
      {account ? (
        <NavLink
          to={user ? `auth/profiles` : `/auth/login`}
          className="mx-2 header__right"
        >
          {user ? `${user?.username}` : "Account"}
        </NavLink>
      ) : (
        <NavLink to="/cart" className="mx-2 header__right">
          <Badge count={0} offset={[-32, -8]}>
            Bags
          </Badge>
        </NavLink>
      )}
    </div>
  );
}
