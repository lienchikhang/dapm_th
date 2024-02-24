import Http from "./Http";
import Path from "./Path";

//facade pattern
class Cart {
  #mainEndpoint;
  #http;

  constructor(type, token) {
    this.#mainEndpoint = Path.getInstance(type);
    this.#http = Http.getInstance(token);
  }

  addCart = (path, shoe) => {
    let endpoint = this.#mainEndpoint.join(path);
    const rs = this.#http.axiosInstance.post(endpoint, shoe);
    return rs;
  };

  getCart = (idUser) => {
    let endpoint = this.#mainEndpoint.join(idUser);
    const rs = this.#http.axiosInstance.get(endpoint);
    return rs;
  };

  increaseCart = (path, shoe) => {
    let endpoint = this.#mainEndpoint.join(path);
    const rs = this.#http.axiosInstance.post(endpoint, shoe);
    return rs;
  };

  descCart = (path, shoe) => {
    let endpoint = this.#mainEndpoint.join(path);
    const rs = this.#http.axiosInstance.post(endpoint, shoe);
    return rs;
  };

  deleteCart = (idUser, idCart, idShoe, sizeShoe) => {
    let endpoint = this.#mainEndpoint.join(
      "delete",
      idUser,
      idCart,
      idShoe,
      sizeShoe
    );
    const rs = this.#http.axiosInstance.delete(endpoint);
    return rs;
  };
}

export default Cart;
