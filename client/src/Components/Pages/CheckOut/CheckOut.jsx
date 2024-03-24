import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfoOrder from "./InfoOrder";
import { useDispatch, useSelector } from "react-redux";
import ShoeItem from "./ShoeItem";
import "../../../css/CheckOut.css";
import { notification } from "antd";
import checkOutService from "../../../services/checkOutService";
export default function CheckOut() {
  const navigate = useNavigate();
  const cartUser = useSelector((state) => state.cart.cartUser);
  const orderInfo = useSelector((state) => state.checkOutInfo);
  const local = JSON.parse(localStorage.getItem("persist:root"));
  const idUser = JSON.parse(local.user).currentUser._id;
  const accessToken = JSON.parse(local.user).currentUser.accessToken;

  //ant design
  const Context = React.createContext({
    name: "Default",
  });
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  notification.config({
    placement: "topRight",
    top: 100,
    duration: 3,
    rtl: true,
  });

  const openNotification = (message, description) => {
    notification.open({
      message: message,
      description: description,
      style: {
        backgroundColor: "#ffffff",
        border: "2px solid #52c41a",
        fontWeight: "700",
      },
    });
  };

  let total = 0;

  const validateform = () => {
    const { name, phone, address, methodPay } = orderInfo.Info;
    return (
      name &&
      phone.length === 10 &&
      address &&
      methodPay &&
      name !== "" &&
      phone !== "" &&
      address !== "" &&
      methodPay !== ""
    );
  };

  if (cartUser?.shoes) {
    total = cartUser.shoes.reduce((accumulate, curVar) => {
      return accumulate + curVar.price * curVar.quantity;
    }, 0);
  }
  const makeOrder = async () => {
    if (validateform() && cartUser.shoes) {
      if (orderInfo.Info.methodPay === "COD") {
        await checkOutService.makeOrderbyiduser(
          idUser,
          "POST",
          {
            shoes: cartUser.shoes,
            ...orderInfo,
          },
          accessToken
        );
        openNotification(
          "Đã đặt hàng thành công",
          "Vui lòng kiểm tra đơn hàng"
        );
        setTimeout(navigate("/"), 4000);
      } else {
        await checkOutService.paymentOnline(
          idUser,
          "POST",
          {
            shoes: cartUser.shoes,
            ...orderInfo,
          },
          accessToken
        );
      }
    } else if (orderInfo.Info.phone === 10) {
      openNotification("Số điện thoại phải có 10 chữ số", "Vui lòng nhập lại");
    } else {
      openNotification(
        "Bạn chưa điền đầy đủ thông tin nhận hàng",
        "Vui lòng điền đầy đủ thông tin"
      );
    }
  };
  return (
    <div className="my-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h3 className="my-title">Thanh Toán</h3>
            <h4 className="sub-title">Thông tin người nhận</h4>
            <InfoOrder></InfoOrder>
          </div>
          <div className="col-4">
            <div className="wrapper">
              <p className="title mb-3">Đơn hàng của bạn</p>
              <div className="checkout__list">
                <div className="max__height">
                  {cartUser?.shoes &&
                    cartUser?.shoes.map((shoe, index) => {
                      return <ShoeItem key={index} data={shoe} />;
                    })}
                </div>
              </div>
              <div className="d-flex justify-content-between checkout__sub-title mt-4">
                <span>Tổng sản phẩm:</span>
                <span>{cartUser?.shoes.length}</span>
              </div>
              <div className="d-flex justify-content-between checkout__sub-title">
                <span>Tổng tiền</span>
                <span>{total.toLocaleString()}</span>
              </div>
              <button onClick={() => makeOrder()} className="my-btn">
                Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
