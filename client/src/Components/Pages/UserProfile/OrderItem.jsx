import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function OrderItem(order) {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setData(order.data.shoes);
    if (change) {
      setList(order.data.shoes);
    } else {
      setList(order.data.shoes.slice(0, 2));
    }
  }, [change]);

  const handleDetailShoe = (id) => {
    navigate(`/product/shoes/${id}`);
  };
  const loadingMore = () => {
    setChange(true);
  };
  const renderingShoe = () => {
    return list.map((shoe) => {
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
            <div>
              <button
                onClick={() => handleDetailShoe(shoe._id)}
                className="khang-btn"
              >
                Mua lần nữa
              </button>
              <button className="khang-btn-sub">Sản phẩm tương tự</button>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
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
      {order.data.shoes.length >= 2 && !change ? (
        <button onClick={() => loadingMore()} className="btn ">
          <i class="fa-solid fa-angle-down"></i>
        </button>
      ) : (
        false
      )}
    </div>
  );
}
