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
import moment from 'moment';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import UserService from "../../../services/UserService";
import { genAlertStyle } from "antd/es/alert/style";
export default function Default() {
  const [value, setValue] = useState();//value la gender
  const [birtday, setBirtday] = useState();
  const [phone, setPhone] = useState();
  const [change, setChange] = useState(false)
  const { username, password } = useSelector(
    (state) => state.user.currentUser.payload
  );
  const dateFormat = "YYYY/MM/DD";
  const disabledDate = (current) => {
    return (current.year() - 18 < 2005)
  };

  const local = JSON.parse(localStorage.getItem("persist:root"));
  const idUser = JSON.parse(local.user).currentUser.payload._id;
  const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let getUserInfo = async () => {
      const userInfo = await UserService.takeInforUser(idUser, 'GET', accessToken)
      let info = userInfo.data.result
      setValue(info.gender)
      setPhone(info.phone)
      setBirtday(info.birtday)
      setLoading(!loading)
    }
    getUserInfo()
  }, [change])
  const onFinish = async (values) => {
    const data = {
      ...values,
      phone: phone,
      birtday: birtday,
      gender: value
    }
    await UserService.changeInfor(idUser, 'PUT', data, accessToken)
    setChange(!change)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) => {
    setBirtday(dateString)
  };
  const onChangePhone = (value) => {
    setPhone(value)
  }

  const onChangeGender = (e) => {
    setValue(e.target.value);
  };

  const rendering = () => {
    return (loading ? (
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
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name='birtday'
              wrapperCol={{
                span: 16,
              }}
            >
              <DatePicker picker="year" placeholder={birtday} disabledDate={disabledDate} format={dateFormat} showToday={false} onChange={onChangeDate} />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              wrapperCol={{
                span: 18,
              }}
            >
              <Radio.Group onChange={onChangeGender} value={value}>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                <Radio value="Khác">Khác</Radio>
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
                  message: "Please input your Phone!",
                }
              ]}
            >
              <InputNumber onChange={onChangePhone} style={{ width: '100%' }} minLength={10} maxLength={10} />
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
    ) : (false))
  }
  return (
    <div className="default__wrapper">
      {rendering()}
    </div>
  );
}
