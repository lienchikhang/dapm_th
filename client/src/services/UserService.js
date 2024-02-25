import axios from "axios";
const changeInfor = (idUser, method, data, token) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/user/changeInfor/${idUser}`,
    method: method,
    data: {
      ...data,
    },
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
const takeInforUser = (idUser, method, token) => {
  return axios({
    url: `https://api-gateway-dapm-th.onrender.com/api/user/takeInfor/${idUser}`,
    method: method,
    headers: {
      token: `Bearer ${token}`,
    },
  });
};

const UserService = {
  changeInfor,
  takeInforUser,
};
export default UserService;
