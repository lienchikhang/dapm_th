import axios from "axios";

const shoeService = (path, method, header = {}) =>{
    return axios({
        url: `http://localhost:5000/api/${path}`,
        method: method,
        headers: header
    })
}

export default shoeService;