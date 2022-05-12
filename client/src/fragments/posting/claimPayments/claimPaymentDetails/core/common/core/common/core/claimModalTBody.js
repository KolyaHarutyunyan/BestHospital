import React from "react";
import { claimModalTHeadTBodyStyle } from "./styles";
import { getModalDataForTable, hooksForTable, useWidth } from "@eachbase/utils";

export const ClaimModalTBody = ({ claims = [], triggerId }) => {
   const classes = claimModalTHeadTBodyStyle();

   const width = useWidth();

   const {
      addSignToValueFromStart,
      getFullName,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getModalDataForTable(data, width));
   }
   return (
      <div className={classes.tbodyContainerStyle}>
         {claims.map((claim, index) => {
            const early = handleCreatedAtDate(claim?.dateRange?.early);
            const latest = handleCreatedAtDate(claim?.dateRange?.latest);
            const clientFirstName = claim?.client?.firstName;
            const clientLastName = claim?.client?.firstName;

            const claimId = getTableData(claim._id);
            const datePeriod = getTableData(`${early} - ${latest}`);
            const funder = getTableData(claim?.funder?.name);
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
