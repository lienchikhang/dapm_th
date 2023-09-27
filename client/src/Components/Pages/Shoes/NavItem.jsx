import React from "react";

export default function NavItem({ data }) {
  return (
    <li
      style={{
        padding: "8px 0",
      }}
    >
      <h4>{data.catName}</h4>
    </li>
  );
}
