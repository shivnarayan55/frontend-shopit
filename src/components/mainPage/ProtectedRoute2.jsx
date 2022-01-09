import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute2 = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("authority") === "User" ||
        localStorage.getItem("authority") === "Admin" ||
        localStorage.getItem("authority") === "Superadmin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute2;
