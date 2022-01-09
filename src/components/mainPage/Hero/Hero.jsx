import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

import Sidebar from "../Sidebar/Sidebar";
import SidebarTwo from "../Sidebar/SidebarTwo";

import {
  HeroContainer,
  HeroContent,
  HeroItems,
  HeroH1,
  HeroP,
  HeroBtn,
} from "./HeroElements";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [Open, setOpen] = useState(false);
  const move = () => {
    setOpen(!Open);
  };

  return (
    <HeroContainer>
      <Navbar move={move} toggle={toggle} />

      <Sidebar isOpen={isOpen} toggle={toggle} />

      <SidebarTwo Open={Open} move={move} />

      <HeroContent>
        <HeroItems>
          <HeroH1>Welcome To SHOP-IT</HeroH1>
          <HeroP>Best IT Products</HeroP>
          <HeroBtn>Start Shopping</HeroBtn>
        </HeroItems>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
