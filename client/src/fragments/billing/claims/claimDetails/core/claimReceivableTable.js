import React from "react";
import { ClaimReceivableTBody, ClaimReceivableTHead } from "./common";
import { claimDetailsCoreStyle } from "./styles";

export const ClaimReceivableTable = ({ claimReceivables = [] }) => {
   const classes = claimDetailsCoreStyle();

   return (
      <div className={classes.receivableContainerStyle}>
         <ClaimReceivableTHead />
         <div>
            {claimReceivables.map((item, index) => (
               <ClaimReceivableTBody key={index} receivable={item} />
            ))}
         </div>
      </div>
   );
};
