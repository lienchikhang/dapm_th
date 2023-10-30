import { Statistic } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

export default function UserStat() {
  const [statArr, setStatArr] = useState([]);

  useEffect(() => {
    const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(currentUser);
    axios({
      url: `http://localhost:5000/api/user/stats`,
      method: "GET",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [console.log("res", res.data), setStatArr(res.data.data)])
      .catch((err) => console.log(err));
  }, []);

  const renderingUI = () => {
    return (
      statArr &&
      statArr.map((stat) => {
        return (
          <tr>
            <td>{stat._id}</td>
            <td>{stat.total}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className="row">
      <div className="col-6">
        <div>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data:
                  statArr.length > 0
                    ? statArr.map((stat) => `Tháng ${stat._id}`)
                    : [1, 2, 3],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data:
                  statArr.length > 0
                    ? statArr.map((stat) => stat.total)
                    : [1, 2, 3],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="stat__section p-4">
          <table className="table table-bordered">
            <thead>
              <th>Tháng</th>
              <th>Số lượng</th>
            </thead>
            <tbody>{renderingUI()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
