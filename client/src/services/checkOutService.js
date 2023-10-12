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

const paymentOnline=(idUser,method,data,token)=>{
    return axios({
        url:`http://localhost:5000/api/stripe/create-checkout-session`,
        method:method,
        data:{
            shoes:data.shoes,
            ...idUser
            ,...data.Info
        },
        headers: {
            token: `Bearer ${token}`
        }
    }).then((res)=>{
        if(res.data.url){
            window.location.href=res.data.url
        }
    }).catch((err)=>console.log(err))

}

const checkOutService={
    makeOrderbyiduser,
    paymentOnline
}
export default checkOutService