import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";

export function getInvoiceDetails(invoice) {
   const { dateRange, totalAmount, pdfDocument, client, dueDate, status, totalTime } =
      invoice || {};

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const invoiceDetails = [
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
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Due Date:",
         detail: handleCreatedAtDate(dueDate, 10, "/"),
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
