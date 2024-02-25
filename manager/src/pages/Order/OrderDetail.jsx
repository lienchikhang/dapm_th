import { Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
  const user = JSON.parse(currentUser);
  const navigate = useNavigate();

  const fetchingApi = async () => {
    try {
      const order = await axios({
        url: `https://api-gateway-dapm-th.onrender.com/api/order/?idOrder=${id}`,
        method: "GET",
        headers: {
          token: `Bearer ${user.payload.accessToken}`,
        },
      });
      console.log(order);
      return order.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(detail);

  useEffect(() => {
    fetchingApi()
      .then((res) => setDetail(res))
      .catch((err) => console.log(err));
  }, []);

  const renderingShoe = () => {
    return detail?.shoes.map((shoe) => {
      return (
        <tr key={shoe._id}>
          <td>
            <img className="d-inline" width="120px" src={shoe.img} alt="shoe" />
          </td>
          <td>
            <ul className="my-table-khang">
              <li>
                <span className="">{shoe.name}</span>
              </li>
              <li>
                <span className="">Size: {shoe.size}</span>
              </li>
            </ul>
          </td>
          <td>
            <span className="my-sl">{shoe.quantity}</span>
          </td>
          <td>
            <span className="my-sl">
              {(shoe.price * shoe.quantity).toLocaleString()}
            </span>
          </td>
          <td>
            <div></div>
          </td>
        </tr>
      );
    });
  };

  const renderingUI = () => {
    return (
      <div className="box-historyOrder">
        <div className="history__title">
          <span className="khang__heading-his">Mã đơn:</span>
          <Tag color="green">{detail?._id}</Tag>
        </div>
        <div>
          <table className="table table-bordered">
            <thead>
              <th>Người nhận</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ đặt hàng</th>
              <th>Trạng thái đơn hàng</th>
            </thead>
            <tbody>
              <tr>
                <td>{detail?.name}</td>
                <td>{detail?.phone}</td>
                <td>{detail?.address}</td>
                <td>
                  <Tag color="red">{detail?.status}</Tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-column">
          <table className="table table-bordered">
            <thead>
              <th>Hình ảnh</th>
              <th>Thông tin</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </thead>
            <tbody>{renderingShoe()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleComeBack = () => {
    navigate("/dashboard/orders/list");
  };

  return (
    <div>
      <button onClick={handleComeBack}>Quay tro ve</button>
      {renderingUI()}
    </div>
  );
}
