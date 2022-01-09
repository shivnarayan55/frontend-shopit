import React from "react";
import Navigation from "./Navbar";
import "./adminDashboard.css";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

export function AdminDashboard() {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="adminDashboard">
        <Sidebar />
      </div>
      <div className="mainContent">
        <DashboardContent />
      </div>
    </div>
  );
}
