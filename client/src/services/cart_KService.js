import axios from "axios";

const addCart = (path, method, shoe, headers = "") => {
  return axios({
    url: `http://localhost:5050/api/cart/${path}`,
    method: method,
    data: shoe,
    headers: {
      token: `Bearer ${headers}`,
    },
  });
};

const increaseCart = (path, method, shoe, headers = "") => {
  return axios({
    url: `http://localhost:5050/api/cart/${path}`,
    method: method,
    data: shoe,
    headers: {
      token: `Bearer ${headers}`,
    },
  });
};

const descCart = (path, method, shoe, headers = "") => {
  return axios({
    url: `http://localhost:5050/api/cart/${path}`,
    method: method,
    data: shoe,
    headers: {
      token: `Bearer ${headers}`,
    },
  });
};

const getCart = (idUser, headers) => {
  return axios({
    url: `http://localhost:5050/api/cart/${idUser}`,
    method: "GET",
    headers: {
      token: `Bearer ${headers}`,
    },
  });
};

const deleteCart = (idUser, idCart, idShoe, token, sizeShoe) => {
  return axios({
    url: `http://localhost:5000/api/cart/delete/${idUser}/${idCart}/${idShoe}/${sizeShoe}`,
    method: "DELETE",
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
const cartService = {
  addCart,
  getCart,
  deleteCart,
  descCart,
  increaseCart,
};
export default cartService;
