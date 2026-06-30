import { useState } from "react";
import axios from "axios";

import "./App.css";
import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddOrder />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
