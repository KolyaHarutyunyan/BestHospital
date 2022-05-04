import React, { useContext } from "react";
import { claimTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import { DrawerContext, hooksForTable, manageStatus, useWidth } from "@eachbase/utils";
import { getClaimData } from "./constants";

export const ClaimTBody = ({ claims = [] }) => {
   const classes = claimTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const {
      addSignToValueFromStart,
      getFullName,
      getTableHeader,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getClaimData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claims.map((claim, index) => {
            const early = handleCreatedAtDate(claim?.dateRange?.early);
            const latest = handleCreatedAtDate(claim?.dateRange?.latest);
            const funderFirstName = claim?.funder?.firstName;
            const funderLastName = claim?.funder?.lastName;
            const clientFirstName = claim?.client?.firstName;
            const clientLastName = claim?.client?.firstName;

            const claimId = getTableData(claim._id);
            const datePeriod = getTableData(`${early} - ${latest}`);
            const funder = getFullName(funderFirstName, funderLastName, getTableData);
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalCharged = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge))
            );
            const totalPaid = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.ammountPaid))
            );
            const remaining = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
            );
            const status = showDashIfEmpty(manageStatus(claim.status));
            const paymentReference = getTableHeader(
               claim.paymentRef || "www.testlink.com",
               getTableData(claim.paymentRef || "www.testlink.com"),
               "",
               false
            );

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/claim/${claim._id}`)}
               >
                  <div className={classes.tdStyle}>{claimId}</div>
                  <div className={classes.tdStyle}>{datePeriod}</div>
                  <div className={classes.tdStyle}>{funder}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalCharged}</div>
                  <div className={classes.tdStyle}>{totalPaid}</div>
                  <div className={classes.tdStyle}>{remaining}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>
                     <a
                        className={classes.paymentRefStyle}
                        href={`https://${claim.paymentRef || "www.testlink.com"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {paymentReference}
                     </a>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
