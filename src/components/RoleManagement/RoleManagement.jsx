import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import RoleTable from "./RoleTable";

function RoleManagement() {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>
      <div className="mainContent">
        <RoleTable />
      </div>
    </div>
  );
}

export default RoleManagement;
