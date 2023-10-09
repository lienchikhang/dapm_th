import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Top from "../components/Top";

export default function Dashboard() {
  return (
    <div className="bg-light">
      <Top />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Navbar />
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
