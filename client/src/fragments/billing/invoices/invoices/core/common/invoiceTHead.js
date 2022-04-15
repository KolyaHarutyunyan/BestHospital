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

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>
            {getInvoiceTitle("Service Dates", "latestEarliest")}
         </div>
         <div className={classes.thStyle}>{getInvoiceTitle("Client")}</div>
         <div className={classes.thStyle}>
            {getInvoiceTitle("Total Hours", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getInvoiceTitle("Total Amount", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getInvoiceTitle("Invoice Date", "latestEarliest")}
         </div>
         <div className={classes.thStyle}>{getInvoiceTitle("Status", "arrow")}</div>
      </div>
   );
};
