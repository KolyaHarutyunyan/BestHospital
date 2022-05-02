import { DownloadLink } from "@eachbase/components";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
   handleCreatedAtDate,
   makeCapitalize,
} from "@eachbase/utils";

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
                 handleCreatedAtDate(claim?.dateRange?.early, 10) ===
                 handleCreatedAtDate(selDateFrom, 10)
           )
         : selDateTo !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(selDateTo, 10)
           )
         : [];

   return filteredClaimsForClaimPmt;
}

export function getClaimDetailsForClaimPmt(claim) {
   const { createdDate, submittedDate, dateRange, staff, funder, client, totalCharge } =
      claim || {};

   const early = handleCreatedAtDate(dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

   const claimDetailsForClaimPmt = [
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
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(submittedDate, 10, "/"),
      },
   ];

   return claimDetailsForClaimPmt;
}
