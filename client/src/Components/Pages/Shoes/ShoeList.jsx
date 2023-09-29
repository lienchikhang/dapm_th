import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import ShoeItem from "./ShoeItem";
import "../../../css/ShoeList.css";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
export default function ShoeList({ openLoading, closeLoading }) {
  const [shoeList, setShoeList] = useState([]);
  const [block, setBlock] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Số mục trên mỗi trang
  const [displayedShoeList, setDisplayedShoeList] = useState([]);
  const [total, setTotal] = useState(1);

  //get cate
  const cates = useSelector((state) => state.navbarReducer.navItem);
  const selectedCate = useSelector((state) => state.navbarReducer.selectedCate);

  console.log("selectedCate", selectedCate);
  //pagination

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    if (page !== current) {
      setCurrent(page);
    }
  };

  console.log("render");
  console.log(shoeList);
  console.log("displayedList", displayedShoeList);
  // console.log("shoeList", shoeList);
  // console.log("selectedCate", selectedCate);
  useEffect(() => {
    openLoading();
    if (cates.length > 0) {
      shoeService
        .getAll(`?hangShoe=${cates}`, "GET")
        .then((res) => {
          console.log("first", res);
          setShoeList(res.data);
          closeLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      shoeService
        .getAll("", "GET")
        .then((res) => {
          setShoeList(res.data);
          closeLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [block, cates, current]);

  useEffect(() => {
    setCurrent(1);
  }, [selectedCate]);

  useEffect(() => {
    const startIndex = (current - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedList = shoeList.slice(startIndex, endIndex);
    setDisplayedShoeList(displayedList);
  }, [shoeList]);

  const renderingUI = () => {
    return displayedShoeList.map((shoe) => {
      return <ShoeItem key={shoe.id} item={shoe} />;
    });
  };

  return (
    <div>
      <div className="row">{renderingUI()}</div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <Pagination current={current} onChange={onChange} total={40} />
        </div>
      </div>
    </div>
  );
}
