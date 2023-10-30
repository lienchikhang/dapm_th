import React, { useEffect, useMemo, useState } from "react";
import shoeService from "../../../services/shoeService";
import { useDispatch, useSelector } from "react-redux";
import { Select, notification, ConfigProvider, Spin, message } from "antd";
import "../../../css/ShoeDetail.css";
import ShoeSuggestList from "./ShoeSuggestList";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCartShoe } from "../../../actions/shoe";
import cartService from "../../../services/cart_KService";
import { Divider, Form, Radio, Skeleton, Space, Switch } from "antd";

export default function ShoeDetail() {
  const [viewingshoe, setViewingShoe] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addShoe, setAddShoe] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const idShoe = location.pathname.split("/")[3];
  const curUser = useSelector((state) => state.user.currentUser);

  //ant design
  const Context = React.createContext({
    name: "Default",
  });
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  notification.config({
    placement: "topRight",
    top: 100,
    duration: 3,
    rtl: true,
  });

  const openNotification = () => {
    notification.open({
      message: "Đã thêm vào giỏ hàng",
      description: "Vui lòng kiểm tra giỏ hàng",
      style: {
        backgroundColor: "#ffffff",
        border: "2px solid #52c41a",
        fontWeight: "700",
      },
    });
  };

  const openErrorNotification = (message, desc) => {
    notification.open({
      message: message,
      description: desc,
      style: {
        backgroundColor: "#ffffff",
        border: "2px solid #52c41a",
        fontWeight: "700",
      },
    });
  };

  useEffect(() => {
    openLoading();
    shoeService
      .getByID(idShoe, "GET")
      .then((res) => {
        setViewingShoe(res.data);
        setIsFetching(true);
        closeLoading();
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    console.log(viewingshoe)
    setAddShoe({
      ...viewingshoe,
      size: value.key,
      quantity: 1,
    });
  };
  const handleBuy = async () => {
    if (!curUser) {
      closeLoading();
      return openErrorNotification("Bạn chưa đăng nhập", "Vui lòng đăng nhập trước khi mua hàng");
    }
    if (addShoe.size === undefined) {
      closeLoading();
      return openErrorNotification("Bạn vui lòng chọn size cho sản phẩm")
    }
    dispatch(addToCartShoe(addShoe));
    //get token
    // const local = JSON.parse(localStorage.getItem("userToken"));
    // const accessToken = local.accessToken;

    const local = JSON.parse(localStorage.getItem("persist:root"));
    const accessToken = JSON.parse(local.user).currentUser.payload.accessToken;

    //call api
    const result = await cartService.addCart(
      "add",
      "POST",
      addShoe,
      accessToken
    );
    closeLoading();
    openNotification();
  };

  const closeLoading = () => {
    setLoading(false);
  };

  const openLoading = () => {
    setLoading(true);
  };
  const checkSizeAndCount = (count) => {
    return count > 0 ? (count) : "Het size"
  }

  const renderingUI = () => {
    const { name, img, price, size, color, type, desc } = viewingshoe;
    return (
      <div className="container shoeDetail__wrapper">
        <div className={`loadingScreen ${loading ? "active" : ""}`}>
          <ConfigProvider
            theme={{
              components: {
                Spin: {
                  /* here is your component tokens */
                  colorPrimary: "#1677ff",
                  dotSizeLG: 60,
                },
              },
            }}
          >
            <Spin size="large" spinning={loading} />
          </ConfigProvider>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="shoe__img p-4">
              {!isFetching ? (
                <Skeleton.Image
                  active={true}
                  size={350}
                  shape={"square"}
                  style={{ width: "350px", height: "350px" }}
                />
              ) : (
                <img src={img} alt="" className="my-img img-fluid" />
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="shoe__info">
              <h3 className="shoe__title">
                {!isFetching ? (
                  <Skeleton.Input active={true} size={size} />
                ) : (
                  name
                )}
              </h3>
              <p className="shoeDetail__price">
                {!isFetching ? (
                  <Skeleton.Input active={true} size={size} />
                ) : (
                  price
                )}
              </p>
              <div className="shoeDetail__select">
                <Select
                  labelInValue
                  defaultValue={{
                    value: "",
                    label: "Chọn",
                  }}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={
                    size &&
                    size.map((item) => {
                      return {
                        value: item.ss,
                        label: `${item.ss} ` + "SL:" + checkSizeAndCount(item.cs),
                        disabled: checkSizeAndCount(item.cs) === "Het size" ? (true) : (false)
                      };
                    })
                  }
                />
                <span className="ml-4">Size</span>
              </div>
              <Context.Provider>
                {/* {contextHolder} */}
                <button
                  className="shoeDetail__btn"
                  onClick={() => {
                    openLoading();
                    handleBuy();
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </Context.Provider>
              <ul className="shoeDetail__subInfo">
                <li>
                  <span>Màu sắc</span>
                  <span>{color}</span>
                </li>
                <li>
                  <span>Nhãn hiệu</span>
                  <span>{type}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="shoeDetail__desc">
              <h3 className="desc__title">Mô tả</h3>
              <p className="desc__body">
                {desc}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3 className="suggest__title">Gợi ý</h3>
            <ShoeSuggestList />
          </div>
        </div>
      </div>
    );
  };
  return <div>{renderingUI()}</div>;
}
