import React, { useContext, useState } from "react";
import { claimPaymentDetailsStyle } from "./styles";
import { AddButton, NoItemText } from "@eachbase/components";
import { DrawerContext, getLimitedVal, Images } from "@eachbase/utils";
import { ClaimPaymentClaimTable, ClaimPaymentModals } from "./core";
import { getClaimPaymentDetails } from "./constants";

export const ClaimPaymentDetailsFragment = ({ claimPaymentDetails }) => {
   const classes = claimPaymentDetailsStyle();

   const { open } = useContext(DrawerContext);

   const [editingModalIsOpen, setEditingModalIsOpen] = useState(false);
   const [voidingModalIsOpen, setVoidingModalIsOpen] = useState(false);
   const [addingModalIsOpen, setAddingModalIsOpen] = useState(false);
   const [activeStep, setActiveStep] = useState("first");

   const { _id, claimIds: claims } = claimPaymentDetails || {};

   const filteredDetails = getClaimPaymentDetails(claimPaymentDetails).filter(
      (claimPmtDtl) => !!claimPmtDtl.detail
   );

   return (
      <>
         <div className={classes.claimPaymentDetailsContainerStyle}>
            <div className={classes.claimPaymentDetailsStyle}>
               <div className={classes.claimPaymentDetailsTitleBoxStyle}>
                  <h2 className={classes.claimPaymentDetailsTitleStyle}>
                     Payment Details
                  </h2>
               </div>
               <div className={classes.editAndVoidClaimBoxStyle}>
                  <div
                     className={classes.editIconStyle}
                     onClick={() => setEditingModalIsOpen(true)}
                  >
                     <img src={Images.edit} alt="" />
                  </div>
                  <button
                     className={classes.voidClaimPaymentButnStyle}
                     type="button"
                     onClick={() => setVoidingModalIsOpen(true)}
                  >
                     Void
                  </button>
               </div>
            </div>
            <div className={classes.claimPaymentDetailsFirstPartStyle}>
               <div className={classes.claimPaymentOutlineStyle}>
                  <span className={classes.claimPaymentIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.claimPaymentDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index} className={open ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {item.detail} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.claimPaymentDetailsSecondPartStyle}>
               <div className={classes.claimPaymentDetailsTitleBoxStyle}>
                  <h2 className={classes.claimPaymentDetailsTitleStyle}>Claims</h2>
                  <AddButton
                     text={"Add Claim"}
                     handleClick={() => setAddingModalIsOpen(true)}
                  />
               </div>
               {!!claims?.length ? (
                  <div>
                     <ClaimPaymentClaimTable claimPaymentClaims={claims} />
                  </div>
               ) : (
                  <NoItemText text={"No Claims Yet"} />
               )}
            </div>
         </div>
         <ClaimPaymentModals
            claimPaymentDetails={claimPaymentDetails}
            activeStep={activeStep}
            handleActiveStep={setActiveStep}
            claimPaymentId={_id}
            closeEditingModal={() => setEditingModalIsOpen(false)}
            closeVoidingModal={() => setVoidingModalIsOpen(false)}
            closeAddingModal={() => setAddingModalIsOpen(false)}
            editingModalIsOpen={editingModalIsOpen}
            voidingModalIsOpen={voidingModalIsOpen}
            addingModalIsOpen={addingModalIsOpen}
         />
      </>
   );
};
