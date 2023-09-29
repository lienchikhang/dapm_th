import React, { useState } from "react";
import { ConfigProvider, Radio } from "antd";
import "../../../css/ShoeList.css";
export default function ColorPicker() {
  const [value, setValue] = useState("black");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="">
      <h3 className="navbar__subTitle">Màu sắc</h3>
      <div className="p-3">
        <Radio.Group onChange={onChange} value={value}>
          <div className="row mb-2">
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#000000",
                    colorBgContainer: "#000000",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"black"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorBgContainer: "#ff3300",
                    colorPrimary: "#ff3300",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"red"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#66ccff",
                    colorBgContainer: "#66ccff",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"blue"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#66ff33",
                    colorBgContainer: "#66ff33",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"green"}></Radio>
            </ConfigProvider>
          </div>
          <div className="row">
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#ffff00",
                    colorBgContainer: "#ffff00",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"yellow"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#ff6699",
                    colorBgContainer: "#ff6699",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"pink"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#ff9900",
                    colorBgContainer: "#ff9900",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"orange"}></Radio>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    /* here is your component tokens */
                    radioSize: 32,
                    colorPrimary: "#cc66ff",
                    colorBgContainer: "#cc66ff",
                    colorBgContainer: "#cc66ff",
                    marginXS: 20,
                  },
                },
              }}
            >
              <Radio value={"purple"}></Radio>
            </ConfigProvider>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
}
