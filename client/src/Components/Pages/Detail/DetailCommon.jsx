import React, { useEffect, useState } from "react";
import "../../../css/Detail.css";
import shoeService from "../../../services/shoeService";
import { useSelector } from "react-redux";
import { Select } from "antd";
export default function DetailCommon() {
  const [detail, setDetail] = useState({});
  const [block, setBlock] = useState(false);

  const idShoe = useSelector((state) => state.shoeReducer.shoe);
  useEffect(() => {
    shoeService
      .getByID(idShoe, "GET")
      .then((res) => {
        console.log(res);
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [block]);

  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const { name, price, img, desc, size } = detail;
  return (
    <div className="container mr-5 mt-5">
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-row">
            <div className="d-flex flex-column">
              <img
                alt="img-child"
                className="img-child border border-black"
                src="https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg"
              />
              <img
                alt="img-child"
                className="img-child border border-black mt-2"
                src="https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg"
              />
              <img
                alt="img-child"
                className="img-child border border-black mt-2"
                src="https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg"
              />
            </div>
            <img
              alt="img"
              className=""
              width={"395px"}
              height={"395px"}
              src={img}
            />
          </div>
          <div className="mb-4">
            <span>Mô tả</span>
            <p style={{ fontSize: "18px", fontWeight: "400" }}>{desc}</p>
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-content-center">
          <span className="" style={{ fontSize: "24px", fontWeight: "400" }}>
            {name}
          </span>
          <span className="" style={{ fontSize: "28px", fontWeight: "400" }}>
            {price}
          </span>
          <div>
            <Select
              labelInValue
              defaultValue={{
                value: size && size[0].ss,
                label: size && size[0].ss,
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
            <span className="pl-3">Size</span>
          </div>
          <button className="btn Btn-Add mt-4">Thêm vào giỏ hàng</button>
          <table
            className="table-borderless mt-4"
            width={"75%"}
            style={{ fontSize: "16px" }}
          >
            <tr>
              <td>Màu sắc</td>
              <td>Đen</td>
            </tr>
            <tr>
              <td>Hãng</td>
              <td>Vans</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
