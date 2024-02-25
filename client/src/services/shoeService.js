import axios from "axios";

const getAll = (path, method, header = {}) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/shoe/${path}`,
    method: method,
    headers: header,
  });
};

const getByID = (params, method, header = {}) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/shoe/${params}`,
    method: method,
    headers: header,
  });
};

const shoeService = {
  getAll,
  getByID,
};
export default shoeService;
