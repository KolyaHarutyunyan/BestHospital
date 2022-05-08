import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";

const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
   hooksForTable;

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
                 handleCreatedAtDate(invoice?.dateRange?.early) ===
                 handleCreatedAtDate(selDateFrom)
           )
         : selDateTo !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.latest) ===
                 handleCreatedAtDate(selDateTo)
           )
         : selDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate) ===
                 handleCreatedAtDate(selDate)
           )
         : [];

   return filteredInvoicesForInvoicePmt;
}

export function getInvoiceDetailsForInvoicePmt(invoice) {
   const { dateRange, totalAmount, pdfDocument, client, status, totalTime } =
      invoice || {};

   const early = handleCreatedAtDate(dateRange?.early);
   const latest = handleCreatedAtDate(dateRange?.latest);

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
