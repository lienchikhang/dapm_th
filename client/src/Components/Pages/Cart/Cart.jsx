import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import "../../../css/Cart.css";
import cartService from "../../../services/cart_KService";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Spin } from "antd";
import "../../../css/ShoeList.css";

export default function Cart() {
  const cartUser = useSelector((state) => state.cartReducer.cartUser);
  const [cartList, setCartList] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const closeLoading = () => {
    setLoading(false);
  };

  const openLoading = () => {
    setLoading(true);
  };
  let total = 0;
  if (cartUser) {
    total = cartUser.shoes.reduce((accumulate, curVar) => {
      return accumulate + curVar.price * curVar.quantity;
    }, 0);
  }

  //call api
  useEffect(() => {
    let callApi = async () => {
      const local = JSON.parse(localStorage.getItem("userToken"));
      const { _id, accessToken } = local;
      try {
        const result = await cartService.getCart(_id, accessToken);
        closeLoading();
        dispatch({
          type: "UPDATE_CART_LIST",
          payload: result.data.cart,
        });
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  useEffect(() => {
    setCartList(cartUser);
  }, [cartUser]);

  return (
    <div>
      <div className="container cart__wrapper">
        <div className={`loadingScreen ${loading ? "active" : ""}`}>
          <ConfigProvider
            theme={{
              components: {
                Spin: {
                  /* here is your component tokens */
                  colorPrimary: "#1677ff",
                  dotSizeLG: 60,
                },
              },
            }}
          >
            <Spin size="large" spinning={loading} />
          </ConfigProvider>
        </div>
        <div className="row">
          <div className="col-12">
            \<h1 className="cart__title">Giỏ hàng</h1>
            <table className="table table-borderless">
              <thead>
                <th className="my-w">SẢN PHẨM</th>
                <th className="my-w"></th>
                <th className="my-w">SỐ LƯỢNG</th>
                <th className="my-w">GIÁ</th>
                <th className="my-w">TỔNG</th>
                <th className="my-w"></th>
              </thead>
            </table>
            <div className="max__height">
              <table className="table table-borderless">
                <tbody>
                  {cartList?.shoes?.length &&
                    cartList.shoes.reverse().map((shoe, index) => {
                      return (
                        <CartItem
                          key={index}
                          data={shoe}
                          cartId={cartUser._id}
                          idUser={cartUser.userId}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <CartFooter total={total} />
        </div>
      </div>
    </div>
  );
}
