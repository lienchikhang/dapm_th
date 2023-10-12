import axios from "axios";
const getAllOrderByidUser = (idUser, headers) => {
    return axios({
        url: `http://localhost:5000/api/order/${idUser}`,
        headers: {
            token: `Bearer ${headers}`
        }
    })
}

const orderService = {
    getAllOrderByidUser
}
export default orderService