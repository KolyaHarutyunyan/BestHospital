import React from "react";
import { claimPaymentTHeadTBodyStyle } from "./styles";
import { ImagesFileUploader } from "@eachbase/components";

export const LastStepInputs = ({ handleImagesPass, handleFileNamePass }) => {
   const classes = claimPaymentTHeadTBodyStyle();

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
