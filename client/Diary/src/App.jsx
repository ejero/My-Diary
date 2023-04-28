import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import PageLayout from "./pages/PageLayout";
import { Route, Routes } from "react-router-dom";

function App() {

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
