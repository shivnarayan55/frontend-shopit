import React, { useState } from "react";
import Footer from "../mainPage/Footer/Footer";
import Navbar from "../mainPage/Navbar/Navbar";
import Sidebar from "../mainPage/Sidebar/Sidebar";
import SidebarTwo from "../mainPage/Sidebar/SidebarTwo";
import OrdersContent from "./OrdersContent";

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [Open, setOpen] = useState(false);
  const move = () => {
    setOpen(!Open);
  };

  return (
    <div>
      <Navbar move={move} toggle={toggle} />

      <Sidebar isOpen={isOpen} toggle={toggle} />

      <SidebarTwo Open={Open} move={move} />
      <div>
        <OrdersContent />
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
