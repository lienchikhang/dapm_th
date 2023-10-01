import React, { useEffect } from "react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import "../../../css/Cart.css";
import cartService from "../../../services/cart_KService";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const cartUser = useSelector((state) => state.cartReducer.cartUser);

  const dispatch = useDispatch();

  useEffect(() => {
    let callApi = async () => {
      //get id user in local
      const local = JSON.parse(localStorage.getItem("userToken"));
      const { _id, accessToken } = local;
      //call api
      try {
        const result = await cartService.getCart(_id, accessToken);
        console.log("this is cart", result);
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

  let totalPrice = cartUser.shoes.reduce((accumulate, curVal) => {
    return accumulate + curVal.price * curVal.quantity;
  }, 0);

  return (
    <div>
      <div className="container cart__wrapper">
        <div className="row">
          <div className="col-12">
            <h1 className="cart__title">Giỏ hàng</h1>
            <table className="table table-borderless">
              <thead>
                <th>SẢN PHẨM</th>
                <th></th>
                <th>SỐ LƯỢNG</th>
                <th>GIÁ</th>
                <th>TỔNG</th>
                <th></th>
              </thead>
              <tbody>
                {cartUser.shoes.reverse().map((shoe, index) => {
                  return <CartItem key={index} data={shoe} />;
                })}
              </tbody>
            </table>
          </div>
          <CartFooter total={totalPrice} />
        </div>
      </div>
    </div>
  );
}
