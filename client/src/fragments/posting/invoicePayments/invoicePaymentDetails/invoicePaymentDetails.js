import React, { useContext, useState } from "react";
import { invoicePaymentDetailsStyle } from "./styles";
import { AddButton, DownloadLink, NoItemText } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   Images,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { InvoicePaymentInvoiceTable, InvoicePaymentModals } from "./core";

export const InvoicePaymentDetailsFragment = ({ invoicePaymentDetails }) => {
   const classes = invoicePaymentDetailsStyle();

   const {
      _id,
      client,
      status,
      paymentReference,
      totalBilled,
      totalCollected,
      paymentType,
      invoices,
   } = invoicePaymentDetails || {};

   const { open } = useContext(DrawerContext);

   const [editingModalIsOpen, setEditingModalIsOpen] = useState(false);
   const [voidingModalIsOpen, setVoidingModalIsOpen] = useState(false);
   const [addingModalIsOpen, setAddingModalIsOpen] = useState(false);
   const [activeStep, setActiveStep] = useState("first");

   const INVOICE_PAYMENT_DETAILS = [
      {
         detailText: "Client:",
         detail: makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Status:",
         detail: manageStatus(status),
      },
      {
         detailText: "Payment Reference:",
         detail: (
            <a
               className={classes.paymentRefStyle}
               href={`https://${paymentReference || "www.testlink.com"}`}
               target="_blank"
               rel="noreferrer noopener"
               onClick={(event) => event.stopPropagation()}
            >
               {paymentReference || "www.testlink.com"}
            </a>
         ),
      },
      {
         detailText: "Total Billed:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalBilled)),
      },
      {
         detailText: "Total Collected:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalCollected)),
      },
      {
         detailText: "EOB:",
         detail: !!"EOB.pdf" ? (
            <DownloadLink
               linkHref={"EOB.pdf"}
               linkInnerText={"Download"}
               linkDownload={true}
            />
         ) : null,
      },
      {
         detailText: "Payment Type:",
         detail: manageStatus(paymentType),
      },
   ];

   const filteredDetails = INVOICE_PAYMENT_DETAILS.filter(
      (invoicePmtDtl) => !!invoicePmtDtl.detail
   );

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
                              {item.detailText} <em> {item.detail} </em>
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
