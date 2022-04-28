import React, { useContext, useEffect, useState } from "react";
import { addInvoiceModalInputsCoreStyle } from "./styles";
import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { InvoicePaymentModalTable } from "./common";

export const ModalLastStepInput = ({
   invoices = [],
   selectedInvoiceId,
   triggerBool,
   triggerFilledInvoice,
}) => {
   const classes = addInvoiceModalInputsCoreStyle();

   const selectedInvoice = invoices.find((invoice) => invoice._id === selectedInvoiceId);

   const { _id, dateRange, totalAmount, pdfDocument, client, status, totalTime } =
      selectedInvoice || {};

   const { open: drawerOpen } = useContext(DrawerContext);

   const [filledInvoice, setFilledInvoice] = useState(selectedInvoice);

   function triggerInputValue(paidAmount) {
      setFilledInvoice({ ...selectedInvoice, paidAmount });
   }

   useEffect(() => {
      triggerFilledInvoice && triggerFilledInvoice(filledInvoice);
   }, [filledInvoice]);

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const INVOICE_DETAILS = [
      {
         detailText: "Date Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Client:",
         detail: makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "PDF Document:",
         detail:
            !!pdfDocument || !!"file_pdf.pdf" ? (
               <DownloadLink
                  linkHref={pdfDocument || "file_pdf.pdf"}
                  linkInnerText={"Download"}
                  linkDownload={true}
               />
            ) : null,
      },
      {
         detailText: "Total Time:",
         detail: totalTime === 0 ? totalTime + "" : totalTime,
      },
      {
         detailText: "Status",
         detail: manageStatus(status),
      },
      {
         detailText: "Total Amount:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalAmount)),
      },
   ];

   const filteredDetails = INVOICE_DETAILS.filter((invoiceDtl) => !!invoiceDtl.detail);

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
               <InvoicePaymentModalTable
                  triggerBool={triggerBool}
                  triggerInputValue={triggerInputValue}
               />
            </div>
         </div>
      </>
   );
};
