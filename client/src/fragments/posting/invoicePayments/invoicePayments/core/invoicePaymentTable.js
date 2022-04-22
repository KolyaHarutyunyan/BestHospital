import React from "react";
import { InvoicePaymentTBody, InvoicePaymentTHead } from "./common";
import { invoicePaymentsCoreStyle } from "./styles";

export const InvoicePaymentTable = ({ invoicePayments = [] }) => {
   const classes = invoicePaymentsCoreStyle();

   return (
      <div className={classes.invoicePaymentTableStyle}>
         <InvoicePaymentTHead />
         <InvoicePaymentTBody invoicePayments={invoicePayments} />
      </div>
   );
};
