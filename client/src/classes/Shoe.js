import Http from "./Http";
import Path from "./Path";

class Shoe {
  #mainEndpoint;
  #http;

  constructor(type, token) {
    this.#mainEndpoint = Path.getInstance(type);
    this.#http = Http.getInstance(token);
  }

  getShoe() {}

  addShoe() {}
}

export default Shoe;
