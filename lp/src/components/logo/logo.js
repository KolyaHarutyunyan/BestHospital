import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="logo-box">
      <Link to={"/"} className="logo-link"> Wellness Daisy </Link>
    </div>
  );
};
