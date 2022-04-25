import React, { useContext, useState } from "react";
import { claimPaymentDetailsStyle } from "./styles";
import { AddButton, DownloadLink, NoItemText } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { ClaimPaymentClaimTable, ClaimPaymentModals } from "./core";

export const ClaimPaymentDetailsFragment = ({ claimPaymentDetails }) => {
   const classes = claimPaymentDetailsStyle();

   const {
      _id,
      funder,
      paymentDate,
      paymentReference,
      paymentType,
      paymentAmount,
      claims,
   } = claimPaymentDetails || {};

   const { open } = useContext(DrawerContext);

   const [editingModalIsOpen, setEditingModalIsOpen] = useState(false);
   const [voidingModalIsOpen, setVoidingModalIsOpen] = useState(false);
   const [addingModalIsOpen, setAddingModalIsOpen] = useState(false);

   const CLAIM_PAYMENT_DETAILS = [
      {
         detailText: "Funding Source:",
         detail: makeCapitalize(`${funder?.firstName} ${funder?.lastName}`),
      },
      {
         detailText: "Payment Date:",
         detail: handleCreatedAtDate(paymentDate, 10, "/"),
      },
      {
         detailText: "Payment Reference:",
         detail: (
            <a
               className={classes.paymentRefStyle}
               href={`https://${paymentReference || "www.testlink.com"}`}
               target="_blank"
               rel="noreferrer noopener"
               onClick={(event) => event.stopPropagation()}
            >
               {paymentReference || "www.testlink.com"}
            </a>
         ),
      },
      {
         detailText: "Payment Type:",
         detail: manageStatus(paymentType),
      },
      {
         detailText: "Payment Amount:",
         detail: addSignToValueFromStart(getValueByFixedNumber(paymentAmount)),
      },
      {
         detailText: "EOB:",
         detail: !!"EOB.pdf" ? (
            <DownloadLink
               linkHref={"EOB.pdf"}
               linkInnerText={"Download"}
               linkDownload={true}
            />
         ) : null,
      },
   ];

   const filteredDetails = CLAIM_PAYMENT_DETAILS.filter(
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
