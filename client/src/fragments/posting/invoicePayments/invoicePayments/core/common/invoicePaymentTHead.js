import React, { useContext } from "react";
import { SearchAndFilter } from "@eachbase/components";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import { invoicePaymentTHeadTBodyStyle } from "./styles";

export const InvoicePaymentTHead = () => {
   const classes = invoicePaymentTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getInvoicePaymentTitle(givenTitle = "", ...rest) {
      const size = open ? 1880 : 1680;
      const limit = open ? 7 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const invoicePaymentId = <SearchAndFilter title={"ID"} custom={false} />;
   const client = <SearchAndFilter title={"Client"} />;
   const totalBilled = getInvoicePaymentTitle("Total Billed", "", false);
   const totalCollected = getInvoicePaymentTitle("Total Collected", "", false);
   const status = <SearchAndFilter title={"Status"} type={"arrow"} />;
   const paymentReference = getInvoicePaymentTitle("Payment Reference", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{invoicePaymentId}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalBilled}</div>
         <div className={classes.thStyle}>{totalCollected}</div>
         <div className={classes.thStyle}>{status}</div>
         <div className={classes.thStyle}>{paymentReference}</div>
      </div>
   );
};
