import React, { useState } from "react";
import "../../../css/ShoeList.css";
import { Checkbox, Radio, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { changeCate, removeCate, selectedCate } from "../../../actions/navbar";

export default function NavItem({ data, setType }) {
  //states
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const onChange = (name) => {
    if (name === "all") {
      setType("");
    } else {
      setType(name);
    }
    const action = selectedCate(name);
    // dispatch(action);
  };
  return (
    <li
      className="navbar__item"
      onClick={() => {
        setActive(true);
      }}
    >
      <p>{data.catName}</p>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              /* here is your component tokens */
              radioSize: 20,
              colorPrimary: "#000000",
            },
          },
        }}
      >
        <Radio
          value={data.catName}
          checked={false}
          onChange={(e) => {
            onChange(data.catName);
          }}
        ></Radio>
      </ConfigProvider>
    </li>
  );
}
