import React, { useState } from "react";
import "../../../css/profile.css";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";
import { useSelector } from "react-redux";
export default function Default() {
  const [value, setValue] = useState(1);
  const { username, password } = useSelector(
    (state) => state.user.currentUser.payload
  );

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="default__wrapper">
      <div className="heading">
        <h4>Hồ sơ của tôi</h4>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="form">
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
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
            label="Tên đăng nhập"
            name="username"
            initialValue={username}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            initialValue={password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            wrapperCol={{
              span: 16,
            }}
          >
            <DatePicker onChange={onChangeDate} />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            wrapperCol={{
              span: 18,
            }}
          >
            <Radio.Group onChange={onChangeGender} value={value}>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            wrapperCol={{
              span: 18,
            }}
          >
            <InputNumber min={1} max={10} initialValue={123456} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
