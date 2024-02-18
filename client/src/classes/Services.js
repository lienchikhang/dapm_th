import HttpSingleton from "./Http";

export class Services {
    service;
    constructor() { }

    createService(type) {
        switch (type) {
            case 'cart': {
                return this.service = new Cart();
            }
            case 'checkout': {

            }
            case 'order': {

            }
            case 'shoe': {

            }
            case 'user': {

            }
        }
    }
}

class Cart {
    addCart = (path, shoe, token = "") => {
        const rs = HttpSingleton.getInstance(token).post(path, shoe);
        console.log('rssssss', rs);
    };

    // increaseCart = (path, method, shoe, headers = "") => {
    //     return axios({
    //         url: `http://localhost:5000/api/cart/${path}`,
    //         method: method,
    //         data: shoe,
    //         headers: {
    //             token: `Bearer ${headers}`,
    //         },
    //     });
    // };

    // descCart = (path, method, shoe, headers = "") => {
    //     return axios({
    //         url: `http://localhost:5000/api/cart/${path}`,
    //         method: method,
    //         data: shoe,
    //         headers: {
    //             token: `Bearer ${headers}`,
    //         },
    //     });
    // };

    // getCart = (idUser, headers) => {
    //     return axios({
    //         url: `http://localhost:5000/api/cart/${idUser}`,
    //         method: "GET",
    //         headers: {
    //             token: `Bearer ${headers}`,
    //         },
    //     });
    // };

    // deleteCart = (idUser, idCart, idShoe, token, sizeShoe) => {
    //     return axios({
    //         url: `http://localhost:5000/api/cart/delete/${idUser}/${idCart}/${idShoe}/${sizeShoe}`,
    //         method: "DELETE",
    //         headers: {
    //             token: `Bearer ${token}`,
    //         },
    //     });
    // };
}