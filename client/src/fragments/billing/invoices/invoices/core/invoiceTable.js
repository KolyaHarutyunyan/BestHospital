import React from "react";
import { InvoiceTBody, InvoiceTHead } from "./common";
import { invoicesCoreStyle } from "./styles";

export const InvoiceTable = ({ invoices = [] }) => {
   const classes = invoicesCoreStyle();

   return (
      <div className={classes.invoiceTableStyle}>
         <InvoiceTHead />
         <InvoiceTBody invoices={invoices} />
      </div>
   );
};
