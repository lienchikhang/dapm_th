import React, { useState } from "react";
import "../../../css/ShoeList.css";
import { Checkbox, Radio } from "antd";
import { useDispatch } from "react-redux";
import { changeCate, removeCate, selectedCate } from "../../../actions/navbar";

export default function NavItem({ data }) {
  //states
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const onChange = (name) => {
    const action = selectedCate(name);
    dispatch(action);
  };
  return (
    <li
      className="navbar__item"
      onClick={() => {
        setActive(true);
      }}
    >
      <p>{data.catName}</p>
      <Radio
        value={data.catName}
        checked={false}
        onChange={(e) => {
          onChange(data.catName);
        }}
      ></Radio>
    </li>
  );
}
