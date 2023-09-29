import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import { useSelector } from "react-redux";
export default function ShoeDetail() {
  const [block, setBlock] = useState();
  const [viewingshoe, setViewingShoe] = useState({});
  const idShoe = useSelector((state) => state.shoeReducer.shoe);

  useEffect(() => {
    shoeService
      .getByID(idShoe, "GET")
      .then((res) => {
        setViewingShoe(res.data);
      })
      .catch((err) => console.log(err));
  }, [block]);

  const renderingUI = () => {
    const { name, img, price, size, desc } = viewingshoe;
    return <h1>{name}</h1>;
  };
  return <div>{renderingUI()}</div>;
}
