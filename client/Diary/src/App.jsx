// import './App.css'
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import PageLayout from "./pages/PageLayout";
import ViewPosts from "./components/ViewPosts";
import { Router, Route, Routes } from "react-router-dom";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pageLayout" element={<PageLayout />} />
        {/* <Route path="/pageLayout" element={<ViewPosts />} /> */}
      </Routes>
    </div>
  );
}

export default App;
