import React, { useEffect, useState } from "react";
import "./default.css";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
export default function Default() {
  const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
  const user = JSON.parse(currentUser);
  const [dataOrder, setDataOrder] = useState(null);
  const [allOrder, setAllOder] = useState(null);

  console.log({ dataOrder, allOrder });

  const fetchingApi = async () => {
    try {
      const orders = await axios({
        url: `https://api-gateway-dapm-th.onrender.com/api/order/stat`,
        headers: {
          token: `Bearer ${user.payload.accessToken}`,
        },
      });
      return orders.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingAllOrder = async () => {
    try {
      const orders = await axios({
        url: `https://api-gateway-dapm-th.onrender.com/api/order/`,
        headers: {
          token: `Bearer ${user.payload.accessToken}`,
        },
      });
      return orders.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchingApi(), fetchingAllOrder()])
      .then((res) => [setDataOrder(res[0].data), setAllOder(res[1].orders)])
      .catch((err) => console.log(err));
  }, []);

  //config chart

  const tongDoanhThuUocTinh = () => {
    return allOrder?.reduce((acc, curVar) => {
      console.log("cur", curVar);
      let sumPricePerOrder =
        curVar &&
        curVar?.shoes.reduce((acc, curVar) => {
          return acc + curVar.price;
        }, 0);
      return acc + sumPricePerOrder;
    }, 0);
  };

  const tongDoanhThuThucTe = () => {
    let orderDaThanhToan = allOrder?.filter((order) => {
      return order.status == "Đã giao";
    });
    return orderDaThanhToan?.reduce((acc, curVar) => {
      let sumPricePerOrder =
        curVar &&
        curVar?.shoes?.reduce((acc, curVar) => {
          return acc + curVar.price;
        }, 0);
      return acc + sumPricePerOrder;
    }, 0);
  };

  return (
    <div className="default__wrapper">
      <div className="stat__wrapper">
        <div className="row mb-4">
          <div className="col-6">
            <div className="stat__itemm">
              <h2>Tổng doanh thu ước tính</h2>
              <span>{tongDoanhThuUocTinh()?.toLocaleString()}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="stat__itemm">
              <h2>Tổng doanh thu thực tế:</h2>
              <span>{tongDoanhThuThucTe()?.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="stat__itemmm">
              <h2>Bảng thống kê số lượng đơn hàng trong năm</h2>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: dataOrder
                      ? dataOrder.map((stat) => `Tháng ${stat._id}`)
                      : [1, 2, 3],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: dataOrder
                      ? dataOrder.map((stat) => stat.total)
                      : [1, 2, 3],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
