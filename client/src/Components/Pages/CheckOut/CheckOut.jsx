import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoOrder from './InfoOrder'
import { useDispatch, useSelector } from "react-redux";
import ShoeItem from './ShoeItem'
import "../../../css/CheckOut.css";
import checkOutService from '../../../services/checkOutService';
export default function CheckOut() {
    const navigate=useNavigate()
    const cartUser = useSelector((state) => state.cart.cartUser);
    const orderInfo = useSelector((state) => state.checkOutInfo)
    const local = JSON.parse(localStorage.getItem("persist:root"));
    const idUser = JSON.parse(local.user).currentUser.payload._id;
    const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;
    let total = 0;
    const validateform=()=>{
        const {name,phone,address,methodPay}=orderInfo.Info
        return name&&phone&&address&&methodPay&&name!==''&&phone!==''&&address!==''&&methodPay!==''
    }
    if (cartUser?.shoes) {
        total = cartUser.shoes.reduce((accumulate, curVar) => {
            return accumulate + curVar.price * curVar.quantity;
        }, 0);
    }
    const makeOrder =async () => {
        if(validateform){
            if(orderInfo.Info.methodPay==="COD"){
                await checkOutService.makeOrderbyiduser(idUser, "POST", {
                    shoes: cartUser.shoes,
                    ...orderInfo
                }, accessToken)
                navigate("/")
            }
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-7 d-flex flex-column'>
                    <span className='title'>Thanh Toán</span>
                    <span className='title'>Thông tin người nhận</span>
                    <InfoOrder></InfoOrder>
                </div>
                <div className=' col-5 '>
                    <div className='d-flex flex-column align-items-center '>
                        <span className='title'>Đơn hàng của bạn</span>
                        <div className='max__height box-cart'>
                            {cartUser?.shoes &&
                                cartUser?.shoes.map((shoe, index) => {
                                    return (
                                        <ShoeItem
                                            key={index}
                                            data={shoe}
                                        />
                                    );
                                })}
                        </div>
                        <span className='mt-4 label-text'>Tổng số lượng sản phẩm:{cartUser?.shoes.length} </span>
                        <span className=' label-text'>Tổng giá trị đơn hàng {total}</span>
                        <button className='btn btn-checkout' onClick={() => { makeOrder() }}>Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
