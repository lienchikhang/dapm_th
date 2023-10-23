import axios from "axios";
import React, { useEffect, useState } from "react";
import ShoeItem from "./ShoeItem";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import "../css/modal.css";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";
import { changDetail, changeSuccess } from "../redux/reducer/shoeDetailReducer";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function Create() {
  const [shoeList, setShoeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const shoeDetail = useSelector((state) => state.shoeDetail.shoeDetail);
  const success = useSelector((state) => state.shoeDetail.success);
  const [arrSize, setArrSize] = useState([]);

  useEffect(() => {}, []);

  console.log("shoe", shoeDetail);
  const typeOptions = ["Adidas", "Nike", "Puma", "Vans"];
  const options = [];
  for (let i = 37; i < 43; i++) {
    options.push({
      label: i,
      value: i,
    });
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    dispatch(
      changDetail({
        ...shoeDetail,
        type: value,
      })
    );
  };

  const handleChangeSize = (value) => {
    let newValue = value.map((val) => {
      console.log("bien", val);
      return {
        ss: val,
        cs: 5,
      };
    });
    console.log(`selected ${newValue}`);
    dispatch(
      changDetail({
        ...shoeDetail,
        size: newValue,
      })
    );
  };

  const handleChangeType = (value) => {
    console.log(`selected ${value}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
    axios({
      url: "http://localhost:5000/api/shoe/${idShoe}",
      method: "GET",
    }).then((res) => {});
  };

  const handleOk = (idShoe) => {
    axios({
      url: `http://localhost:5000/api/shoe/${idShoe}`,
      method: "PUT",
      data: shoeDetail,
    })
      .then((res) => {
        dispatch(changeSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "age",
      render: (img) => <img src={img} width={100} />,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
      children: [
        {
          title: "Kích thước",
          dataIndex: "size",
          key: "numSize",
          width: 100,
          render: (size) => (
            <div>
              {size.map((item, index) => (
                <div key={index} className="text-center mb-2">
                  {item.ss}
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Số lượng",
          dataIndex: "size",
          key: "number",
          width: 100,
          render: (size) => (
            <div>
              {size.map((item, index) => (
                <div key={index} className="text-center mb-2">
                  {item.cs}
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      title: "Hãng giày",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      width: 120,
      key: "action",
      render: () => {
        return (
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button onClick={showModal} className="btn btn-primary">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeForm = (e) => {
    dispatch(
      changDetail({
        ...shoeDetail,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeSizes = (value) => {
    // let arrNewSize = [...arrSize];
    // arrNewSize.push(value);
    // dispatch(changDetail({ ...shoeDetail, size: arrNewSize }));
    dispatch(changDetail({ ...shoeDetail, size: [...arrSize, value] }));
  };

  const renderingUI = () => {
    return <Table dataSource={shoeList} columns={columns} bordered />;
  };

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/shoe`,
      method: "GET",
    }).then((res) => {
      console.log(res);
      setShoeList(res.data);
    });
  }, [success]);

  return (
    <div>
      <div>
        <Modal
          title="Create"
          open={isModalOpen}
          onOk={() => {
            // handleOk(shoeDetail._id);
            onFinish();
          }}
          onFinish={onFinish}
          onCancel={handleCancel}
          className="my-modal"
        >
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên giày"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input onChange={handleChangeForm} name="name" />
            </Form.Item>

            <Form.Item
              label="Giá tiền"
              name="price "
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input onChange={handleChangeForm} name="price" />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: false,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input onChange={handleChangeForm} name="image" />
            </Form.Item>

            {/* <Form.Item
              label="Kích thước"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                defaultValue={[{ ss: 36, cs: 5 }]}
                onChange={handleChangeSize}
                options={options}
              />
            </Form.Item> */}

            <Form.Item
              label="Kích thước 37"
              name="size"
              rules={[
                {
                  required: false,
                  message: "Please input your password!",
                },
              ]}
            >
              <Space
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                {/* <Input onChange={handleChangeForm} name="sizeNum1" /> */}
                <Input
                  onChange={(e) => handleChangeSizes(e.target.value)}
                  name="sizeQty1"
                />
              </Space>
            </Form.Item>

            <Form.Item
              label="Kích thước 38"
              name="size"
              rules={[
                {
                  required: false,
                  message: "Please input your password!",
                },
              ]}
            >
              <Space
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                {/* <Input onChange={handleChangeForm} name="sizeNum2" /> */}
                <Input
                  onChange={(e) =>
                    handleChangeSizes({
                      ss: 38,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="cs"
                />
              </Space>
            </Form.Item>

            <Form.Item
              label="Hãng"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select
                name="type"
                defaultValue="Adidas"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                <Option value="Adidas" name="type">
                  Adidas
                </Option>
                <Option value="Nike" name="type">
                  Nike
                </Option>
                <Option value="Puma" name="type">
                  Puma
                </Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>{renderingUI()}</div>
    </div>
  );
}
