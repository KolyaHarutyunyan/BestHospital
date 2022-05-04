import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";
import { invoicePaymentDetailsStyle } from "./styles";

export function getInvoicePaymentDetails(invoicePayment) {
   const classes = invoicePaymentDetailsStyle();

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

   return invoicePaymentDetails;
}
