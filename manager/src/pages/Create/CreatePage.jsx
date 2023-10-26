import React, { useEffect, useState } from "react";

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
} from "antd";
import { Option } from "antd/es/mentions";
const onFinish = () => {
  console.log('success')
}
const onFinishFailed = () => {
  console.log('faild')
}
export default function CreatePage() {
  const [shoe, setShoe] = useState({})
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16
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
        <Input name="name" />
      </Form.Item>

      <Form.Item
        label="Giá tiền"
        name="price "
        rules={[
          {
            required: true,
            message: "Vui Lòng nhập giá tiền!",
          },
        ]}
      >
        <Input name="price" />
      </Form.Item>

      <Form.Item
        label="Hình ảnh"
        name="image"
        rules={[
          {
            required: false,
            message: "Vui Lòng nhập link hình!",
          },
        ]}
      >
        <Input name="image" />
      </Form.Item>
      <Form.Item
        label="Kích thước 37"
        name="size"
        rules={[
          {
            required: false,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <Space
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Input
            name="sizeQty1"
          />
        </Space>
      </Form.Item>

      <Form.Item
        label="Kích thước 38"
        name="size"
        rules={[
          {
            required: false,
            message: "Size phải có số lượng!",
          },
        ]}
      >
        <Space
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Input
            name="cs"
          />
        </Space>
      </Form.Item>

      <Form.Item
        label="Hãng"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Select
          name="type"
          defaultValue="Adidas"
          style={{
            width: 120,
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
        </Select>
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
  )
}
