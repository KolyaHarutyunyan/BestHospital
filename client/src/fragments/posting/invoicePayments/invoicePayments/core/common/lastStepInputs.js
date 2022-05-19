import React from "react";
import { AuthorizationFile } from "../../../../../client";
import { invoicePaymentTHeadTBodyStyle } from "./styles";

export const LastStepInputs = ({ handleImagesPass }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   return (
      <div className={classes.lastStepBoxStyle}>
         <AuthorizationFile fileIsForPayment={true} handleImagesPass={handleImagesPass} />
      </div>
   );
};
