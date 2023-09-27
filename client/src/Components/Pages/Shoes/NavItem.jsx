import React, { useState } from "react";
import "../../../css/ShoeList.css";
export default function NavItem({ data }) {
  //states
  const [active, setActive] = useState(false);
  return (
    <li
      className="navbar__item"
      onClick={() => {
        setActive(true);
      }}
    >
      <p>{data.catName}</p>
      {active && <i className="fa-solid fa-chevron-right" />}
    </li>
  );
}
