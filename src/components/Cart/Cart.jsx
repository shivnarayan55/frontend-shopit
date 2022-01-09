import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../mainPage/Navbar/Navbar";
import Footer from "../mainPage/Footer/Footer";
import { GlobalStyle } from "../../globalStyles";

import "./Cart.css";
import Sidebar from "../mainPage/Sidebar/Sidebar";
import SidebarTwo from "../mainPage/Sidebar/SidebarTwo";
import CartContent from "./CartContent";

const Cart = () => {
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
        <CartContent />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
