import React from "react";
import { claimModalTHeadTBodyStyle } from "./styles";
import {
   addSignToValueFromStart,
   getFullName,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

function getClaimData(givenData = "", givenWidth) {
   const firstSize = 1940;
   const firstLimit = 16;

   const secondSize = 1640;
   const secondLimit = 14;

   const thirdSize = 1345;
   const thirdLimit = 10;

   const initialLimit = 23;

   const tableData =
      givenWidth <= thirdSize
         ? getLimitedVal(givenData, thirdLimit)
         : givenWidth > thirdSize && givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export const ClaimModalTBody = ({ claims = [], triggerId }) => {
   const classes = claimModalTHeadTBodyStyle();

   const width = useWidth();

   function getTableData(data) {
      return showDashIfEmpty(getClaimData(data, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claims.map((claim, index) => {
            const early = handleCreatedAtDate(claim?.dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(claim?.dateRange?.latest, 10, "/");
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
               addSignToValueFromStart(getValueByFixedNumber(claim.amountPaid))
            );
            const remaining = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
            );

            return (
               <label
                  key={index}
                  htmlFor={claim._id}
                  className={classes.tbodyLabelStyle}
                  onClick={() => triggerId(claim._id)}
               >
                  <input type="radio" id={claim._id} name="claim" />
                  <div className={classes.tbodyRowStyle}>
                     <div className={classes.tdStyle}>{claimId}</div>
                     <div className={classes.tdStyle}>{datePeriod}</div>
                     <div className={classes.tdStyle}>{funder}</div>
                     <div className={classes.tdStyle}>{client}</div>
                     <div className={classes.tdStyle}>{totalCharged}</div>
                     <div className={classes.tdStyle}>{totalPaid}</div>
                     <div className={classes.tdStyle}>{remaining}</div>
                  </div>
               </label>
            );
         })}
      </div>
   );
};
