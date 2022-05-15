import React, { useContext, useState } from "react";
import { invoicePaymentDetailsStyle } from "./styles";
import { AddButton, NoItemText } from "@eachbase/components";
import {
   DrawerContext,
   getLimitedVal,
   hooksForTable,
   Images,
   useWidth,
} from "@eachbase/utils";
import { InvoicePaymentInvoiceTable, InvoicePaymentModals } from "./core";
import { getInvoicePaymentDetails } from "./constants";

export const InvoicePaymentDetailsFragment = ({ invoicePaymentDetails }) => {
   const classes = invoicePaymentDetailsStyle();

   const { open } = useContext(DrawerContext);

   const [editingModalIsOpen, setEditingModalIsOpen] = useState(false);
   const [voidingModalIsOpen, setVoidingModalIsOpen] = useState(false);
   const [addingModalIsOpen, setAddingModalIsOpen] = useState(false);
   const [activeStep, setActiveStep] = useState("first");

   const { _id, invoices } = invoicePaymentDetails || {};

   const filteredDetails = getInvoicePaymentDetails(invoicePaymentDetails).filter(
      (invoicePmtDtl) => !!invoicePmtDtl.detail
   );

   const width = useWidth();

   const { getTextDependsOnWidth } = hooksForTable;

   function getDetailDisplay(detail) {
      return getTextDependsOnWidth(width, 1480, detail, 14);
   }

   return (
      <>
         <div className={classes.invoicePaymentDetailsContainerStyle}>
            <div className={classes.invoicePaymentDetailsStyle}>
               <div className={classes.invoicePaymentDetailsTitleBoxStyle}>
                  <h2 className={classes.invoicePaymentDetailsTitleStyle}>
                     Payment Details
                  </h2>
               </div>
               <div className={classes.editAndVoidinvoiceBoxStyle}>
                  <div
                     className={classes.editIconStyle}
                     onClick={() => setEditingModalIsOpen(true)}
                  >
                     <img src={Images.edit} alt="" />
                  </div>
                  <button
                     className={classes.voidinvoicePaymentButnStyle}
                     type="button"
                     onClick={() => setVoidingModalIsOpen(true)}
                  >
                     Void
                  </button>
               </div>
            </div>
            <div className={classes.invoicePaymentDetailsFirstPartStyle}>
               <div className={classes.invoicePaymentOutlineStyle}>
                  <span className={classes.invoicePaymentIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.invoicePaymentDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index} className={open ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {getDetailDisplay(item.detail)} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.invoicePaymentDetailsSecondPartStyle}>
               <div className={classes.invoicePaymentDetailsTitleBoxStyle}>
                  <h2 className={classes.invoicePaymentDetailsTitleStyle}>Invoices</h2>
                  <AddButton
                     text={"Add Invoice"}
                     handleClick={() => setAddingModalIsOpen(true)}
                  />
               </div>
               {!!invoices?.length ? (
                  <div>
                     <InvoicePaymentInvoiceTable invoicePaymentInvoices={invoices} />
                  </div>
               ) : (
                  <NoItemText text={"No Invoices Yet"} />
               )}
            </div>
         </div>
         <InvoicePaymentModals
            invoicePaymentDetails={invoicePaymentDetails}
            activeStep={activeStep}
            handleActiveStep={setActiveStep}
            invoicePaymentId={_id}
            closeEditingModal={() => setEditingModalIsOpen(false)}
            closeVoidingModal={() => setVoidingModalIsOpen(false)}
            closeAddingModal={() => setAddingModalIsOpen(false)}
            editingModalIsOpen={editingModalIsOpen}
            voidingModalIsOpen={voidingModalIsOpen}
            addingModalIsOpen={addingModalIsOpen}
         />
      </>
   );
};
