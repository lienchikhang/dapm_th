import React, { useEffect, useState } from "react";
import { Radio, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { saveInfo } from "../../../reducers/checkOutReducer";
import { CreditCardOutlined } from "@ant-design/icons";
export default function InfoOrder() {
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [methodPay, setMethodPay] = useState("COD");
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveInfo({ phone, address, name, methodPay }));
  }, [change]);

  const onChange = (e) => {
    setMethodPay(e.target.value);
    setChange(!change);
  };

  return (
    <div className="" style={{ width: "100%" }}>
      <form className="">
        <div className="Info-Input mb-3">
          <label className="label-text mt-0 mr-2">Tên người nhận:</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
              setChange(!change);
            }}
            className="ml-1 "
            type="text"
            style={{ border: 0, outline: "none", width: "70%" }}
          ></input>
        </div>
        <div className="Info-Input mb-3">
          <label className="label-text mt-0">Số điện thoại:</label>
          <input minLength={'9'} maxLength={'11'}
            onChange={(e) => {
              setPhone(e.target.value);
              setChange(!change);
            }}
            className="ml-1 Info-Input "
            type="number"
            style={{ border: 0, outline: "none", width: "70%" }}
          ></input>
        </div>
        <div className="Info-Input mb-1 mt-2">
          <label className="label-text mt-0">Địa chỉ:</label>
          <input
            onChange={(e) => {
              setAddress(e.target.value);
              setChange(!change);
            }}
            className="ml-1 Info-Input "
            type="text"
            style={{ border: 0, outline: "none" }}
          ></input>
        </div>
        <div className="mt-4">
          <h4 className="sub-title">Phương thức thanh toán</h4>
          <ConfigProvider
            theme={{
              components: {
                Radio: {},
              },
            }}
          >
            <Radio.Group onChange={onChange} value={methodPay} className="">
              <div className="mb-2">
                <Radio defaultChecked="true" value="COD">
                  Thanh toán trực tiếp
                </Radio>
              </div>
              <div className="">
                <Radio value="Stripe">Thanh toán online </Radio>
              </div>
            </Radio.Group>
          </ConfigProvider>
        </div>
      </form>
    </div>
  );
}
