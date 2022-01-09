import React from "react";
import {
  SidebarContainerTwo,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
} from "./SidebarElements";

const SidebarTwo = ({ Open, move }) => {
  return (
    <SidebarContainerTwo Open={Open} onClick={move}>
      <Icon onClick={move}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <h3>Hello {localStorage.getItem("name")}</h3>
        <SidebarLink to="/orders">Orders</SidebarLink>

        <SidebarLink to="/phones">Security</SidebarLink>

        <SidebarLink to="/products">Settings</SidebarLink>
        <br></br>
        {localStorage.getItem("authority") === "Superadmin" ||
        localStorage.getItem("authority") === "Admin" ? (
          <SidebarLink to="/adminDashboard">Dashboard</SidebarLink>
        ) : (
          ""
        )}
      </SidebarMenu>
      <SideBtnWrap
        onClick={() => {
          localStorage.clear();
        }}
      >
        <SidebarRoute to="/signIn">Logout</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainerTwo>
  );
};

export default SidebarTwo;
