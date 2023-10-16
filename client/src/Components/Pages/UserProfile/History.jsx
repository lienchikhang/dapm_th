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
    return orderList.map((order) => {
      return (

        <div>
          <div>
            <span>{order.name}</span>
            <span>{order.phone}</span>
            <span>{order.address}</span>
          </div>
          <div className="row box-historyOrder">
            <OrderItem key={order._id} data={order}></OrderItem>
          </div>
        </div>
      );
    });
  };

  return (

    <div className="container">
      {rendering()}
    </div>

  );
}
