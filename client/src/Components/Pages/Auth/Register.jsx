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
  const isNull = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [current, setCurrent] = useState(0);

  //func support UI
  const onChangeDate = () => {};

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

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
              name
              id
              aria-describedby="helpId"
              placeholder="Username"
              required={true}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">* Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span data="isNull" ref={isNull}></span>
          </div>
          <div className="form-group">
            <label htmlFor="">*Nhập lại mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span data="isNull"></span>
          </div>
        </div>
      ),
    },
    {
      title: <SolutionOutlined />,
      content: (
        <div>
          <label htmlFor="" className="d-block">
            Năm sinh
          </label>
          <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
        </div>
      ),
    },
    {
      title: <SmileOutlined />,
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  //end-rendering

  //func support UI

  const isValid = (value) => {
    let valid = !validate.isNull(value, "isNull");
    isNull.current.value = "Invalid";
    return valid;
  };

  const next = () => {
    if (isValid(username) || isValid(password)) setCurrent(current + 1);
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
            {/* <form action="">
          <div className="form-group">
            <label htmlFor />
            <input
              type="text"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor />
            <input
              type="password"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn"
            onClick={(e) => {
              setUser({ username, password });
              setButtonClicked(true);
            }}
            style={{
              backgroundColor: "black",
              color: "white",
              width: "55%",
              margin: "0 auto",
            }}
          >
            Đăng ký
          </button>
        </form> */}
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
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
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
