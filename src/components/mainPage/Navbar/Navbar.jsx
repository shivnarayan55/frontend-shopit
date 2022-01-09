import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavLink, NavIcon, Bars, User } from "./NavbarElements";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Navbar = ({ move, toggle }) => {
  const history = useHistory();

  return (
    <>
      <Nav>
        {/* <NavLink to="/">SHOP-IT</NavLink> */}
        <NavIcon
          style={{ marginRight: "20px", marginTop: "14px" }}
          onClick={toggle}
        >
          <Bars style={{ color: "FFD371" }} />
        </NavIcon>
        <NavLink to="/cart">
          <NavIcon style={{ marginRight: "90px", marginTop: "8px" }}>
            <FaShoppingCart style={{ color: "FFD371" }} size={35} />
          </NavIcon>
        </NavLink>
        <NavIcon
          style={{ marginRight: "140px", marginTop: "8px" }}
          onClick={move}
        >
          <User size={32} />
        </NavIcon>
        <NavIcon
          style={{ marginRight: "190px", marginTop: "4px" }}
          onClick={move}
        >
          <FaHome
            onClick={(e) => {
              e.preventDefault();
              history.push("/home");
            }}
            style={{ color: "FFD371" }}
            size={40}
          />
        </NavIcon>
      </Nav>
    </>
  );
};

export default Navbar;
