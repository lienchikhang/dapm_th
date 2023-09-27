import React from "react";
import "../../../css/ShoeItem.css";
export default function ShoeItem({ item }) {
  const { name, price, img, desc, brand } = item;
  const sliceString = (string) => {
    if (string.length > 15) {
      return string.slice(0, 15) + "...";
    }
    return string;
  };
  return (
    <div className="col-4">
      <div className="shoe__wrapper">
        <div className="shoe__top">
          <img src={img} alt="" />
          <div className="shoe__sub">
            <button>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="shoe__body">
          <h4>{sliceString(name)}</h4>
          <p>{sliceString(desc)}</p>
        </div>
        <div className="shoe__bottom">
          <h4>{price.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}
