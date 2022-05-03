import React from "react";
import { AuthorizationFile } from "../../../../../client";
import { claimPaymentTHeadTBodyStyle } from "./styles";

export const LastStepInputs = ({ claimPaymentId, uploadedFiles }) => {
   const classes = claimPaymentTHeadTBodyStyle();

   return (
      <div className={classes.lastStepBoxStyle}>
         <AuthorizationFile
            fileIsForPayment={true}
            fileId={claimPaymentId}
            uploadedFiles={uploadedFiles}
         />
      </div>
   );
};
