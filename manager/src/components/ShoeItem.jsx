import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDetail } from "../redux/reducer/shoeDetailReducer";
export default function ShoeItem({ data, showModal }) {
  const { _id, name, price, img, category, color, size, desc } = data;
  const dispatch = useDispatch();
  const convertStr = (string) => {
    if (string.length > 10) return string.slice(0, 10) + "...";
    return string;
  };

  const handleEdit = (idShoe) => {
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/${idShoe}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        dispatch(getDetail(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    showModal();
  };

  return (
    <tr>
      <td>{convertStr(_id)}</td>
      <td>{convertStr(name)}</td>
      <td>
        <img src={img} alt="" width={100} />
      </td>
      <td>{price.toLocaleString()}</td>
      <td>{color}</td>
      <td>{category.join("-")}</td>
      <td></td>
      <td>
        <button
          className="btn btn-info mx-2"
          onClick={() => {
            handleEdit(_id);
          }}
        >
          <EditOutlined />
        </button>
        <button className="btn btn-danger">
          <DeleteOutlined />
        </button>
      </td>
    </tr>
  );
}
