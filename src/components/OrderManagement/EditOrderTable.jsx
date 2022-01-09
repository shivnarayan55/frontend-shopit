import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import EditOrderTableContent from "./EditOrderTableContent";

const EditOrderTable = () => {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>

      <div className="mainContent">
        <EditOrderTableContent />
      </div>
    </div>
  );
};

export default EditOrderTable;
