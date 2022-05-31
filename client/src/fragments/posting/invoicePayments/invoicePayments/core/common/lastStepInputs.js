import React from "react";
import { invoicePaymentTHeadTBodyStyle } from "./styles";
import { ImagesFileUploader } from "@eachbase/components";

export const LastStepInputs = ({ handleImagesPass, handleFileNamePass }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   return (
      <div className={classes.lastStepBoxStyle}>
         <ImagesFileUploader
            changeNameAfterFileUpload={true}
            handleImagesPass={handleImagesPass}
            handleFileNamePass={handleFileNamePass}
         />
      </div>
   );
};
