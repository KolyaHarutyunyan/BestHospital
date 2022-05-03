import React from "react";
import { AuthorizationFile } from "../../../../../client";
import { invoicePaymentTHeadTBodyStyle } from "./styles";

export const LastStepInputs = ({ invoicePaymentId, uploadedFiles }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   return (
      <div className={classes.lastStepBoxStyle}>
         <AuthorizationFile
            fileIsForPayment={true}
            fileId={invoicePaymentId}
            uploadedFiles={uploadedFiles}
         />
      </div>
   );
};
