import React from "react";
import { InvoiceReceivableTBody, InvoiceReceivableTHead } from "./common";
import { invoiceDetailsCoreStyle } from "./styles";

export const InvoiceReceivableTable = ({ invoiceReceivables = [] }) => {
   const classes = invoiceDetailsCoreStyle();

   return (
      <div className={classes.receivableContainerStyle}>
         <InvoiceReceivableTHead />
         <div>
            {invoiceReceivables.map((item, index) => (
               <InvoiceReceivableTBody key={index} receivable={item} />
            ))}
         </div>
      </div>
   );
};
