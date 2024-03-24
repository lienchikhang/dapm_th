import React, { useEffect, useState } from "react";
import axios from "axios";
import NavItem from "./NavItem";
import "../../../css/ShoeList.css";
import {
  Radio,
  ConfigProvider,
  InputNumber,
  Row,
  Slider,
  Space,
  Col,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectSize, updateCate } from "../../../reducers/navbar";
import SizeItem from "./SizeItem";
import { updateFilter } from "../../../reducers/FilterReducer";
export default function Navbar({ openLoadingg, closeLoading }) {
  //states
  const [cates, setCates] = useState([]);
  const [block, setBlock] = useState(false);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState("");
  const [inputValue, setInputValue] = useState(15000000);
  const [size, setSize] = useState([]);
  const [reset, setReset] = useState(false);
  const [unCheck, setUncheck] = useState(false);
  const catesss = useSelector((state) => state.navbar.navItem.payload);

  useEffect(() => {
    setUncheck(true);
  }, [catesss]);

  const dispatch = useDispatch();

  console.log("fil", filter);
  //------effect--
  //call api
  useEffect(() => {
    axios({
      url: "https://api-gateway-dapm-th.onrender.com/api/category/",
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

  //change filter with type
  useEffect(() => {
    setFilter({
      ...filter,
      type,
    });
  }, [type]);

  //push to state
  useEffect(() => {
    // dispatch({ type: "UPDATE_CATES", payload: filter });
    dispatch(updateCate(filter));
    dispatch(updateFilter(filter));
  }, [filter]);

  //change filter with price
  useEffect(() => {
    if (inputValue) {
      setFilter({
        ...filter,
        price: inputValue,
      });
    }
  }, [inputValue]);

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

  const onSliderChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleSelectSize = (newSize) => {
    console.log("newSize", newSize);
    if (newSize == "") setSize([]);
    setSize([...size, Number(newSize)]);
  };

  const handleCancelQuerySize = () => {
    setSize([]);
    setReset(true);
  };

  const handleSetReset = () => {
    setReset(false);
  };

  console.log("sizee", size);
  useEffect(() => {
    if (size.length > 0) {
      setFilter({
        ...filter,
        size: size,
      });
    } else {
      setFilter({
        ...filter,
        size: null,
      });
    }
  }, [size]);

  return (
    <div>
      <h3 className="navbar__subTitle">Hãng</h3>
      {/**brand */}
      <ul className="navbar__list">
        <Radio.Group name="radiogroup" defaultValue={""}>
          <ul>{renderingUI()}</ul>
        </Radio.Group>
      </ul>
      {/**color */}
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
                <Radio value={"white"} checked={unCheck}></Radio>{" "}
                {/* sao lai la false */}
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
                <Radio value={"black"} checked={unCheck}></Radio>
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
                <Radio value={"red"} checked={unCheck}></Radio>
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
                <Radio value={"blue"} checked={unCheck}></Radio>
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
                <Radio value={"green"} checked={unCheck}></Radio>
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
                <Radio value={"yellow"} checked={unCheck}></Radio>
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
                <Radio value={"pink"} checked={unCheck}></Radio>
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
                <Radio value={"orange"} checked={unCheck}></Radio>
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
                <Radio value={"purple"} checked={unCheck}></Radio>
              </ConfigProvider>
            </div>
          </Radio.Group>
        </div>
      </div>
      {/**Price */}
      <div className="">
        <h3 className="navbar__subTitle">Giá</h3>
        <div className="py-3">
          <Row>
            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      /* here is your component tokens */
                      colorPrimary: "#000000",
                      trackBg: "#000",
                      dotActiveBorderColor: "#000",
                      handleColor: "#000",
                      trackHoverBg: "#000",
                    },
                  },
                }}
              >
                <Slider
                  min={0}
                  max={15000000}
                  onChange={onSliderChange}
                  value={typeof inputValue === "number" ? inputValue : 15000000}
                />
              </ConfigProvider>
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={15000000}
                style={{
                  margin: "0 16px",
                }}
                value={inputValue}
                onChange={onSliderChange}
              />
            </Col>
          </Row>
        </div>
      </div>
      {/**size */}
      <div className="size-section">
        <h3 className="navbar__subTitle">Kích thước</h3>
        <div className="row my-2">
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={38}
            handleSetReset={handleSetReset}
          />
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={39}
            handleSetReset={handleSetReset}
          />
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={40}
            handleSetReset={handleSetReset}
          />
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={41}
            handleSetReset={handleSetReset}
          />
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={42}
            handleSetReset={handleSetReset}
          />
          <SizeItem
            isReset={reset}
            handleSelectSize={handleSelectSize}
            value={43}
            handleSetReset={handleSetReset}
          />
        </div>
      </div>
    </div>
  );
}
