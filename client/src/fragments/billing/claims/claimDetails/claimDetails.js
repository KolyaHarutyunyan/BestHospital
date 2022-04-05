import React, { useContext, useState } from "react";
import { claimDetailsStyle } from "./styles";
import {
   BillTransactionWrapper,
   DownloadLink,
   SimpleModal,
} from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { ReceivableTable } from "./core";

export const ClaimDetailsFragment = ({ claimDetails }) => {
   const classes = claimDetailsStyle();

   const dispatch = useDispatch();

   const { open: drawerOpen } = useContext(DrawerContext);

   const {
      _id,
      createdDate,
      submittedDate,
      dateOfRange,
      staff,
      funder,
      client,
      totalCharge,
      ammountPaid,
      paymentRef,
      receivables,
   } = claimDetails || {};

   const [open, setOpen] = useState(false);

   const CLAIM_DETAILS = [
      {
         detailText: "Created Date:",
         detail: handleCreatedAtDate(createdDate, 10, "/"),
      },
      {
         detailText: "Date of Range:",
         detail: handleCreatedAtDate(dateOfRange, 10, "/"),
      },
      { detailText: "Staff:", detail: makeCapitalize(staff?.middleName) },
      {
         detailText: "1500 Form:",
         detail: !!"file_pdf.pdf" ? (
            <DownloadLink
               linkHref={"file_pdf.pdf"}
               linkInnerText={"Download"}
               linkDownload={true}
            />
         ) : null,
      },
      {
         detailText: "Client:",
         detail: makeCapitalize(client?.middleName),
      },
      {
         detailText: "Founding Source:",
         detail: makeCapitalize(funder?.middleName),
      },
      {
         detailText: "Total Charges:",
         detail: addSignToValueFromStart(
            getValueByFixedNumber(
               totalCharge === 0 ? totalCharge + "" : totalCharge
            )
         ),
      },
      {
         detailText: "Amount Paid:",
         detail: addSignToValueFromStart(
            getValueByFixedNumber(
               ammountPaid === 0 ? ammountPaid + "" : ammountPaid
            )
         ),
      },
      {
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(submittedDate, 10, "/"),
      },
      {
         detailText: "Payment Reference",
         detail: paymentRef,
      },
   ];

   const filteredDetails = CLAIM_DETAILS.filter((billDtl) => billDtl.detail);

   return (
      <>
         <div className={classes.claimDetailsContainerStyle}>
            <div className={classes.claimDetailsStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>
                     Claim Details
                  </h2>
               </div>
               <button
                  className={classes.closeClaimButnStyle}
                  type="button"
                  onClick={() => setOpen(true)}
               >
                  Close Claim
               </button>
            </div>
            <div className={classes.claimDetailsFirstPartStyle}>
               <div className={classes.claimOutlineStyle}>
                  <span className={classes.claimIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.claimDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index} className={drawerOpen ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {item.detail} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.claimInfoBoxStyle}>
               <img src={Images.claimInfo} alt="" />
               <p className={classes.claimInfoStyle}>
                  This Claim has been deleted for Lorem Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry’s standard dummy text ever since
                  the 150.
               </p>
            </div>
            <div className={classes.claimDetailsSecondPartStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>
                     Receivables
                  </h2>
               </div>
               <div className={classes.receivablesTableBoxStyle}>
                  <ReceivableTable claimReceivables={receivables} />
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillTransactionWrapper
                  onClose={() => setOpen(false)}
                  titleContent={"Close This Claim?"}
                  subtitleContent={
                     "Please indicate below the reason for closing the claim."
                  }
               >
                  <div>close claim content here..</div>
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
