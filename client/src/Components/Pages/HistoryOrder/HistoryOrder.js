import React, { useEffect, useState } from 'react'
import orderService from '../../../services/orderService'

export default function HistoryOrder() {
    const local = JSON.parse(localStorage.getItem("persist:root"));
    const idUser = JSON.parse(local.user).currentUser.payload._id;
    const accessToken = JSON.parse(local.user).currentUser.payload
        .accessToken;
    const [orderList, setOrderList] = useState()
    useEffect(() => {
        let getOrderList = async () => {
            const result = await orderService.getAllOrderByidUser(idUser,accessToken)
            setOrderList(result)
        }
        getOrderList()
    }, [])
    return (
        <div>HistoryOrder</div>
    )
}
