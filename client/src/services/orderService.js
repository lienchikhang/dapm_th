import axios from "axios";
const getAllOrderByidUser = (idUser, method, token) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/order/${idUser}`,
    method: method,
    headers: {
      token: `Bearer ${token}`,
    },
  });
};

const orderService = {
  getAllOrderByidUser,
};
export default orderService;
