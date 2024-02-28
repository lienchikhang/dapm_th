import {
  Table,
  Tag,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Select,
  Space,
  Radio,
  notification,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
  const user = JSON.parse(currentUser);
  const [change, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchOrders, setSearchOrders] = useState();
  const [status, setStatus] = useState("Chưa giao");
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [day, setDay] = useState();
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

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/order`,
      method: "GET",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [
        console.log(res.data.orders),
        setOrders(res.data.orders),
        setSearchOrders(res.data.orders),
      ])
      .catch((err) => console.log(err));
  }, [change]);

  const changeStatusOrder = async (_id, textStatus) => {
    await axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/order/${_id}`,
      method: "PUT",
      data: {
        textStatus: textStatus,
      },
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          openNotification(
            "Đổi trạng thái đơn hàng thành công",
            "Trạng thái đơn hàng đã được cập nhập"
          );
          setChange(!change);
        }
      })
      .catch((err) =>
        openNotification(
          "đổi trạng thái đơn hàng thất bại",
          "Vui lòng thử lại lúc khác"
        )
      );
  };

  const deleteOrder = async (_id, record) => {
    console.log("record", record.shoes);
    await axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/order/${_id}`,
      method: "DELETE",
      data: {
        shoes: record.shoes,
      },
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => {
        openNotification("Xóa đơn hàng thành công", "Dữ liệu đã được cập nhập");
        setChange(!change);
      })
      .catch((err) => {
        console.log(err);
        openNotification("Xóa đơn hàng thất bại", "Vui lòng thử lại sau");
      });
  };

  const viewOrderDetail = (id) => {
    navigate(`detail/${id}`);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
    },
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
      render: (createAt) => {
        return <span>{formatDate(createAt)}</span>;
      },
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
        if (status === "Chưa giao") return <Tag color="red">Chưa giao</Tag>;
        else if (status === "Đang giao")
          return <Tag color="yellow">Đang giao</Tag>;
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
            <div className="d-flex justify-content-between">
              <div>
                <Select
                  name="status"
                  style={{
                    width: 120,
                  }}
                  value={record.status}
                  onChange={(value) => [changeStatusOrder(text, value)]}
                >
                  <Option value="Chưa giao" name="color">
                    Chưa giao
                  </Option>
                  <Option value="Đang giao" name="color">
                    Đang giao
                  </Option>
                  <Option value="Đã giao" name="color">
                    Đã giao
                  </Option>
                </Select>
              </div>
              <button
                onClick={() => {
                  deleteOrder(text, record);
                }}
                className="btn btn-danger"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
              <button
                onClick={() => {
                  // deleteOrder(text)
                  viewOrderDetail(record._id);
                }}
                className="btn btn-success"
              >
                <i class="fa-solid fa-info"></i>
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const onFinish = async () => {
    const data = {
      name: name,
      phone: phone,
      status: status,
      day: day,
    };
    console.log(data);
    await axios({
      url: "https://api-gateway-dapm-th.onrender.com/api/order/searchOrder/search",
      method: "POST",
      data: data,
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [setOrders(res.data.orders)])
      .catch((err) => console.log(err));
  };

  const renderingUI = () => {
    return <Table dataSource={orders} columns={columns} bordered />;
  };

  return (
    <div>
      <div>
        <Form
          onFinish={onFinish}
          name="basic"
          labelCol={{
            span: 12,
          }}
          style={{
            width: "100%",
          }}
          layout="inline"
        >
          <Form.Item label="Tên Khách hàng" name="NameUser">
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="Phone">
            <Input type="Number" onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>

          <Form.Item label="Ngày đặt" name="day">
            <DatePicker
              showToday={false}
              onChange={(date, dateString) => {
                setDay(dateString);
              }}
            />
          </Form.Item>

          <Form.Item label="Tình Trạng" name="status">
            <Select
              defaultValue={"Chưa giao"}
              onChange={(value) => setStatus(value)}
            >
              <option value="Chưa giao">Chưa giao</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </Select>
          </Form.Item>
        </Form>

        <Button
          className="ml-4"
          onClick={onFinish}
          type="primary"
          htmlType="submit"
        >
          Tìm kiếm
        </Button>
        <Button
          className="ml-4"
          onClick={() => {
            setChange(!change);
          }}
          type="primary"
          htmlType="submit"
        >
          Clear
        </Button>
      </div>
      <div>{renderingUI()}</div>
    </div>
  );
}
