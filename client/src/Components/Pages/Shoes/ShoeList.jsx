import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import ShoeItem from "./ShoeItem";
import "../../../css/ShoeList.css";
export default function ShoeList({ closeLoading }) {
  const [shoeList, setShoeList] = useState([]);
  const [block, useBlock] = useState(false);

  useEffect(() => {
    shoeService
      .getAll("", "GET")
      .then((res) => [console.log(res), setShoeList(res.data), closeLoading()])
      .catch((err) => {
        console.log(err);
      });
  }, [block]);

  const renderingUI = () => {
    return shoeList.map((shoe) => {
      return <ShoeItem key={shoe.id} item={shoe} />;
    });
  };

  return (
    <div>
      <div className="row">{renderingUI()}</div>
    </div>
  );
}
