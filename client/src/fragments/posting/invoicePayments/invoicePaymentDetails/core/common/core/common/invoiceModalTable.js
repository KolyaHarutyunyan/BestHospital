import React from "react";
import { InvoiceModalTBody, InvoiceModalTHead } from "./core";
import { invoiceModalTHeadTBodyStyle } from "./styles";

export const InvoiceModalTable = ({ invoices = [], triggerId }) => {
   const classes = invoiceModalTHeadTBodyStyle();

   return (
      <div className={classes.invoiceModalTableStyle}>
         <InvoiceModalTHead />
         <InvoiceModalTBody invoices={invoices} triggerId={triggerId} />
      </div>
   );
};
