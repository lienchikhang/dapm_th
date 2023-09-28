import React from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";
export default function HeaderRight({ user, data }) {
  return (
    <div className="mx-2">
      {user ? (
        <i class="fa-solid fa-user"></i>
      ) : (
        <i class="fa-solid fa-cart-shopping"></i>
      )}
      {user ? (
        <NavLink
          to={data ? "/user/profiles" : "/auth/login"}
          className="mx-2 header__right"
        >
          {data?.username ? `${data.username}` : "Account"}
        </NavLink>
      ) : (
        <NavLink to="/cart" className="mx-2 header__right">
          Bags
        </NavLink>
      )}
    </div>
  );
}
