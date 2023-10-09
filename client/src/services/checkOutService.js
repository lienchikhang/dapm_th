import axios from "axios";
const makeOrderbyiduser=(idUser,method,data,token)=>{
    
    return axios({
        url:`http://localhost:5000/api/order/makeOrder/${idUser}`,
        method:method,
        data:{
            shoes:data.shoes,
            ...data.Info
        },
        headers: {
            token: `Bearer ${token}`
        }
    })
}
const checkOutService={
    makeOrderbyiduser
}
export default checkOutService