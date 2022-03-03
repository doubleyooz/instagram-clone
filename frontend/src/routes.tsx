import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Feed from "./pages/Feed";

export default function Paths() {
  return (
    <div className="routes-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
