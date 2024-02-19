import HttpSingleton from "./Http";

export class Services {
  service;
  constructor() {}

  createService(type) {
    switch (type) {
      case "cart": {
        return (this.service = new Cart(type));
      }
      case "checkout": {
      }
      case "order": {
      }
      case "shoe": {
      }
      case "user": {
      }
    }
  }
}

class Cart {
  #path;
  constructor(type) {
    this.#path = type;
  }
  addCart = (path, shoe, token = "") => {
    const rs = HttpSingleton.getInstance(token).post(
      this.#path + "/" + path,
      shoe
    );
    return rs;
  };

  deleteCart = (url, idUser, idCart, idShoe, token, sizeShoe) => {
    const path = `${
      this.#path + "/" + url
    }/${idUser}/${idCart}/${idShoe}/${sizeShoe}`;
    const rs = HttpSingleton.getInstance(token).delete(path);
    console.log("rssssss", rs);
    return rs;
    // return axios({
    //   url: `http://localhost:5000/api/cart/delete/${idUser}/${idCart}/${idShoe}/${sizeShoe}`,
    //   method: "DELETE",
    //   headers: {
    //     token: `Bearer ${token}`,
    //   },
    // });
  };

  increaseCart = (path, shoe, token = "") => {
    const rs = HttpSingleton.getInstance(token).post(
      this.#path + "/" + path,
      shoe
    );
    return rs;
    //   return axios({
    //       url: `http://localhost:5000/api/cart/${path}`,
    //       method: method,
    //       data: shoe,
    //       headers: {
    //           token: `Bearer ${headers}`,
    //       },
    //   });
  };

  descCart = (path, shoe, token = "") => {
    const rs = HttpSingleton.getInstance(token).post(
      this.#path + "/" + path,
      shoe
    );
    return rs;
    //   return axios({
    //       url: `http://localhost:5000/api/cart/${path}`,
    //       method: method,
    //       data: shoe,
    //       headers: {
    //           token: `Bearer ${headers}`,
    //       },
    //   });
  };

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
