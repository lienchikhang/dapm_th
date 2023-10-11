import React, { useEffect, useState } from "react";
import "../../../css/search.css";
import { useDispatch } from "react-redux";
import { searching } from "../../../reducers/searchReducer";

export default function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(searching(search));
  }, [search]);
  return (
    <div className="pb-3 d-flex justify-content-between">
      <div className="search-section">
        <input type="text" placeholder="Tìm kiếm" onChange={handleSearch} />
        {/* <button className="">Search</button> */}
      </div>
      <div className="filter-section">
        <i class="fa-solid fa-filter"></i>
        <select name="" id="">
          <option value="">giá</option>
          <option value="">tên</option>
        </select>
      </div>
    </div>
  );
}
