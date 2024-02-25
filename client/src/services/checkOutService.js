import axios from "axios";
const makeOrderbyiduser = (idUser, method, data, token) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/order/makeOrder/${idUser}`,
    method: method,
    data: {
      shoes: data.shoes,
      ...data.Info,
    },
    headers: {
      token: `Bearer ${token}`,
    },
  });
};

const paymentOnline = (idUser, method, data, token) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/stripe/create-checkout-session`,
    method: method,
    data: {
      shoes: data.shoes,
      idUser: idUser,
      ...data.Info,
    },
    headers: {
      token: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err));
};

const checkOutService = {
  makeOrderbyiduser,
  paymentOnline,
};
export default checkOutService;
