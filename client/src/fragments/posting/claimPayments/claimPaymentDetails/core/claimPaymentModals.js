import React from "react";
import {
   BillingModalWrapper,
   SimpleModal,
   TwoStepsContainer,
} from "@eachbase/components";
import { claimPaymentDetailsCoreStyle } from "./styles";
import { AddClaimModalInputs, VoidClaimPaymentInputs } from "./common";
import { ClaimPaymentInputs } from "../../claimPayments/core";

export const ClaimPaymentModals = ({
   activeStep = "first",
   handleActiveStep,
   payorsNames,
   claimPaymentId,
   closeEditingModal,
   closeVoidingModal,
   closeAddingModal,
   editingModalIsOpen,
   voidingModalIsOpen,
   addingModalIsOpen,
}) => {
   const classes = claimPaymentDetailsCoreStyle();

   return (
      <>
         <SimpleModal
            openDefault={editingModalIsOpen}
            handleOpenClose={closeEditingModal}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.voidClaimPaymentWrapperStyle}
                  onClose={closeEditingModal}
                  titleContent={"Edit Payment"}
               >
                  <ClaimPaymentInputs
                     activeStep={activeStep}
                     handleStep={handleActiveStep}
                     closeModal={closeEditingModal}
                     fundingSource={payorsNames}
                  />
               </BillingModalWrapper>
            }
         />
         <SimpleModal
            openDefault={voidingModalIsOpen}
            handleOpenClose={closeVoidingModal}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.voidClaimPaymentWrapperStyle}
                  onClose={closeVoidingModal}
                  titleContent={"Void This Payment?"}
                  subtitleContent={
                     "Please indicate below the reason for voiding the payment."
                  }
               >
                  <VoidClaimPaymentInputs
                     closeModal={closeVoidingModal}
                     claimPaymentId={claimPaymentId}
                  />
               </BillingModalWrapper>
            }
         />
         <SimpleModal
            openDefault={addingModalIsOpen}
            handleOpenClose={closeAddingModal}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.voidClaimPaymentWrapperStyle}
                  onClose={closeAddingModal}
                  titleContent={"Add Claim to Payment"}
                  content={
                     <TwoStepsContainer
                        activeStep={activeStep}
                        firstStepLabel={"Select Claim"}
                        lastStepLabel={"Payment Info"}
                     />
                  }
               >
                  <AddClaimModalInputs closeModal={closeAddingModal} />
               </BillingModalWrapper>
            }
         />
      </>
   );
};
