import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
