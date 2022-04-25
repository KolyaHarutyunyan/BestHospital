import React, { useContext, useState } from "react";
import { invoicePaymentDetailsStyle } from "./styles";
import {
   AddButton,
   BillingModalWrapper,
   DownloadLink,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { InvoicePaymentInvoiceTable, VoidInvoicePaymentInputs } from "./core";

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

   const { open: drawerOpen } = useContext(DrawerContext);

   const [open, setOpen] = useState(false);

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
         detail: manageStatus(paymentType) 
      },
   ];

   const filteredDetails = INVOICE_PAYMENT_DETAILS.filter((invoicePmtDtl) => !!invoicePmtDtl.detail);

   return (
      <>
         <div className={classes.invoicePaymentDetailsContainerStyle}>
            <div className={classes.invoicePaymentDetailsStyle}>
               <div className={classes.invoicePaymentDetailsTitleBoxStyle}>
                  <h2 className={classes.invoicePaymentDetailsTitleStyle}>Payment Details</h2>
               </div>
               <div className={classes.editAndVoidinvoiceBoxStyle}>
                  <div className={classes.editIconStyle} onClick={() => {}}>
                     <img src={Images.edit} alt="" />
                  </div>
                  <button
                     className={classes.voidinvoicePaymentButnStyle}
                     type="button"
                     onClick={() => setOpen(true)}
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
                        <li key={index} className={drawerOpen ? "narrow" : ""}>
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
                     handleClick={() => {}}
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
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.voidInvoicePaymentWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={"Void This Payment?"}
                  subtitleContent={
                     "Please indicate below the reason for voiding the payment."
                  }
               >
                  <VoidInvoicePaymentInputs 
                     closeModal={() => setOpen(false)} 
                     invoicePaymentId={_id} 
                  />
               </BillingModalWrapper>
            }
         />
      </>
   );
};
