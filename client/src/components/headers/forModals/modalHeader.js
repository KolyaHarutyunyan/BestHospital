import React from "react";
import { useGlobalTextStyles } from "@eachbase/utils";
import { modalHeadersStyle } from "./styles";
import { CloseButton } from "@eachbase/components";
import { ModalHeaderBottom } from "./modalHeaderBottom";
import { ModalsTabs } from "@eachbase/components/tabs";

export const ModalHeader = ({
   handleClose,
   title,
   headerBottom,
   steps,
   text,
   setStep,
   secondStepInfo,
}) => {
   const classes = modalHeadersStyle();
   const globalStyle = useGlobalTextStyles();

   return (
      <div className={classes.createFoundingSourceHeader}>
         <div className={classes.createFoundingSourceHeaderTop}>
            <CloseButton handleCLic={handleClose} isInModal={true} />
         </div>
         <p className={globalStyle.modalTitle}>{title}</p>
         {text && <p className={classes.modalText}>{text}</p>}
         {steps && <ModalsTabs secondStepInfo={secondStepInfo} steps={steps} setStep={setStep} />}
         {headerBottom && <ModalHeaderBottom />}
      </div>
   );
};
