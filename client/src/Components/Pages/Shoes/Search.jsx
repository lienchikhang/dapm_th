import React, { useEffect, useState } from "react";
import "../../../css/search.css";
import { useDispatch, useSelector } from "react-redux";
import { searching } from "../../../reducers/searchReducer";
import { Tag } from "antd";
import { updateCate } from "../../../reducers/navbar";
import { updateFilter } from "../../../reducers/FilterReducer";

export default function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);
  const totalFinded = useSelector((state) => state.filter.totalFindedProduct);
  const cates = useSelector((state) => state.navbar.navItem.payload);
  console.log("filter", filter);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(searching(search));
  }, [search]);

  const handleDeleteFilter = () => {
    dispatch(
      updateCate({
        navItem: [],
        selectedCate: "",
        qPrice: 0,
        qSize: [],
      })
    );
    dispatch(updateFilter(null));
  };

  return (
    <div className="pb-3 d-flex justify-content-between my-filter__wrapper">
      <span>{totalFinded} sản phẩm tìm thấy</span>
      <div className="filter__section">
        <span>{filter?.type && <Tag color="green">{filter.type}</Tag>}</span>
        <span>{filter?.color && <Tag color="orange">{filter.color}</Tag>}</span>
        <span>
          {filter?.price && (
            <Tag color="blue">{filter.price.toLocaleString()}</Tag>
          )}{" "}
        </span>
        <span>
          {filter?.size &&
            filter.size.map((item) => <Tag color="purple">{item}</Tag>)}{" "}
        </span>
      </div>
      <button onClick={handleDeleteFilter}>Xóa lọc</button>
      <div className="my-filter__bar"></div>
    </div>
  );
}
