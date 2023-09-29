import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConfigProvider, Radio } from "antd";
import "../../../css/ShoeList.css";
import { selectedColor } from "../../../actions/navbar";
export default function ColorPicker() {
  const [value, setValue] = useState("none");
  const [block, setBlock] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setBlock(true);
  };

  useEffect(() => {
    if (block) {
      dispatch(selectedColor(value));
    }
  }, [value]);

  return <div></div>;
}
