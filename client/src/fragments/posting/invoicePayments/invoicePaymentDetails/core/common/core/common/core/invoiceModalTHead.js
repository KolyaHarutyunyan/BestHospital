import React from "react";
import { getLimitedVal, getTableHeader } from "@eachbase/utils";
import { invoiceModalTHeadTBodyStyle } from "./styles";

export const InvoiceModalTHead = () => {
   const classes = invoiceModalTHeadTBodyStyle();

   function getInvoiceTitle(givenTitle = "", ...rest) {
      return getTableHeader(givenTitle, getLimitedVal(givenTitle, 15), ...rest);
   }

   const serviceDates = getInvoiceTitle("Service Dates", "latestEarliest", true, true);
   const client = getInvoiceTitle("Client", "", false);
   const totalHours = getInvoiceTitle("Total Hours", "", false);
   const invoiceDate = getInvoiceTitle("Invoice Date", "latestEarliest", true, true);
   const totalAMT = getInvoiceTitle("Total AMT", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{serviceDates}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalHours}</div>
         <div className={classes.thStyle}>{invoiceDate}</div>
         <div className={classes.thStyle}>{totalAMT}</div>
      </div>
   );
};
