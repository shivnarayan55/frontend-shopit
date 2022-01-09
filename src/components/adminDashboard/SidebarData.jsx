import React, { useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/adminDashboard",
  },
  {
    title: "Users",
    icon: <PeopleAltIcon />,
    link: "/usermanagement",
  },

  {
    title: "Roles",
    icon: <CategoryIcon />,
    link: "/roleManagement",
  },

  {
    title: "Products",
    icon: <AssignmentLateIcon />,
    link: "/productManagement",
  },

  {
    title: "Orders",
    icon: <ShoppingCartIcon />,
    link: "/orderManagement",
  },
];

export const SidebarData2 = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/adminDashboard",
  },
  {
    title: "Users",
    icon: <PeopleAltIcon />,
    link: "/usermanagement",
  },

  {
    title: "Products",
    icon: <AssignmentLateIcon />,
    link: "/productManagement",
  },

  {
    title: "Orders",
    icon: <ShoppingCartIcon />,
    link: "/orderManagement",
  },
];
