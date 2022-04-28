import React, { useContext } from "react";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { invoiceTHeadTBodyStyle } from "./styles";

export const InvoiceTHead = () => {
   const classes = invoiceTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1880 : 1680;
   const limit = open ? 7 : 9;

   function getInvoiceTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const serviceDates = getInvoiceTitle("Service Dates", "latestEarliest");
   const client = getInvoiceTitle("Client");
   const totalHours = getInvoiceTitle("Total Hours", "", false);
   const totalAmount = getInvoiceTitle("Total Amount", "", false);
   const invoiceDate = getInvoiceTitle("Invoice Date", "latestEarliest");
   const status = getInvoiceTitle("Status", "arrow");

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{serviceDates}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalHours}</div>
         <div className={classes.thStyle}>{totalAmount}</div>
         <div className={classes.thStyle}>{invoiceDate}</div>
         <div className={classes.thStyle}>{status}</div>
      </div>
   );
};
