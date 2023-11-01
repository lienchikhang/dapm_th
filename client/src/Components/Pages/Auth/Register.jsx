import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { Button, DatePicker, Input, Steps, message } from "antd";
import Lottie from "lottie-react";
import registerLottie from "../../../utils/register.json";
import "../../../css/register.css";
import { validate } from "../../../utils/validate";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form } from "react-router-dom";

export default function Register() {
  const valUsername = useRef();
  const valPassword = useRef();
  const valRePassword = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [user, setUser] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [current, setCurrent] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [userBirth, setUserBirth] = useState(0);

  //func support UI
  const onChangeDate = (value) => {
    console.log("onOk: ", value.toString());
    setUserBirth(value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value.toString());
    setUserBirth(value);
  };

  useEffect(() => {
    setUser({
      ...user,
      birth: userBirth,
    });
  }, userBirth);

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const handleChangeInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  console.log("user", user);
  //rendering UI
  const { RangePicker } = DatePicker;
  const steps = [
    {
      title: <UserOutlined size={48} />,
      content: (
        <div className="register__content">
          <div className="form-group">
            <label htmlFor="">* Tên tài khoản</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id
              aria-describedby="helpId"
              placeholder="Username"
              required={true}
              value={user.username}
              onChange={handleChangeInfo}
            />
            <span style={{ color: "red" }} ref={valUsername}></span>
          </div>
          <div className="form-group">
            <label htmlFor="">* Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={user.password}
              onChange={handleChangeInfo}
            />
            <span style={{ color: "red" }} ref={valPassword}></span>
          </div>
          <div className="form-group">
            <label htmlFor="">*Nhập lại mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="repassword"
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span style={{ color: "red" }} ref={valRePassword}></span>
          </div>
        </div>
      ),
    },
    {
      title: <SolutionOutlined />,
      content: (
        <div className="register__content">
          <div className="form-group">
            <label htmlFor="" className="d-block">
              Năm sinh
            </label>
            <DatePicker
              onChange={onChangeDate}
              onOk={onOk}
              format={"DD/MM/YYYY"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              id
              aria-describedby="helpId"
              placeholder="Số điện thoại"
              value={user.phone}
              onChange={handleChangeInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Giới tính</label>
            <div className="">
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="gender"
                  id
                  aria-describedby="helpId"
                  placeholder="Số điện thoại"
                  value={1}
                  onChange={handleChangeInfo}
                />
                <label htmlFor="">Nam</label>
              </div>
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="gender"
                  id
                  aria-describedby="helpId"
                  placeholder="Số điện thoại"
                  value={0}
                  onChange={handleChangeInfo}
                />
                <label htmlFor="">Nữ</label>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <SmileOutlined />,
      content: (
        <div>
          <h4 className="text-center mb-4">Điều khoản sử dụng</h4>
          <ul className="px-3">
            <li className="mb-3">
              Bằng cách truy cập trang web của chúng tôi, bạn đồng ý tuân theo
              các điều khoản và điều kiện sau đây.
            </li>
            <li className="mb-3">
              Chúng tôi có quyền điều chỉnh hoặc cập nhật các điều khoản này bất
              kỳ lúc nào.
            </li>
            <li className="mb-3">
              Sử dụng dịch vụ của chúng tôi chỉ dành cho mục đích hợp pháp và
              chấp nhận của bạn là tối thiểu 16 tuổi.
            </li>
            <li className="mb-3">
              Bạn không được thực hiện bất kỳ hành vi vi phạm pháp luật hoặc gây
              hại cho dự án của chúng tôi.
            </li>
            <li className="mb-3">
              Chúng tôi không chịu trách nhiệm về việc sử dụng không đúng cách
              hoặc vi phạm của bạn đối với các điều khoản này.
            </li>
          </ul>
          <div className="mt-3">
            <input type="checkbox" name="" id="agree" className="mr-3" />
            <label htmlFor="agree">Tôi đã đọc và đồng ý với điều khoản</label>
          </div>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  //end-rendering

  //func support UI

  // const isValid = (value, ref, str) => {
  //   let valid = !validate.isNull(value, "isNull");
  //   // isNull.current.value = "Invalid";
  //   return valid;
  // };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  //end func support UI

  //React hook

  useEffect(() => {
    if (buttonClicked) {
      axios({
        url: "http://localhost:5000/api/user/register",
        method: "POST",
        data: user,
      }).then((res) => {
        if (res.data.success) {
          message.success("dang ky thanh cong");
          setUsername("");
          setPassword("");
          setTimeout(() => {
            window.location = "/auth/login";
          }, 1000);
        }
      });
    }
  }, [buttonClicked, user]);

  const handleRegister = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/user/register",
        method: "POST",
        data: user,
      });
      message.success("dang ky thanh cong");
      setTimeout(() => {
        window.location = "/auth/login";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  //end react hook

  return (
    <div className="container my-padding">
      <div className="row">
        <div className="col-6">
          <Lottie
            animationData={registerLottie} // Đường dẫn đến tệp JSON
            loop={true} // Tuỳ chọn: lặp hoặc không lặp
            autoplay={true} // Tuỳ chọn: tự động phát khi trang web được nạp
          />
        </div>
        <div className="col-6">
          <div>
            <h1 className="text-center display-5 register__heading">
              ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <div className="register__heading2">
              <Steps current={current} onChange={onChange} items={items} />
            </div>
            <div>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={handleRegister}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
