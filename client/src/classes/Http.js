import axios from "axios";
// import { dotenv } from "dotenv";
// require("dotenv").config();

class Http {
  #_instance;
  axiosInstance;

  constructor(token) {
    if (!this.#_instance) {
      this.axiosInstance = axios.create({
        baseURL:
          process.env.REACT_APP_DEFAULT_URL ||
          "https://api-gateway-dapm-th.onrender.com/api/",
        headers: {
          token: `Bearer ${token}`,
        },
      });
    }
  }

  static getInstance(token = "") {
    if (!this._instance) {
      this._instance = new Http(token);
    }
    return this._instance;
  }

  async get(url) {
    const data = await this.axiosInstance.get(url);
    return data;
  }

  async post(url, data) {
    const rs = await this.axiosInstance.post(url, data);
    return rs;
  }

  async delete(url) {
    const rs = await this.axiosInstance.delete(url);
    return rs;
  }

  async patch(url, data) {
    const rs = await this.axiosInstance.patch(url, data);
    return rs;
  }
}

export default Http;
