import React, { useContext } from "react";
import { claimReceivableTableStyle } from "./styles";
import { DownloadLink, NoItemText } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
} from "@eachbase/utils";
import { ClaimReceivableModalTable } from "./common";

export const ModalLastStepInput = ({
   claims,
   selectedClaimId,
   triggerBool,
   triggerReceivables,
}) => {
   const classes = claimReceivableTableStyle();

   const selectedClaim = claims.find((claim) => claim._id === selectedClaimId);

   const {
      _id,
      createdDate,
      submittedDate,
      dateRange,
      staff,
      funder,
      client,
      totalCharge,
      receivable,
   } = selectedClaim || {};

   const { open: drawerOpen } = useContext(DrawerContext);

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const CLAIM_DETAILS = [
      {
         detailText: "Created Date:",
         detail: handleCreatedAtDate(createdDate, 10, "/"),
      },
      {
         detailText: "Date of Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Staff:",
         detail: makeCapitalize(`${staff?.firstName} ${staff?.lastName}`),
      },
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
         detail: makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Founding Source:",
         detail: makeCapitalize(`${funder?.firstName} ${funder?.lastName}`),
      },
      {
         detailText: "Total Charges:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalCharge)),
      },
      {
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(submittedDate, 10, "/"),
      },
   ];

   const filteredDetails = CLAIM_DETAILS.filter((claimDtl) => !!claimDtl.detail);

   return (
      <>
         <div className={classes.claimDetailsContainerStyle}>
            <div className={classes.claimDetailsStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Claim Details</h2>
               </div>
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
            <div className={classes.claimDetailsSecondPartStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Receivables</h2>
               </div>
               {!!receivable?.length ? (
                  <ClaimReceivableModalTable
                     claimReceivables={receivable}
                     triggerBool={triggerBool}
                     triggerReceivables={triggerReceivables}
                  />
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
      </>
   );
};
