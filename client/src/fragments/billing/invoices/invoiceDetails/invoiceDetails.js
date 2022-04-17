import React, { useContext } from "react";
import { invoiceDetailsStyle } from "./styles";
import { DownloadLink, NoItemText } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { InvoiceReceivableTable } from "./core";

export const InvoiceDetailsFragment = ({ invoiceDetails }) => {
   const classes = invoiceDetailsStyle();

   const {
      _id,
      dateRange,
      totalAmount,
      pdfDocument,
      client,
      dueDate,
      status,
      totalTime,
      receivables,
   } = invoiceDetails || {};

   const { open: drawerOpen } = useContext(DrawerContext);

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const start = handleCreatedAtDate(dueDate?.start, 10, "/");
   const end = handleCreatedAtDate(dueDate?.end, 10, "/");

   const INVOICE_DETAILS = [
      {
         detailText: "Date Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Invoice Total:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalAmount)),
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
         detailText: "Client:",
         detail: makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Due Date:",
         detail: `${start} - ${end}`,
      },
      {
         detailText: "Status",
         detail: manageStatus(status),
      },
      {
         detailText: "Total Time:",
         detail: totalTime === 0 ? totalTime + "" : totalTime,
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
                  <h2 className={classes.invoiceDetailsTitleStyle}>Receivables</h2>
               </div>
               {!!receivables?.length ? (
                  <div className={classes.receivablesTableBoxStyle}>
                     <InvoiceReceivableTable invoiceReceivables={receivables} />
                  </div>
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
      </>
   );
};
