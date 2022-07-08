import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ logoClassName, onClickLogo }) => {
   return (
      <Link to={"/"} className={`logo-link ${logoClassName}`} onClick={onClickLogo}>
         {" "}
         Wellness Daisy
      </Link>
   );
};
