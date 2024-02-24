import Cart from "./Cart";
import HttpSingleton from "./Http";

//factory pattern
export class Services {
  service;
  #token = "";
  constructor(token) {
    this.#token = token;
  }

  createService(type) {
    switch (type) {
      case "cart": {
        return (this.service = new Cart(type, this.#token));
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
