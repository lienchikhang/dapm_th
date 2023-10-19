import React from "react";
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function OrderItem(order) {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [change, setChange] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setData(order.data.shoes)
    if (change) {
      setList(order.data.shoes)
    }
    else {
      setList(order.data.shoes.slice(0, 2))
    }
  }, [change])

  const handleDetailShoe = (id) => {
    navigate(`/product/shoes/${id}`)
  }
  const loadingMore = () => {
    setChange(true)
  }
  const renderingShoe = () => {
    return list.map((shoe) => {
      return (
        <div className="row mt-2" key={shoe._id}>
          <div className="col">
            <div className="d-flex flex-row">
              <img className="d-inline" width="150px" src={shoe.img} alt="shoe" />
              <div className="d-flex flex-column pl-2">
                <span className="text-title">{shoe.name}</span>
                <span className="text-title">Số lượng:{shoe.quantity}</span>
                <span className="text-title">Size:{shoe.size}</span>
                <span className="text-title">{shoe.price * shoe.quantity}</span>
              </div>
            </div>
          </div>
          <div className="col center-btn mr-4">
            <button onClick={() => handleDetailShoe(shoe._id)} className="btn btn-checkout">Mua lần nữa</button>
            <button className="btn btn-checkout mt-2">Sản phẩm tương tự</button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="d-flex flex-column">
      {renderingShoe()}
      {order.data.shoes.length >= 2 && !change ? (
        <button onClick={() => loadingMore()} className="btn "><i class="fa-solid fa-angle-down"></i></button>
      ) : (false)}
    </div>);
}
