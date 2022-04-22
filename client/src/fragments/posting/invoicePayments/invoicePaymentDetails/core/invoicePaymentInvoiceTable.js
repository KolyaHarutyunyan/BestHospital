import React from "react";
import { InvoicePaymentInvoiceTBody, InvoicePaymentInvoiceTHead } from "./common";
import { invoicePaymentDetailsCoreStyle } from "./styles";

export const InvoicePaymentInvoiceTable = ({ invoicePaymentInvoices = [] }) => {
   const classes = invoicePaymentDetailsCoreStyle();

   return (
      <div className={classes.invoiceContainerStyle}>
         <InvoicePaymentInvoiceTHead />
         <div>
            {invoicePaymentInvoices.map((item, index) => (
               <InvoicePaymentInvoiceTBody key={index} invoice={item} />
            ))}
         </div>
      </div>
   );
};

