import React, { useState } from "react";
import "../../../css/SizeItem.css";

export default function SizeItem({ value, handleSelectSize }) {
  const [active, setActive] = useState(false);
  return (
    <div className="col-2">
      <div
        className={`my-size ${active ? "active" : ""}`}
        onClick={() => {
          handleSelectSize(value);
          setActive(true);
        }}
      >
        <span>{value}</span>
      </div>
    </div>
  );
}
