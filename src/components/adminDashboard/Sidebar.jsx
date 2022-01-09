import React, { useEffect, useState } from "react";
import "./adminDashboard.css";

import { SidebarData, SidebarData2 } from "./SidebarData";

function Sidebar() {
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authority") === "Superadmin") {
      setShowRoles(true);
    }
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div className="Sidebar">
        <ul className="SidebarList">
          {showRoles
            ? SidebarData.map((val, key) => {
                return (
                  <li
                    className="row"
                    id={window.location.pathname === val.link ? "active" : ""}
                    key={key}
                    onClick={() => {
                      window.location.pathname = val.link;
                    }}
                  >
                    {" "}
                    <div id="icon">{val.icon}</div>{" "}
                    <div id="title">{val.title}</div>
                  </li>
                );
              })
            : SidebarData2.map((val, key) => {
                return (
                  <li
                    className="row"
                    id={window.location.pathname === val.link ? "active" : ""}
                    key={key}
                    onClick={() => {
                      window.location.pathname = val.link;
                    }}
                  >
                    {" "}
                    <div id="icon">{val.icon}</div>{" "}
                    <div id="title">{val.title}</div>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
