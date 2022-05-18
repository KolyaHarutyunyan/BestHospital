import React from "react";
import {
   BillingModalWrapper,
   SimpleModal,
   TwoStepsContainer,
} from "@eachbase/components";
import { invoicePaymentDetailsCoreStyle } from "./styles";
import { AddInvoiceModalInputs } from "./common";
import { InvoicePaymentInputs } from "../../invoicePayments/core";
import { VoidInvoicePaymentInputs } from ".";

export const InvoicePaymentModals = ({
   invoicePaymentDetails,
   activeStep,
   handleActiveStep,
   invoicePaymentId,
   closeEditingModal,
   closeVoidingModal,
   closeAddingModal,
   editingModalIsOpen,
   voidingModalIsOpen,
   addingModalIsOpen,
   mappedClients,
}) => {
   const classes = invoicePaymentDetailsCoreStyle();

   const editingInvoiceSubtitleContent =
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
               <BillingModalWrapper
                  wrapperStylesName={classes.editClaimPaymentWrapperStyle}
                  onClose={closeEditingModal}
                  titleContent={"Edit Payment"}
                  subtitleContent={editingInvoiceSubtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <InvoicePaymentInputs
                     info={invoicePaymentDetails}
                     activeStep={activeStep}
                     handleStep={handleActiveStep}
                     closeModal={closeEditingModal}
                     mappedClients={mappedClients}
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
                  <VoidInvoicePaymentInputs
                     closeModal={closeVoidingModal}
                     invoicePaymentId={invoicePaymentId}
                  />
               </BillingModalWrapper>
            }
         />
         <SimpleModal
            openDefault={addingModalIsOpen}
            handleOpenClose={closeAddingModal}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.addClaimPaymentWrapperStyle}
                  onClose={closeAddingModal}
                  titleContent={"Add Invoice to Payment"}
                  content={
                     <TwoStepsContainer
                        activeStep={activeStep}
                        firstStepLabel={"Select Invoice"}
                        lastStepLabel={"Payment Info"}
                     />
                  }
               >
                  <AddInvoiceModalInputs
                     activeStep={activeStep}
                     handleStep={handleActiveStep}
                     closeModal={closeAddingModal}
                     invoicePaymentId={invoicePaymentId}
                  />
               </BillingModalWrapper>
            }
         />
      </>
   );
};
