import React from "react";
import ShoeItem from "../Shoes/ShoeItem";
import SuggestShoeItem from "./SuggestShoeItem";

export default function ShoeSuggestList() {
  return (
    <div className="row">
      <SuggestShoeItem />
      <SuggestShoeItem />
      <SuggestShoeItem />
      <SuggestShoeItem />
    </div>
  );
}
