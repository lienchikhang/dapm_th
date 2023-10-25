import { Statistic } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserStat() {
  const [statArr, setStatArr] = useState(null);

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
      .then((res) => [
        console.log("res", res.data.data),
        setStatArr(res.data.data),
      ])
      .catch((err) => console.log(err));
  }, []);

  const renderingUI = () => {
    return (
      statArr &&
      statArr.map((stat) => {
        return (
          <div>
            <Statistic
              title={`Số người dùng trong tháng ${stat._id}`}
              value={stat.total}
            />
          </div>
        );
      })
    );
  };

  return (
    <div>
      <div className="stat__section">{renderingUI()}</div>
      <div></div>
    </div>
  );
}
