import { Switch, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(currentUser);
    axios({
      url: `http://localhost:5000/api/user/getAll`,
      method: "GET",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [setUsers(res.data.data), console.log(res)])
      .catch((err) => console.log(err));
  }, []);

  const handleBlock = (_id, value) => {
    console.log(_id, value);
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        if (gender === 0) {
          return "Nam"
        }
        return "Nữ"
      }
    },
    {
      title: "Ngày sinh",
      dataIndex: "birtday",
      key: "birtday",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => {
        if (isAdmin) return <Tag color="red">Admin</Tag>;
        return <Tag color="green">User</Tag>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "action",
      render: (_id) => {
        const handleBlockWithId = (value) => {
          handleBlock(_id, value);
        };
        return (
          <div>
            <Switch
              checkedChildren="hoạt động"
              unCheckedChildren="Đã khóa"
              defaultChecked
              onChange={handleBlockWithId}
            />
          </div>
        );
      },
    },
  ];
  const renderingUI = () => {
    return <Table dataSource={users} columns={columns} bordered />;
  };
  return <div className="mt-4">{renderingUI()}</div>;
}
