import React from "react";
import {
   ModalContentWrapper,
   SimpleModal,
   TwoStepsContainer,
} from "@eachbase/components";
import { claimPaymentDetailsCoreStyle } from "./styles";
import { AddClaimModalInputs, VoidClaimPaymentInputs } from "./common";
import { ClaimPaymentInputs } from "../../claimPayments/core";

export const ClaimPaymentModals = ({
   claimPaymentDetails,
   activeStep,
   handleActiveStep,
   claimPaymentId,
   closeEditingModal,
   closeVoidingModal,
   closeAddingModal,
   editingModalIsOpen,
   voidingModalIsOpen,
   addingModalIsOpen,
   mappedFunders,
}) => {
   const classes = claimPaymentDetailsCoreStyle();

   const editingClaimSubtitleContent =
      activeStep === "last" ? (
         <>
            <em className={classes.warningStyle}>*</em>
            Only <em className={classes.highlightedTextStyle}> PDF, PNG, CSV </em> {"&"}
            <em className={classes.highlightedTextStyle}> JPEG </em> formats are
            supported.
         </>
      ) : (
         ""
      );

   return (
      <>
         <SimpleModal
            openDefault={editingModalIsOpen}
            handleOpenClose={closeEditingModal}
            content={
               <ModalContentWrapper
                  wrapperStylesName={classes.editClaimPaymentWrapperStyle}
                  onClose={closeEditingModal}
                  titleContent={"Edit Payment"}
                  subtitleContent={editingClaimSubtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <ClaimPaymentInputs
                     info={claimPaymentDetails}
                     activeStep={activeStep}
                     handleStep={handleActiveStep}
                     closeModal={closeEditingModal}
                     mappedFunders={mappedFunders}
                  />
               </ModalContentWrapper>
            }
         />
         <SimpleModal
            openDefault={voidingModalIsOpen}
            handleOpenClose={closeVoidingModal}
            content={
               <ModalContentWrapper
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
               </ModalContentWrapper>
            }
         />
         <SimpleModal
            openDefault={addingModalIsOpen}
            handleOpenClose={closeAddingModal}
            content={
               <ModalContentWrapper
                  wrapperStylesName={classes.addClaimPaymentWrapperStyle}
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
                  <AddClaimModalInputs
                     activeStep={activeStep}
                     handleStep={handleActiveStep}
                     closeModal={closeAddingModal}
                     claimPaymentId={claimPaymentId}
                  />
               </ModalContentWrapper>
            }
         />
      </>
   );
};
