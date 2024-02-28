import { Switch, Table, Tag, Form, Input, Select, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState();
  const [nameSearch, SetNameSearch] = useState();
  const [phoneSearch, SetphoneSearch] = useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(currentUser);
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/user/getAll`,
      method: "GET",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => [setUsers(res.data.data), console.log(res)])
      .catch((err) => console.log(err));
  }, [change]);

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
          return "Nam";
        }
        return "Nữ";
      },
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

  const onFinish = () => {
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/user/Search`,
      method: "POST",
      data: {
        name: nameSearch,
        phone: phoneSearch,
      },
    })
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-4">
      <div>
        <Form
          onFinish={onFinish}
          name="basic"
          labelCol={{
            span: 12,
          }}
          style={{
            width: "100%",
          }}
          layout="inline"
        >
          <Form.Item label="Tên người dùng" name="NameProduct">
            <Input onChange={(e) => SetNameSearch(e.target.value)} />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="Type">
            <Input
              type="number"
              onChange={(e) => SetphoneSearch(e.target.value)}
            />
          </Form.Item>
          <Button
            className="ml-4"
            onClick={onFinish}
            type="primary"
            htmlType="submit"
          >
            Tìm kiếm
          </Button>
          <Button
            className="ml-4"
            onClick={() => {
              setChange(!change);
            }}
            type="primary"
            htmlType="submit"
          >
            Clear
          </Button>
        </Form>
      </div>
      {renderingUI()}
    </div>
  );
}
