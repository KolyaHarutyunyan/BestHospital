import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const InvoicePaymentInvoiceTHead = () => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getInvoiceTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const serviceDates = getInvoiceTitle("Service Dates", "latestEarliest", true, true);
   const client = getInvoiceTitle("Client", "", true, true);
   const totalHours = getInvoiceTitle("Total Hours", "", false);
   const totalAmount = getInvoiceTitle("Total Amount", "", false);
   const invoiceDate = getInvoiceTitle("Invoice Date", "latestEarliest", true, true);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{serviceDates}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalHours}</div>
         <div className={classes.thStyle}>{totalAmount}</div>
         <div className={classes.thStyle}>{invoiceDate}</div>
      </div>
   );
};
