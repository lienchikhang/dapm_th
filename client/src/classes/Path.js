class Path {
  #_instance = null;
  #defaultPath = "";

  constructor(value) {
    // if (this.#_instance) throw Error("Cannot create this object");
    this.#defaultPath = value;
  }

  static getInstance(value) {
    if (!this._instance) {
      this._instance = new Path(value);
    }
    return this._instance;
  }

  join(...value) {
    let temp = [this.#defaultPath, ...value];
    temp = temp.join("/");
    return temp;
  }
}

export default Path;
