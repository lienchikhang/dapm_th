import axios from "axios";
const getAllOrderByidUser = (idUser, method,token) => {
    return axios({
        url: `http://localhost:5000/api/order/${idUser}`,
        method:method,
        headers: {
            token: `Bearer ${token}`
        }
    })
}

const orderService = {
    getAllOrderByidUser
}
export default orderService