import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";

export function getInvoicePaymentDetails(invoicePayment) {
   const { client, status, paymentReference, totalBilled, totalCollected, paymentType } =
      invoicePayment || {};

   const { addSignToValueFromStart, getValueByFixedNumber } = hooksForTable;

   const invoicePaymentDetails = [
      {
         detailText: "Client:",
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Status:",
         detail: manageStatus(status),
      },
      {
         detailText: "Payment Reference:",
         detail: paymentReference,
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

   return invoicePaymentDetails;
}
