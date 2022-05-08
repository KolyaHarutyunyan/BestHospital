import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize } from "@eachbase/utils";

const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
   hooksForTable;

export function getFilteredClaimsForClaimPmt(claims, selClient, selDateFrom, selDateTo) {
   const filteredClaimsForClaimPmt =
      selClient === "All" && selDateFrom === "" && selDateTo === ""
         ? claims
         : selClient !== "All"
         ? claims.filter(
              (claim) =>
                 `${claim?.client?.firstName} ${claim?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selDateFrom !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.early) ===
                 handleCreatedAtDate(selDateFrom)
           )
         : selDateTo !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.latest) ===
                 handleCreatedAtDate(selDateTo)
           )
         : [];

   return filteredClaimsForClaimPmt;
}

export function getClaimDetailsForClaimPmt(claim) {
   const { createdDate, submittedDate, dateRange, staff, funder, client, totalCharge } =
      claim || {};

   const early = handleCreatedAtDate(dateRange?.early);
   const latest = handleCreatedAtDate(dateRange?.latest);

   const claimDetailsForClaimPmt = [
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
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(submittedDate),
      },
   ];

   return claimDetailsForClaimPmt;
}
