import React, { useEffect, useState } from "react";
import { InvoicePaymentModalTBody, InvoicePaymentModalTHead } from "./core";
import { invoiceModalTHeadTBodyStyle } from "./styles";

export const InvoicePaymentModalTable = ({
   invoiceReceivables = [],
   triggerBool,
   triggerReceivables,
}) => {
   const classes = invoiceModalTHeadTBodyStyle();

   const [receivables, setReceivables] = useState(invoiceReceivables);

   function passReceivable(receivableData) {
      setReceivables(
         receivables.map((receivable) => {
            if (receivable._id === receivableData._id) {
               return receivableData;
            }
            return receivable;
         })
      );
   }

   const filledReceivables = receivables.filter((receivable) => receivable.filled);

   const receivablesAreFilled = filledReceivables.length === receivables.length;

   useEffect(() => {
      triggerBool && triggerBool(receivablesAreFilled);
   }, [receivablesAreFilled]);

   useEffect(() => {
      triggerReceivables && triggerReceivables(receivables);
   }, [receivables]);

   return (
      <div className={classes.paymentContainerStyle}>
         <InvoicePaymentModalTHead />
         <div>
            {receivables.map((item, index) => (
               <InvoicePaymentModalTBody
                  key={index}
                  receivable={{ ...item, filled: false }}
                  passReceivable={passReceivable}
               />
            ))}
         </div>
      </div>
   );
};
