import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";
export default function HeaderNav({ path }) {
  return (
    <div>
      <NavLink className="header__nav" to="/">
        HOME
      </NavLink>
      <NavLink className="header__nav" to="/product/shoes">
        SHOP
      </NavLink>
      <NavLink className="header__nav" to="/contact">
        CONTACT
      </NavLink>
    </div>
  );
}
