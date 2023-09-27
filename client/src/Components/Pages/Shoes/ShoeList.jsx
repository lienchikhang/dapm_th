import React, { useEffect, useState } from "react";
import axios from "axios";
import shoeService from "../../../services/shoeService";
import ShoeItem from "./ShoeItem";
export default function ShoeList() {
  const [shoeList, setShoeList] = useState([]);
  const [block, useBlock] = useState(false);

  useEffect(() => {
    shoeService("shoe", "GET")
      .then((res) => [console.log(res), setShoeList(res.data)])
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
