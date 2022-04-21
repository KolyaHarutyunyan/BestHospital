import React from "react";
import { ClaimPaymentClaimTBody, ClaimPaymentClaimTHead } from "./common";
import { claimPaymentDetailsCoreStyle } from "./styles";

export const ClaimPaymentClaimTable = ({ claimPaymentClaims = [] }) => {
   const classes = claimPaymentDetailsCoreStyle();

   return (
      <div className={classes.claimContainerStyle}>
         <ClaimPaymentClaimTHead />
         <div>
            {claimPaymentClaims.map((item, index) => (
               <ClaimPaymentClaimTBody key={index} claim={item} />
            ))}
         </div>
      </div>
   );
};

