import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ logoClassName }) => {
   return (
      <Link to={"/"} className={`logo-link ${logoClassName}`}>
         {" "}
         Wellness Daisy
      </Link>
   );
};
