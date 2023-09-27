import React, { useEffect, useState } from "react";
import axios from "axios";
import NavItem from "./NavItem";
export default function Navbar() {
  const [cates, setCates] = useState([]);
  const [block, setBlock] = useState(false);
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
      return <NavItem data={cate} />;
    });
  };
  return (
    <div>
      <h3
        style={{
          fontWeight: "700",
          fontSize: "32px",
        }}
      >
        Hãng
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: "8px 0",
        }}
      >
        {renderingUI()}
      </ul>
    </div>
  );
}
