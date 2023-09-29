import React, { useEffect, useState } from "react";
import shoeService from "../../../services/shoeService";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "../../../css/ShoeDetail.css";
import ShoeSuggestList from "./ShoeSuggestList";
import { useNavigate } from "react-router-dom";

export default function ShoeDetail() {
  const [block, setBlock] = useState();
  const [viewingshoe, setViewingShoe] = useState({});
  const idShoe = useSelector((state) => state.shoeReducer.shoe);
  const navigate = useNavigate();
  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  useEffect(() => {
    shoeService
      .getByID(idShoe, "GET")
      .then((res) => {
        setViewingShoe(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderingUI = () => {
    const { name, img, price, size, desc } = viewingshoe;
    return (
      <div className="container shoeDetail__wrapper">
        <div className="row">
          <div className="col-8">
            <div className="shoe__img p-4">
              <img src={img} alt="" className="my-img img-fluid" />
            </div>
          </div>
          <div className="col-4">
            <div className="shoe__info">
              <h3 className="shoe__title">{name}</h3>
              <p className="shoeDetail__price">{price}</p>
              <div className="shoeDetail__select">
                <Select
                  labelInValue
                  defaultValue={{
                    value: "",
                    label: "Chọn",
                  }}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={
                    size &&
                    size.map((item) => {
                      return {
                        value: item.ss,
                        label: item.ss,
                      };
                    })
                  }
                />
                <span className="ml-4">Size</span>
              </div>
              <button
                className="shoeDetail__btn"
                onClick={() => {
                  console.log("added ");
                }}
              >
                Thêm vào giỏ hàng
              </button>
              <ul className="shoeDetail__subInfo">
                <li>
                  <span>Màu sắc</span>
                  <span>black</span>
                </li>
                <li>
                  <span>Nhãn hiệu</span>
                  <span>Vans</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="shoeDetail__desc">
              <h3 className="desc__title">Mô tả</h3>
              <p className="desc__body">
                Được nhà thiết kế ưu ái khi sử dụng tone màu Tradewinds mới lạ,
                Vans Old Skool 36 DX thể hiện sự độc đáo và quyến rũ đầy tinh
                tế. “Tradewinds" là cụm từ để chỉ những cơn gió thường xuyên
                thổi từ hướng Đông ra phía Tây vùng nhiệt đới trên bề mặt biển.
                Gió này thường xuất hiện ở khu vực xung quanh xích đạo và thường
                mang theo một cảm giác dịu mát và thoải mái.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3 className="suggest__title">Gợi ý</h3>
            <ShoeSuggestList />
          </div>
        </div>
      </div>
    );
  };
  return <div>{renderingUI()}</div>;
}
