import React from "react";
import "../../../css/ShoeItem.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { viewingShoe } from "../../../actions/shoe";
import useSelection from "antd/es/table/hooks/useSelection";

export default function ShoeItem({ item }) {
  const { _id, name, price, img, desc, brand } = item;
  // const cartUser = useSelection((state) => state.cart.cartUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <button
              onClick={() => {
                navigate(`${_id}`);
              }}
            >
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
