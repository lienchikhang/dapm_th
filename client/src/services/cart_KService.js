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
const cartService = {
    addCart,
}
export default cartService