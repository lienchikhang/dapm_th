import React, { useEffect, useState } from "react";
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
import moment from "moment";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import UserService from "../../../services/UserService";
import { genAlertStyle } from "antd/es/alert/style";
export default function Default() {
  const [value, setValue] = useState(); //value la gender
  const [birtday, setBirtday] = useState();
  const [phone, setPhone] = useState();
  const [change, setChange] = useState(false);
  const { username, password } = useSelector(
    (state) => state.user.currentUser.payload
  );
  const dateFormat = "YYYY/MM/DD";
  const local = JSON.parse(localStorage.getItem("persist:root"));
  const idUser = JSON.parse(local.user).currentUser.payload._id;
  const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;
  const [loading, setLoading] = useState(false);
  function disabledDate(current) {
    // Lấy ngày hiện tại
    const today = new Date();
    // Đặt ngày tối thiểu là 1900
    const minDate = new Date("1900-01-01");
    // Đặt ngày tối đa là 2005
    const maxDate = new Date("2005-12-31");
    // So sánh ngày hiện tại với khoảng thời gian đã đặt
    return (
      current && (current < minDate || current > maxDate || current > today)
    );
  }
  useEffect(() => {
    let getUserInfo = async () => {
      const userInfo = await UserService.takeInforUser(
        idUser,
        "GET",
        accessToken
      );
      let info = userInfo.data.result;
      console.log("userinfo", info);
      setValue(info.gender);
      setPhone(info.phone);
      setBirtday(info.birtday);
      setLoading(!loading);
    };
    getUserInfo();
  }, [change]);
  const onFinish = async (values) => {
    const data = {
      ...values,
      phone: phone,
      birtday: birtday,
      gender: value,
    };
    await UserService.changeInfor(idUser, "PUT", data, accessToken);
    setChange(!change);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) => {
    setBirtday(dateString);
  };
  const onChangePhone = (value) => {
    setPhone(value);
  };

  const onChangeGender = (e) => {
    setValue(e.target.value);
  };

  const rendering = () => {
    return loading ? (
      <div>
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
              username: username,
              phone: phone,
              gender: value,
              password: password,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt, và ít nhất 8 ký tự.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="birtday"
              wrapperCol={{
                span: 16,
              }}
            >
              <DatePicker
                disabledDate={disabledDate}
                placeholder={birtday}
                format={dateFormat}
                showToday={false}
                onChange={onChangeDate}
              />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              wrapperCol={{
                span: 18,
              }}
            >
              <Radio.Group
                onChange={onChangeGender}
                value={value}
                defaultValue={value}
              >
                <Radio value={1}>Nam</Radio>
                <Radio value={0}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              wrapperCol={{
                span: 18,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  minLength: 10,
                  maxLength: 10,
                  message: "Số điện thoại phải có 10 ký tự",
                },
              ]}
            >
              <InputNumber
                prefix={"+84"}
                onChange={onChangePhone}
                style={{ width: "100%" }}
              />
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
    ) : (
      false
    );
  };
  return <div className="default__wrapper">{rendering()}</div>;
}
