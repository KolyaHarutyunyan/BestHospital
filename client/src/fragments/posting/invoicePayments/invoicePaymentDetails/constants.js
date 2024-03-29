import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";
// import { invoicePaymentDetailsStyle } from "./styles";

export function getInvoicePaymentDetails(invoicePayment) {
   const { client, status, checkNumber, totalBilled, totalUsed, paymentType, documents } =
      invoicePayment || {};

   // const classes = invoicePaymentDetailsStyle();

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
         detail: checkNumber,
         // detail: (
         //    <a
         //       className={classes.paymentRefStyle}
         //       href={`https://${paymentReference || "www.testlink.com"}`}
         //       target="_blank"
         //       rel="noreferrer noopener"
         //       onClick={(event) => event.stopPropagation()}
         //    >
         //       {paymentReference || "www.testlink.com"}
         //    </a>
         // ),
      },
      {
         detailText: "Total Amount:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalBilled)),
      },
      {
         detailText: "Total Used:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalUsed)),
      },
      {
         detailText: "EOB:",
         detail:
            !!documents && !!documents[0]?.file?.url ? (
               <DownloadLink
                  linkHref={documents[0]?.file?.url}
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
