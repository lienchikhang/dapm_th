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
import { toast } from "react-toastify";

export default function Register() {
  const valUsername = useRef(null);
  const valPassword = useRef(null);
  const valPassword2 = useRef(null);
  const valRePassword = useRef(null);
  const valBirthday = useRef(null);
  const valPhone = useRef(null);
  const valPhone2 = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refRePassword = useRef(null);
  const refBirthday = useRef(null);
  const refPhone = useRef(null);
  const valAgree = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [user, setUser] = useState({ gender: 1, phone: "" });
  const [buttonClicked, setButtonClicked] = useState(false);
  const [current, setCurrent] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [userBirth, setUserBirth] = useState();
  const [agree, setAgree] = useState(false);

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
  //func support UI
  const onChangeDate = (date, dateString) => {
    let newDate = dateString;
    console.log("onOk: ", dateString);
    setUserBirth(newDate);
    setUser({
      ...user,
      birth: newDate,
    });
  };

  const onOk = (value) => {
    console.log("onOk: ", value.toString());
    setUserBirth(value);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    let valid = handleValidate();
    if (valid) setCurrent(value);
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
              ref={refUsername}
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
              ref={refPassword}
              type="password"
              className="form-control"
              name="password"
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={user.password}
              onChange={handleChangeInfo}
            />
            <span
              style={{ color: "red", display: "block" }}
              ref={valPassword}
            ></span>
            <span
              style={{ color: "red", display: "block" }}
              ref={valPassword2}
            ></span>
          </div>
          <div className="form-group">
            <label htmlFor="">*Nhập lại mật khẩu</label>
            <input
              ref={refRePassword}
              type="password"
              className="form-control"
              name="repassword"
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={rePassword}
              onChange={(e) => {
                setrePassword(e.target.value);
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
              format={"YYYY/MM/DD"}
              ref={refBirthday}
              disabledDate={disabledDate}
            />
            <span style={{ color: "red" }} ref={valBirthday}></span>
          </div>
          <div className="form-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              ref={refPhone}
              type="number"
              className="form-control"
              name="phone"
              placeholder="Số điện thoại"
              onChange={handleChangeInfo}
            />
            <span
              style={{ color: "red", display: "block" }}
              ref={valPhone}
            ></span>
            <span
              style={{ color: "red", display: "block" }}
              ref={valPhone2}
            ></span>
          </div>
          <div className="form-group">
            <label htmlFor="">Giới tính</label>
            <div className="">
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="gender"
                  defaultChecked={true}
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
            <input
              type="checkbox"
              name=""
              id="agree"
              className="mr-3"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label htmlFor="agree">Tôi đã đọc và đồng ý với điều khoản</label>
          </div>
          <span style={{ color: "red" }} ref={valAgree}></span>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  console.log("bit", refPhone);
  //end-rendering

  //func support UI

  const handleValidate = () => {
    let valid;
    if (current === 0) {
      valid =
        validate.isNotNull(refUsername?.current?.value, valUsername?.current) &
        validate.isNotNull(refPassword?.current?.value, valPassword?.current) &
        validate.validPass(refPassword?.current?.value, valPassword2?.current) &
        validate.isCorrect(
          refPassword?.current?.value,
          refRePassword?.current?.value,
          valRePassword?.current
        );
    } else if (current === 1) {
      console.log("bdc", refBirthday.current);
      valid =
        validate.isNotNull(userBirth, valBirthday?.current) &
        validate.isNotNull(refPhone?.current?.value, valPhone?.current) &
        validate.validPhone(refPhone?.current?.value, valPhone2?.current);
    }
    return valid;
  };

  const next = () => {
    let valid = handleValidate();
    if (valid) setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  //end func support UI

  //React hook

  const handleDone = () => {
    if (agree) {
      valAgree.current.innerText = "";
      handleRegister();
      return;
    } else {
      valAgree.current.innerText = "Vui lòng đọc và đánh dấu";
      return;
    }
  };

  const handleRegister = async () => {
    try {
      console.log(user);
      const res = await axios({
        url: "http://localhost:5050/api/user/register",
        method: "POST",
        data: user,
      });
      message.success("Đăng ký tài khoản thành công!");
      setTimeout(() => {
        window.location = "/auth/login";
      }, 1000);
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };

  //end react hook

  return (
    <div className="container-fluid">
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
                    Tiếp theo
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={handleDone}>
                    Hoàn thành
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
    </div>
  );
}
