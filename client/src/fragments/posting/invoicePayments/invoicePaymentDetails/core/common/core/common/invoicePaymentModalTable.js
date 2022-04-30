import React from "react";
import { InvoicePaymentModalTBody, InvoicePaymentModalTHead } from "./core";
import { invoiceModalTHeadTBodyStyle } from "./styles";

export const InvoicePaymentModalTable = ({ triggerBool, triggerInputValue }) => {
   const classes = invoiceModalTHeadTBodyStyle();

   return (
      <div className={classes.paymentContainerStyle}>
         <InvoicePaymentModalTHead />
         <InvoicePaymentModalTBody
            triggerBool={triggerBool}
            triggerInputValue={triggerInputValue}
         />
      </div>
   );
};
