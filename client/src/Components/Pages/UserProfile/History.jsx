import React, { useEffect, useState } from "react";
import orderService from "../../../services/orderService";
import OrderItem from "./OrderItem";
import "../../../css/OrderHistory.css";
import { Tag } from "antd";
export default function History() {
  const local = JSON.parse(localStorage.getItem("persist:root"));
  const idUser = JSON.parse(local.user).currentUser._id;
  const accessToken = JSON.parse(local.user).currentUser.accessToken;
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    let getOrderList = async () => {
      const takeData = await orderService.getAllOrderByidUser(
        idUser,
        "GET",
        accessToken
      );
      setOrderList(takeData.data.result);
    };
    getOrderList();
  }, []);

  const rendering = () => {
    if (orderList.length > 0) {
      return orderList.reverse().map((order) => {
        return (
          <div className="mt-4" key={order._id}>
            <div className="box-historyOrder">
              <div className="history__title">
                <span className="khang__heading-his">Mã đơn:</span>
                <Tag color="green">{order._id}</Tag>
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
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.address}</td>
                      <td>
                        <Tag color="red">{order.status}</Tag>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <OrderItem data={order}></OrderItem>
            </div>
          </div>
        );
      });
    } else {
      return <div className="center">khong co don hang</div>;
    }
  };

  return <div className="container">{rendering()}</div>;
}
