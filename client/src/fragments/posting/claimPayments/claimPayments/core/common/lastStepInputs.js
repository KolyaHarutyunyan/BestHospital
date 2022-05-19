import React from "react";
import { AuthorizationFile } from "../../../../../client";
import { claimPaymentTHeadTBodyStyle } from "./styles";

export const LastStepInputs = ({ handleImagesPass }) => {
   const classes = claimPaymentTHeadTBodyStyle();

   return (
      <div className={classes.lastStepBoxStyle}>
         <AuthorizationFile fileIsForPayment={true} handleImagesPass={handleImagesPass} />
      </div>
   );
};
