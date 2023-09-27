import React from "react";
import Navbar from "./Navbar";
import ColorPicker from "./ColorPicker";
import ShoeList from "./ShoeList";
import "../../../css/ShoeList.css";
export default function Shoes() {
  return (
    <div className="navbar__wrapper">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2 className="navbar__title">SẢN PHẨM CỦA CHÚNG TÔI</h2>
            <Navbar />
            <Navbar />
            <ColorPicker />
          </div>
          <div className="col-8">
            <ShoeList />
          </div>
        </div>
      </div>
    </div>
  );
}
