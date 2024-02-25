import React, { useEffect, useMemo, useRef, useState } from "react";

import "./create.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  notification,
} from "antd";

import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreatePage() {
  const { TextArea } = Input;
  const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
  const user = JSON.parse(currentUser);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Adidas");
  const [color, setColor] = useState("white");
  const [size37, setSize37] = useState({});
  const [size38, setSize38] = useState({});
  const [size39, setSize39] = useState({});
  const [size40, setSize40] = useState({});
  const [size41, setSize41] = useState({});
  const [size42, setSize42] = useState({});
  const [size43, setSize43] = useState({});
  const navigate = useNavigate();
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
  const onFinish = async () => {
    const newSize = [];
    newSize.push(size37, size38, size39, size40, size41, size42, size43);
    const newShoe = { name, price, img, size: newSize, desc, type, color };
    await axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/create`,
      method: "POST",
      data: newShoe,
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          openNotification("Thêm thành công", "Giày mới đã được thêm vào");
          setTimeout(navigate("/dashboard/products/list"), 5000);
        }
      })
      .catch((err) => {
        openNotification("Tên giày đã tồn tại", "Vui lòng chọn tên khác");
      });
  };
  const onFinishFailed = () => {
    console.log("faild");
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên giày"
        name="name"
        rules={[
          {
            required: true,
            message: "Vui Lòng nhập tên giày!",
          },
        ]}
      >
        <Input
          maxLength={15}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Giá tiền"
        name="price"
        rules={[
          {
            required: true,
            message: "Vui Lòng nhập giá tiền!",
          },
        ]}
      >
        <InputNumber
          min={500000}
          max={10000000}
          name="price"
          onChange={(value) => setPrice(value)}
        />
      </Form.Item>

      <Form.Item
        label="Hình ảnh"
        name="image"
        rules={[
          {
            required: true,
            message: "Vui Lòng nhập link hình!",
          },
        ]}
      >
        <Input name="image" onChange={(e) => setImg(e.target.value)} />
      </Form.Item>
      <img style={{ marginLeft: "20%" }} width={"200px"} src={img} alt="" />
      <Form.Item
        label="Mô tả"
        name="desc"
        rules={[
          {
            required: true,
            message: "Vui Lòng nhập mô tả!",
          },
        ]}
      >
        <TextArea
          rows={4}
          onChange={(e) => [setDesc(e.target.value)]}
          maxLength={200}
        />
      </Form.Item>
      <Form.Item
        label="Hãng"
        name="type"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn hãng!",
          },
        ]}
      >
        <Select
          name="type"
          value={type}
          style={{
            width: 120,
          }}
          onChange={(value) => {
            setType(value);
          }}
        >
          <Option value="Adidas" name="type">
            Adidas
          </Option>
          <Option value="Nike" name="type">
            Nike
          </Option>
          <Option value="Puma" name="type">
            Puma
          </Option>
          <Option value="Vans" name="type">
            Vans
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Màu sắc"
        name="color"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn màu sắc!",
          },
        ]}
      >
        <Select
          name="color"
          value={color}
          style={{
            width: 120,
          }}
          onChange={(value) => {
            setColor(value);
          }}
        >
          <Option value="white" name="color">
            Trắng
          </Option>
          <Option value="black" name="color">
            Đen
          </Option>
          <Option value="red" name="color">
            Đỏ
          </Option>
          <Option value="blue" name="color">
            Xanh dương
          </Option>
          <Option value="green" name="color">
            Xanh lá
          </Option>
          <Option value="yellow" name="color">
            Vàng
          </Option>
          <Option value="orange" name="color">
            Cam
          </Option>
          <Option value="pink" name="color">
            Hồng
          </Option>
          <Option value="yellow" name="color">
            Vàng
          </Option>
          <Option value="purple" name="color">
            Tím
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Kích thước 37"
        name="size 37"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize37({ ss: 37, cs: value })}
        />
      </Form.Item>

      <Form.Item
        label="Kích thước 38"
        name="size 38"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize38({ ss: 38, cs: value })}
        />
      </Form.Item>
      <Form.Item
        label="Kích thước 39"
        name="size 39"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize39({ ss: 39, cs: value })}
        />
      </Form.Item>
      <Form.Item
        label="Kích thước 40"
        name="size 40"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize40({ ss: 40, cs: value })}
        />
      </Form.Item>
      <Form.Item
        label="Kích thước 41"
        name="size 41"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize41({ ss: 41, cs: value })}
        />
      </Form.Item>
      <Form.Item
        label="Kích thước 42"
        name="size 42"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize42({ ss: 42, cs: value })}
        />
      </Form.Item>
      <Form.Item
        label="Kích thước 43"
        name="size 43"
        rules={[
          {
            required: true,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={1000}
          onChange={(value) => setSize43({ ss: 43, cs: value })}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
}
