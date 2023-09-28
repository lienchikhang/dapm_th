import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import ShoeItem from "./ShoeItem";
import "../../../css/ShoeList.css";
import { useSelector } from "react-redux";
export default function ShoeList({ closeLoading }) {
  const [shoeList, setShoeList] = useState([]);
  const [block, useBlock] = useState(false);

  //get cate
  const cates = useSelector((state) => state.navbarReducer.navItem);
  const selectedCate = useSelector((state) => state.navbarReducer.selectedCate);

  console.log("shoeList", shoeList);
  console.log("selectedCate", selectedCate);
  useEffect(() => {
    if (cates.length > 0) {
      shoeService
        .getAll(`?hangShoe=${cates}`, "GET")
        .then((res) => [
          console.log(res),
          setShoeList(res.data),
          closeLoading(),
        ])
        .catch((err) => {
          console.log(err);
        });
    } else {
      shoeService
        .getAll("", "GET")
        .then((res) => [
          console.log(res),
          setShoeList(res.data),
          closeLoading(),
        ])
        .catch((err) => {
          console.log(err);
        });
    }
  }, [block, cates]);

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
