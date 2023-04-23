// import './App.css'
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import PageLayout from "./pages/PageLayout";
import { Router, Route, Routes } from "react-router-dom";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pageLayout" element={<PageLayout />} />
      </Routes>
    </div>
  );
}

export default App;
