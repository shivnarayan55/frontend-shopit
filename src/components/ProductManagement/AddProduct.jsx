import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import AddProductsInputs from "./AddProductInputs";

function AddProduct() {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>

      <div className="mainContent">
        <AddProductsInputs />
      </div>
    </div>
  );
}

export default AddProduct;
