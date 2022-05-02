import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";

export function getFilteredInvoicesForInvoicePmt(
   invoices,
   selDateFrom,
   selDateTo,
   selDate
) {
   const filteredInvoicesForInvoicePmt =
      selDateFrom === "" && selDateTo === "" && selDate === ""
         ? invoices
         : selDateFrom !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.early, 10) ===
                 handleCreatedAtDate(selDateFrom, 10)
           )
         : selDateTo !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(selDateTo, 10)
           )
         : selDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate, 10) ===
                 handleCreatedAtDate(selDate, 10)
           )
         : [];

   return filteredInvoicesForInvoicePmt;
}

export function getInvoiceDetailsForInvoicePmt(invoice) {
   const { dateRange, totalAmount, pdfDocument, client, status, totalTime } =
      invoice || {};

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const invoiceDetailsForInvoicePmt = [
      {
         detailText: "Date Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Client:",
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
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

   return invoiceDetailsForInvoicePmt;
}
