import React from "react";
import "../../../css/ShoeDetail.css";
export default function SuggestShoeItem() {
  return (
    <div className="col-3">
      <div className="suggest__img p-4">
        <img
          className="img-fluid"
          src="https://th.bing.com/th/id/R.c32c12600ea011e5839a8805fd567b43?rik=pLiqZNlEG5W4Hg&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
      <div className="suggest__body">
        <h3>Name</h3>
        <p>Desc</p>
      </div>
    </div>
  );
}
