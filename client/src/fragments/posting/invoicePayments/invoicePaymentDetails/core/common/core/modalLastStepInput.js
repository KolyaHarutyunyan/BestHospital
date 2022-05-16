import React, { useContext } from "react";
import { addInvoiceModalInputsCoreStyle } from "./styles";
import { DrawerContext, getLimitedVal } from "@eachbase/utils";
import { InvoicePaymentModalTable } from "./common";
import { getInvoiceDetailsForInvoicePmt } from "./constants";
import { NoItemText } from "@eachbase/components";

export const ModalLastStepInput = ({
   invoices = [],
   selectedInvoiceId,
   triggerBool,
   triggerReceivables,
}) => {
   const classes = addInvoiceModalInputsCoreStyle();

   const selectedInvoice = invoices.find((invoice) => invoice._id === selectedInvoiceId);

   const { _id, receivable } = selectedInvoice || {};

   const { open: drawerOpen } = useContext(DrawerContext);

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
                     ID: {getLimitedVal(_id, 5)}
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
               {!!receivable?.length ? (
                  <InvoicePaymentModalTable
                     invoiceReceivables={receivable}
                     triggerBool={triggerBool}
                     triggerReceivables={triggerReceivables}
                  />
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
      </>
   );
};
