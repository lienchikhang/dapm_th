import axios from "axios"

const addCart = (path, method,shoe, headers = '') => { 
    return axios({
        url: `http://localhost:5000/api/cart/${path}`,
        method: method,
        data: shoe,
        headers: {
            token: `Bearer ${headers}`
        }
    })
}

const getCart = (idUser, headers) => {
    return axios({
        url: `http://localhost:5000/api/cart/${idUser}`,
        method: 'GET',
        headers: {
            token: `Bearer ${headers}`
        }
    })
}
const cartService = {
    addCart,
    getCart
}
export default cartService