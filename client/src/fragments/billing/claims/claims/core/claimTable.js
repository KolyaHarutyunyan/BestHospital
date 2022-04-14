import React from "react";
import { ClaimTBody, ClaimTHead } from "./common";
import { claimsCoreStyle } from "./styles";

export const ClaimTable = ({ claims = [] }) => {
   const classes = claimsCoreStyle();

   return (
      <div className={classes.claimTableStyle}>
         <ClaimTHead />
         <ClaimTBody claims={claims} />
      </div>
   );
};
