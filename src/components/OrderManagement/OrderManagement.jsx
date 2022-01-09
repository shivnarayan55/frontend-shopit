import React from "react";
import Navigation from "../adminDashboard/Navbar";
import Sidebar from "../adminDashboard/Sidebar";
import OrderTable from "./OrderTable";

const OrderManagement = () => {
  return (
    <div className="float-container">
      <Navigation />
      <div className="adminDashboard">
        <Sidebar />
      </div>

      <div className="mainContent">
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderManagement;
