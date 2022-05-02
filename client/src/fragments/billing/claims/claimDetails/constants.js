import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
} from "@eachbase/utils";

export function getClaimDetails(claim) {
   const {
      createdDate,
      submittedDate,
      dateRange,
      staff,
      funder,
      client,
      totalCharge,
      ammountPaid,
      paymentRef,
   } = claim || {};

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const claimDetails = [
      {
         detailText: "Created Date:",
         detail: handleCreatedAtDate(createdDate, 10, "/"),
      },
      {
         detailText: "Date of Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Staff:",
         detail: !!staff && makeCapitalize(`${staff?.firstName} ${staff?.lastName}`),
      },
      {
         detailText: "1500 Form:",
         detail: !!"file_pdf.pdf" ? (
            <DownloadLink
               linkHref={"file_pdf.pdf"}
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
         detailText: "Founding Source:",
         detail: !!funder && makeCapitalize(`${funder?.firstName} ${funder?.lastName}`),
      },
      {
         detailText: "Total Charges:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalCharge)),
      },
      {
         detailText: "Amount Paid:",
         detail: addSignToValueFromStart(getValueByFixedNumber(ammountPaid)),
      },
      {
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(submittedDate, 10, "/"),
      },
      {
         detailText: "Payment Reference",
         detail: paymentRef,
      },
   ];

   return claimDetails;
}
