import axios from "axios";

const getAll = (path, method, header = {}) =>{
    return axios({
        url: `http://localhost:5000/api/shoe/${path}`,
        method: method,
        headers: header
    })
}

const getByID = (params, method, header = {}) =>{
    return axios({
        url: `http://localhost:5000/api/shoe/${params}`,
        method: method,
        headers: header
    })
}

const shoeService = {
    getAll,
    getByID
}
export default shoeService