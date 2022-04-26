import React from "react";
import { ClaimModalTBody, ClaimModalTHead } from "./core";
import { claimReceivableTHeadTBodyStyle } from "./styles";

export const ClaimModalTable = ({ claims = [], triggerId }) => {
   const classes = claimReceivableTHeadTBodyStyle();

   return (
      <div className={classes.claimModalTableStyle}>
         <ClaimModalTHead />
         <ClaimModalTBody claims={claims} triggerId={triggerId} />
      </div>
   );
};
