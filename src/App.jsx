import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tüm sayfaları saracak olan ana şablon */}
        <Route path="/" element={<Layout />}>
          {/* index : Layout'un içindeki <Outlet/> kısmında varsayılan olarak açılacak */}
          <Route index element={<Dashboard />} />
          {/* Sayfaların yerleri */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
