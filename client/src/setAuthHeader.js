import axios from "axios"

const setAuthHeader = token => {
    if(token) {
        axios.defaults.headers.common['token'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['token'];
    }
}

export default setAuthHeader;