import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      HOME PAGE
      <div>
        <Link to="/signIn">SignIn</Link>
      </div>
    </div>
  );
}
