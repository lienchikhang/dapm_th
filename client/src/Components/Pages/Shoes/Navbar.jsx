import React, { useEffect, useState } from "react";
import axios from "axios";
import NavItem from "./NavItem";
import "../../../css/ShoeList.css";
import { Radio } from "antd";
export default function Navbar() {
  //states
  const [cates, setCates] = useState([]);
  const [block, setBlock] = useState(false);
  //effect
  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/category/",
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setCates(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [block]);

  const renderingUI = () => {
    return cates.map((cate) => {
      return <NavItem key={cate.catName} data={cate} />;
    });
  };

  return (
    <div>
      <h3 className="navbar__subTitle">Hãng</h3>
      <ul className="navbar__list">
        <Radio.Group name="radiogroup" defaultValue={""}>
          <ul>{renderingUI()}</ul>
        </Radio.Group>
      </ul>
    </div>
  );
}
