import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to="/laptops">Laptops</SidebarLink>
        <SidebarLink to="/phones">Phones</SidebarLink>
        <SidebarLink to="/products">All Products</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to="/shop">Shop Now</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  );
};

export default Sidebar;
