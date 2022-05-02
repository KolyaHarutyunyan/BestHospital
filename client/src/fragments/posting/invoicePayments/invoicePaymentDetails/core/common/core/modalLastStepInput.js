import React, { useContext, useEffect, useState } from "react";
import { addInvoiceModalInputsCoreStyle } from "./styles";
import { DrawerContext, getLimitedVal } from "@eachbase/utils";
import { InvoicePaymentModalTable } from "./common";
import { getInvoiceDetailsForInvoicePmt } from "./constants";

export const ModalLastStepInput = ({
   invoices = [],
   selectedInvoiceId,
   triggerBool,
   triggerFilledInvoice,
}) => {
   const classes = addInvoiceModalInputsCoreStyle();

   const selectedInvoice = invoices.find((invoice) => invoice._id === selectedInvoiceId);

   const { open: drawerOpen } = useContext(DrawerContext);

   const [filledInvoice, setFilledInvoice] = useState(selectedInvoice);

   function triggerInputValue(paidAmount) {
      setFilledInvoice({ ...selectedInvoice, paidAmount });
   }

   useEffect(() => {
      triggerFilledInvoice && triggerFilledInvoice(filledInvoice);
   }, [filledInvoice]);

   const filteredDetails = getInvoiceDetailsForInvoicePmt(selectedInvoice).filter(
      (invoiceDtl) => !!invoiceDtl.detail
   );

   return (
      <>
         <div className={classes.invoiceDetailsContainerStyle}>
            <div className={classes.invoiceDetailsStyle}>
               <div className={classes.invoiceDetailsTitleBoxStyle}>
                  <h2 className={classes.invoiceDetailsTitleStyle}>Invoice Details</h2>
               </div>
            </div>
            <div className={classes.invoiceDetailsFirstPartStyle}>
               <div className={classes.invoiceOutlineStyle}>
                  <span className={classes.invoiceIdTextBoxStyle}>
                     ID: {getLimitedVal(selectedInvoice?._id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.invoiceDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index} className={drawerOpen ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {item.detail} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.invoiceDetailsSecondPartStyle}>
               <div className={classes.invoiceDetailsTitleBoxStyle}>
                  <h2 className={classes.invoiceDetailsTitleStyle}>Invoice Payment</h2>
               </div>
               <InvoicePaymentModalTable
                  triggerBool={triggerBool}
                  triggerInputValue={triggerInputValue}
               />
            </div>
         </div>
      </>
   );
};