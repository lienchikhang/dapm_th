import Http from "./Http";
import Path from "./Path";

class User {
  #mainEndpoint;
  #http;

  constructor(type, token) {
    this.#mainEndpoint = Path.getInstance(type);
    this.#http = Http.getInstance(token);
  }

  login(path, data) {
    let endpoint = this.#mainEndpoint.join(path);
    const rs = this.#http.axiosInstance.post(endpoint, data);
    return rs;
  }
}

export default User;
