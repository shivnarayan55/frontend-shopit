import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import ProductTable from "./ProductTable";

function ProductManagement() {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>

      <div className="mainContent">
        <ProductTable />
      </div>
    </div>
  );
}

export default ProductManagement;
