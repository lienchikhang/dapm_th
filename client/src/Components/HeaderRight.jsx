import React from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";
export default function HeaderRight({ account, user }) {
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
          {user ? `${user.payload.username}` : "Account"}
        </NavLink>
      ) : (
        <NavLink to="/cart" className="mx-2 header__right">
          Bags
        </NavLink>
      )}
    </div>
  );
}
