import React, { useEffect, useState } from "react";
import axios from "axios";
import NavItem from "./NavItem";
import "../../../css/ShoeList.css";
import { Radio, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
export default function Navbar({ openLoadingg, closeLoading }) {
  //states
  const [cates, setCates] = useState([]);
  const [block, setBlock] = useState(false);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  console.log("fil", filter);
  //------effect--
  //call api
  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/category/",
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setCates(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [block]);

  //change filter
  useEffect(() => {
    setFilter({
      ...filter,
      type,
    });
  }, [type]);

  //push to state
  useEffect(() => {
    dispatch({ type: "UPDATE_CATES", payload: filter });
  }, [filter]);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const renderingUI = () => {
    return cates.map((cate) => {
      return <NavItem key={cate.catName} data={cate} setType={setType} />;
    });
  };

  return (
    <div>
      <h3 className="navbar__subTitle">Hãng</h3>
      <ul className="navbar__list">
        <Radio.Group name="radiogroup" defaultValue={""}>
          <ul>{renderingUI()}</ul>
        </Radio.Group>
      </ul>
      <div className="">
        <h3 className="navbar__subTitle">Màu sắc</h3>
        <div className="p-3">
          <Radio.Group name="color" onChange={onChange} value={""}>
            <div className="row mb-2">
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      /* here is your component tokens */
                      radioSize: 32,
                      colorPrimary: "#238u9",
                      colorBgContainer: "#ffffff",
                      marginXS: 20,
                    },
                  },
                }}
              >
                <Radio value={false}></Radio>
              </ConfigProvider>
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
    </div>
  );
}
