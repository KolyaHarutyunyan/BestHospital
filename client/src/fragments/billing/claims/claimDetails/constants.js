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
      { detailText: "Staff:", detail: makeCapitalize(staff?.firstName) },
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
         detail: makeCapitalize(client?.firstName),
      },
      {
         detailText: "Founding Source:",
         detail: makeCapitalize(funder?.firstName),
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
