import React from "react";
import Navbar from "./Navbar";
import ColorPicker from "./ColorPicker";
import ShoeList from "./ShoeList";

export default function Shoes() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h2
            style={{
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            SẢN PHẨM CỦA CHÚNG TÔI
          </h2>
          <Navbar />
          <ColorPicker />
        </div>
        <div className="col-8">
          <ShoeList />
        </div>
      </div>
    </div>
  );
}
