import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import ShoeItem from "./ShoeItem";
import "../../../css/ShoeList.css";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
export default function ShoeList({ openLoading, closeLoading }) {
  const [shoeList, setShoeList] = useState([]);
  const [block, setBlock] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Số mục trên mỗi trang
  const [displayedShoeList, setDisplayedShoeList] = useState([]);

  //get cate
  const cates = useSelector((state) => state.navbarReducer.navItem);
  const selectedCate = useSelector((state) => state.navbarReducer.selectedCate);

  console.log("cates", cates);
  //pagination

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    if (page !== current) {
      setCurrent(page);
    }
  };

  useEffect(() => {
    const myAsync = async () => {
      let queryStr = ``;
      openLoading();
      if (cates?.type && cates?.color && cates?.price)
        queryStr = `?hangShoe=${cates.type}&color=${cates.color}&price=${cates.price}`;
      else if (cates.type && cates.color)
        queryStr = `?hangShoe=${cates.type}&color=${cates.color}`;
      else if (cates.type || cates.color || cates.price) {
        queryStr = !cates.price
          ? `?hangShoe=${cates.type ? cates.type : cates.color}`
          : `?price=${cates.price}`;
      } else if (cates.qPrice) queryStr = `?price=${cates.qPrice}`;
      else queryStr = ``;

      //call api
      try {
        const result = await shoeService.getAll(queryStr, "GET");
        console.log("result", result);
        setShoeList(result.data);
        closeLoading();
      } catch (err) {
        console.log(err);
      }
    };

    myAsync();
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
    return displayedShoeList.length == 0 ? (
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130355-1800920.png"
        alt=""
        className="img-fluid my-img"
      />
    ) : (
      displayedShoeList.map((shoe) => {
        return <ShoeItem key={shoe.id} item={shoe} />;
      })
    );
  };

  return (
    <div className="my-shoeList">
      <div className="row">{renderingUI()}</div>
      <div className="row mt-4  ">
        <div className="col-6"></div>
        <div className="my-pag__wrapper">
          <Pagination
            current={current}
            onChange={onChange}
            total={40}
            style={{
              width: "250px",
              float: "right",
            }}
          />
        </div>
      </div>
    </div>
  );
}
