import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize } from "@eachbase/utils";

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

   const { handleCreatedAtDate, addSignToValueFromStart, getValueByFixedNumber } =
      hooksForTable;

   const early = handleCreatedAtDate(dateRange?.early);
   const latest = handleCreatedAtDate(dateRange?.latest);

   const claimDetails = [
      {
         detailText: "Created Date:",
         detail: handleCreatedAtDate(createdDate),
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
         detail: handleCreatedAtDate(submittedDate),
      },
      {
         detailText: "Payment Reference",
         detail: paymentRef,
      },
   ];

   return claimDetails;
}
