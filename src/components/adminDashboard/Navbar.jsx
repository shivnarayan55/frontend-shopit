import React from "react";
import { useHistory } from "react-router-dom";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./Navbarelement";

const Navigation = () => {
  const history = useHistory();

  function buttonHandler() {
    history.push("/");

    localStorage.clear();
  }

  const name = localStorage.getItem("name");
  return (
    <>
      <Nav>
        <NavLink to="/adminDashboard">
          <div>
            <h1>SHOP-IT</h1>
          </div>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/adminDashboard" activeStyle>
            Home
          </NavLink>

          <NavLink to="#" activeStyle>
            Contact us
          </NavLink>
          <NavLink to="#" activeStyle>
            About
          </NavLink>

          <NavLink to="/home" activeStyle>
            Go To Store
          </NavLink>
        </NavMenu>

        <NavBtn onClick={buttonHandler}>
          <NavBtnLink to="/">Signout</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navigation;
