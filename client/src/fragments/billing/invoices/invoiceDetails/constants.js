import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";

export function getInvoiceDetails(invoice) {
   const { dateRange, invoiceTotal, pdfDocument, client, dueDate, status, totalTime } =
      invoice || {};

   const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
      hooksForTable;

   const early = handleCreatedAtDate(dateRange?.early);
   const latest = handleCreatedAtDate(dateRange?.latest);

   const invoiceDetails = [
      {
         detailText: "Date Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Invoice Total:",
         detail: addSignToValueFromStart(getValueByFixedNumber(invoiceTotal)),
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
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Due Date:",
         detail: handleCreatedAtDate(dueDate),
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

   return invoiceDetails;
}
