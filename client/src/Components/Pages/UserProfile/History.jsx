import React, { useEffect, useState } from "react";
import orderService from "../../../services/orderService";
import OrderItem from "./OrderItem";
import "../../../css/OrderHistory.css";
export default function History() {
  const local = JSON.parse(localStorage.getItem("persist:root"));
  const idUser = JSON.parse(local.user).currentUser.payload._id;
  const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;
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
              <div>
                <span className="text-inforOrder">người nhận:{order.name}</span>
                <span className="text-inforOrder">SDT:{order.phone}</span>
                <span className="text-inforOrder">Địa chỉ đặt hàng:{order.address}</span>
                <span className="text-inforOrder">Trạng thái đơn hàng:{order.status}</span>
              </div>
              <OrderItem data={order}></OrderItem>
            </div>
          </div>
        );
      });
    }
    else {
      return (<div className="center">
        khong co don hang
      </div>)
    }
  };

  return (

    <div className="container">

      {rendering()}

    </div>

  );
}
