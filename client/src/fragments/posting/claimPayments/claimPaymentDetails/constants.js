import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
   manageStatus,
} from "@eachbase/utils";
import { claimPaymentDetailsStyle } from "./styles";

export function getClaimPaymentDetails(claimPayment) {
   const { funder, paymentDate, paymentReference, paymentType, paymentAmount } =
      claimPayment || {};

   const classes = claimPaymentDetailsStyle();

   const claimPaymentDetails = [
      {
         detailText: "Funding Source:",
         detail: makeCapitalize(`${funder?.firstName} ${funder?.lastName}`),
      },
      {
         detailText: "Payment Date:",
         detail: handleCreatedAtDate(paymentDate, 10, "/"),
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
