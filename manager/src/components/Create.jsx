import axios from "axios";
import React, { useEffect, useState } from "react";
import ShoeItem from "./ShoeItem";
import { Button, Form, Input, Modal, Select } from "antd";
import "../css/modal.css";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";
import { changDetail, changeSuccess } from "../redux/reducer/shoeDetailReducer";

export default function Create() {
  const [shoeList, setShoeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const shoeDetail = useSelector((state) => state.shoeDetail.shoeDetail);
  const success = useSelector((state) => state.shoeDetail.success);

  const showModal = () => {
    setIsModalOpen(true);
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

  const renderingUI = (shoes) => {
    return shoes.map((shoe, index) => {
      return <ShoeItem key={index} data={shoe} showModal={showModal} />;
    });
  };

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/shoe`,
      method: "GET",
    }).then((res) => {
      setShoeList(res.data);
    });
  }, [success]);

  return (
    <div>
      <Modal
        title="Create"
        open={isModalOpen}
        onOk={() => {
          handleOk(shoeDetail._id);
        }}
        onCancel={handleCancel}
        className="my-modal"
      >
        <Form
          name="control-ref"
          style={{
            maxWidth: 600,
          }}
        >
          <input
            type="text"
            name="name"
            onChange={handleChangeForm}
            value={shoeDetail.name}
          />
          <input
            type="text"
            name="price"
            onChange={handleChangeForm}
            value={shoeDetail.price}
          />
          <input
            type="text"
            name="image"
            onChange={handleChangeForm}
            value={shoeDetail.img}
          />

          <select name="type" onChange={handleChangeForm}>
            <option value="adidas">adidas</option>
            <option value="nike">nike</option>
            <option value="puma">puma</option>
          </select>

          <select name="color" onChange={handleChangeForm}>
            <option value="black">black</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
          </select>

          <select
            name="size"
            onChange={handleChangeForm}
            value={shoeDetail.size}
          >
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
          </select>
          <Form.Item>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Form.Item>
        </Form>
      </Modal>
      <div className="py-4">
        <button className="btn btn-success">Create</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>IMAGE</th>
          <th>PRICE</th>
          <th>COLOR</th>
          <th>CATEGORY</th>
          <th>SIZE</th>
          <th>ACTION</th>
        </thead>
        <tbody>{shoeList && renderingUI(shoeList)}</tbody>
      </table>
    </div>
  );
}
