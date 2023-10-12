import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Introduce from "./Introduce";
import ProductList from "./ProductList";
import Map from "./Map";
import setAuthHeader from "../../../setAuthHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Admin/Dashboard";
import Products from "./Products";

export default function Home() {
  return (
    <div>
      <Carousel />
      <Introduce />
      <ProductList />
      <Map />
    </div>
  );
}
