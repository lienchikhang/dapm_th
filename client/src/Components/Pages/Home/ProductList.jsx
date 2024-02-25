import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import "../../../css/products.css";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //call api
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/?new=${true}`,
      method: "GET",
    }).then((res) => {
      setShoes(res.data);
    });
  }, []);

  const convertStr = (string) => {
    if (string.length > 20) {
      return string.slice(0, 10) + "...";
    }
    return string;
  };

  const handleClick = (idShoe) => {
    navigate(`/product/shoes/${idShoe}`);
  };

  const handleWatchAll = () => {
    navigate("/product/shoes/");
  };
  return (
    <div className="container p-4">
      <div className="py-4 d-flex justify-content-between align-items-center">
        <h1 className="page__title">Sản phẩm mới</h1>
        <p className="page__more" onClick={handleWatchAll}>
          Xem tất cả
        </p>
      </div>
      <div className="row">
        {shoes.length === 0 ? (
          <Skeleton active />
        ) : (
          shoes.map((shoe, index) => {
            const { _id, name, img, price } = shoe;
            return (
              <div className={`mb-3 ${index > 2 ? "col" : "col-4"}`}>
                <div className="product">
                  <div className="card">
                    <div className="card-top my-card-top">
                      <img
                        className="card-top mx-auto img-fluid d-block my-4    "
                        src={img}
                        alt="CardImageCap"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{convertStr(name)}</h2>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex justify-content-between">
                        <p className="card-title-price">
                          {price.toLocaleString()} vnđ
                        </p>
                        <button
                          className="button bg-primary"
                          onClick={() => handleClick(_id)}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product__meta">
                    <span>new</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
