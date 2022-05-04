import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";
import { claimPaymentDetailsStyle } from "./styles";

export function getClaimPaymentDetails(claimPayment) {
   const { funder, paymentDate, paymentReference, paymentType, paymentAmount } =
      claimPayment || {};

   const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
      hooksForTable;

   const classes = claimPaymentDetailsStyle();

   const claimPaymentDetails = [
      {
         detailText: "Funding Source:",
         detail: !!funder && makeCapitalize(`${funder?.firstName} ${funder?.lastName}`),
      },
      {
         detailText: "Payment Date:",
         detail: handleCreatedAtDate(paymentDate),
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
         detailText: "Payment Type:",
         detail: manageStatus(paymentType),
      },
      {
         detailText: "Payment Amount:",
         detail: addSignToValueFromStart(getValueByFixedNumber(paymentAmount)),
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
   ];

   return claimPaymentDetails;
}
