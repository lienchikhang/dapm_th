import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(currentUser);
    axios({
      url: `http://localhost:5000/api/order`,
      method: "GET",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [console.log(res), setOrders(res.data.orders)])
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "methodPay",
      key: "methodPay",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status == "Chưa giao") return <Tag color="red">Chưa giao</Tag>;
        return <Tag color="green">Đã giao</Tag>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "action",
      render: (text, record) => {
        // Sử dụng record để lấy giá trị của dataIndex "status"
        return (
          <div>
            {record.status == "Chưa giao" ? <button>Xac nhan</button> : <></>}
          </div>
        );
      },
    },
  ];

  const renderingUI = () => {
    return <Table dataSource={orders} columns={columns} bordered />;
  };

  return <div>{renderingUI()}</div>;
}
