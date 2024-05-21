import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
1
import Main from "../pages/main/Main";
import Info from "../pages/info/Info";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
