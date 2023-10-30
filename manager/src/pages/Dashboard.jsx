import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Top from "../components/Top";
import "../css/navbar.css";

export default function Dashboard() {
  return (
    <div className="bg-light my-wrap">
      <Top />
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Navbar />
            </div>
            <div className="col-9">
              <div className="content__wrapper">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
