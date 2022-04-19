import React from "react";
import { ClaimPaymentTBody, ClaimPaymentTHead } from "./common";
import { claimPaymentsCoreStyle } from "./styles";

export const ClaimPaymentTable = ({ claimPayments = [] }) => {
   const classes = claimPaymentsCoreStyle();

   return (
      <div className={classes.claimPaymentTableStyle}>
         <ClaimPaymentTHead />
         <ClaimPaymentTBody claimPayments={claimPayments} />
      </div>
   );
};
