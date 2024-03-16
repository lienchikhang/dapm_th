import Cart from "./Cart";
import User from "./User";

//factory pattern
export class Services {
  #token = "";
  constructor(token) {
    this.#token = token;
  }

  createService(type) {
    var service;
    switch (type) {
      case "cart": {
        service = new Cart(type, this.#token);
        break;
      }
      case "user": {
        service = new User(type, this.#token);
        break;
      }
    }
    return service;
  }
}
