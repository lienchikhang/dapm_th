import axios from "axios";
import React, { useEffect, useState } from "react";
import ShoeItem from "./ShoeItem";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
  Table,
  Button,
  DatePicker,
} from "antd";
import "../css/modal.css";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";
import { changDetail, changeSuccess } from "../redux/reducer/shoeDetailReducer";

export default function Create() {
  const { TextArea } = Input;
  const [shoeList, setShoeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.shoeDetail.success);
  const [change, setChange] = useState(false);
  const [nameSearch, SetNameSearch] = useState();
  const [typeSearch, SetTypeSearch] = useState();
  const [shoeData, setShoeData] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Adidas");
  const [color, setColor] = useState("white");
  const [size37, setSize37] = useState({});
  const [size38, setSize38] = useState({});
  const [size39, setSize39] = useState({});
  const [size40, setSize40] = useState({});
  const [size41, setSize41] = useState({});
  const [size42, setSize42] = useState({});
  const [size43, setSize43] = useState({});

  const { currentUser } = JSON.parse(localStorage.getItem("persist:root"));
  const user = JSON.parse(currentUser);

  notification.config({
    placement: "topRight",
    top: 100,
    duration: 3,
    rtl: true,
  });

  const openNotification = (message, description) => {
    notification.open({
      message: message,
      description: description,
      style: {
        backgroundColor: "#ffffff",
        border: "2px solid #52c41a",
        fontWeight: "700",
      },
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = (idShoe) => {
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/delete/${idShoe}`,
      method: "DELETE",
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        setChange(!change);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showModal = (_id) => {
    takeDataToEdit(_id);
    setIsModalOpen(true);
  };

  const takeDataToEdit = async (_id) => {
    await axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/${_id}`,
      method: "GET",
    })
      .then((res) => {
        setShoeData(res.data);
        setName(res.data.name);
        setPrice(res.data.price);
        setImg(res.data.img);
        setDesc(res.data.desc);
        setSize37(res.data.size[0]);
        setSize38(res.data.size[1]);
        setSize39(res.data.size[2]);
        setSize40(res.data.size[3]);
        setSize41(res.data.size[4]);
        setSize42(res.data.size[5]);
        setSize43(res.data.size[6]);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (idShoe) => {
    const newSize = [];
    newSize.push(size37, size38, size39, size40, size41, size42, size43);
    const shoeDataUpdate = {
      name,
      price,
      img,
      size: newSize,
      desc,
      type,
      color,
    };
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe/${idShoe}`,
      method: "PUT",
      data: shoeDataUpdate,
      headers: {
        token: `Bearer ${user.payload.accessToken}`,
      },
    })
      .then((res) => {
        openNotification("Chỉnh sửa thành công", "dữ liệu đã được lưu lại");
        dispatch(changeSuccess());
      })
      .catch((err) => {
        console.log(err);
        openNotification("chỉnh sửa thất bại", "Vui lòng thực hiện lại");
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
      render: (img) => <img src={img} width={100} alt="" />,
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
      dataIndex: "_id",
      width: 120,
      key: "action",
      render: (_id) => {
        return (
          <div className="d-flex justify-content-between">
            <button
              onClick={() => {
                handleDelete(_id);
              }}
              className="btn btn-danger"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
            <button onClick={() => showModal(_id)} className="btn btn-primary">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const handleCancel = () => {
    setShoeData({});
    setIsModalOpen(false);
  };
  const renderingUI = () => {
    return <Table dataSource={shoeList} columns={columns} bordered />;
  };
  useEffect(() => {
    axios({
      url: `https://api-gateway-dapm-th.onrender.com/api/shoe`,
      method: "GET",
    }).then((res) => {
      setShoeList(res.data);
    });
  }, [success, change]);

  const onFinishSearch = () => {
    axios({
      url: "https://api-gateway-dapm-th.onrender.com/api/shoe/SearchShoe",
      method: "POST",
      data: {
        name: nameSearch,
        type: typeSearch,
      },
    })
      .then((res) => {
        setShoeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderModal = () => {
    return (
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onOk={() => {
          handleEdit(shoeData._id);
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
                message: "Vui Lòng nhập tên giày!",
              },
            ]}
          >
            <Input
              maxLength={15}
              defaultValue={shoeData.name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui Lòng nhập giá tiền!",
              },
            ]}
          >
            <InputNumber
              min={500000}
              max={10000000}
              defaultValue={shoeData.price}
              name="price"
              onChange={(value) => setPrice(value)}
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui Lòng nhập link hình!",
              },
            ]}
          >
            <Input
              defaultValue={shoeData.img}
              name="image"
              onChange={(e) => setImg(e.target.value)}
            />
          </Form.Item>
          <img width={"200px"} src={img ? img : shoeData.img} alt="" />
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[
              {
                required: true,
                message: "Vui Lòng nhập mô tả!",
              },
            ]}
          >
            <TextArea
              defaultValue={shoeData.desc}
              rows={4}
              onChange={(e) => [setDesc(e.target.value)]}
              maxLength={200}
            />
          </Form.Item>
          <Form.Item
            label="Hãng"
            name="type"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hãng!",
              },
            ]}
          >
            <Select
              name="type"
              defaultValue={shoeData.type}
              style={{
                width: 120,
              }}
              onChange={(value) => {
                setType(value);
              }}
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
              <Option value="Vans" name="type">
                Vans
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn màu sắc!",
              },
            ]}
          >
            <Select
              name="color"
              defaultValue={shoeData.color}
              style={{
                width: 120,
              }}
              onChange={(value) => {
                setColor(value);
              }}
            >
              <Option value="white" name="color">
                Trắng
              </Option>
              <Option value="black" name="color">
                Đen
              </Option>
              <Option value="red" name="color">
                Đỏ
              </Option>
              <Option value="blue" name="color">
                Xanh dương
              </Option>
              <Option value="green" name="color">
                Xanh lá
              </Option>
              <Option value="yellow" name="color">
                Vàng
              </Option>
              <Option value="orange" name="color">
                Cam
              </Option>
              <Option value="pink" name="color">
                Hồng
              </Option>
              <Option value="yellow" name="color">
                Vàng
              </Option>
              <Option value="purple" name="color">
                Tím
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Kích thước 37"
            name="size 37"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[0].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize37({ ss: 37, cs: value })}
            />
          </Form.Item>

          <Form.Item
            label="Kích thước 38"
            name="size 38"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[1].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize38({ ss: 38, cs: value })}
            />
          </Form.Item>
          <Form.Item
            label="Kích thước 39"
            name="size 39"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[2].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize39({ ss: 39, cs: value })}
            />
          </Form.Item>
          <Form.Item
            label="Kích thước 40"
            name="size 40"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[3].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize40({ ss: 40, cs: value })}
            />
          </Form.Item>
          <Form.Item
            label="Kích thước 41"
            name="size 41"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[4].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize41({ ss: 41, cs: value })}
            />
          </Form.Item>
          <Form.Item
            label="Kích thước 42"
            name="size 42"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[5].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize42({ ss: 42, cs: value })}
            />
          </Form.Item>
          <Form.Item
            label="Kích thước 43"
            name="size 43"
            rules={[
              {
                required: true,
                message: "Size phải có số lượng!",
              },
            ]}
          >
            <InputNumber
              defaultValue={shoeData.size[6].cs}
              min={0}
              max={1000}
              onChange={(value) => setSize43({ ss: 43, cs: value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  return (
    <div>
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
          <Form.Item label="Tên Sản phẩm" name="NameProduct">
            <Input onChange={(e) => SetNameSearch(e.target.value)} />
          </Form.Item>

          <Form.Item label="Hãng giày" name="Type">
            <Select
              style={{
                width: 120,
              }}
              onChange={(value) => SetTypeSearch(value)}
            >
              <Option value="Adidas">Adidas</Option>
              <Option value="Nike">Nike</Option>
              <Option value="Puma">Puma</Option>
              <Option value="Vans">Vans</Option>
            </Select>
          </Form.Item>
          <Button
            className="ml-4"
            onClick={onFinishSearch}
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
      <div>{isModalOpen && shoeData.name && renderModal()}</div>
      <div>{renderingUI()}</div>
    </div>
  );
}
