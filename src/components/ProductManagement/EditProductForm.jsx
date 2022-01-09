import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import EditProductInputs from "./EditProductInputs";

function EditProductForm() {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>

      <div className="mainContent">
        <EditProductInputs />
      </div>
    </div>
  );
}

export default EditProductForm;
