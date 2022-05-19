import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize } from "@eachbase/utils";

const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
   hooksForTable;

export function getFilteredClaimsForClaimPmt(
   claimsForClaimPmt = [],
   selClient,
   selDateFrom,
   selDateTo
) {
   const makeLowC = (value = "") => value?.toLowerCase();

   return claimsForClaimPmt.filter((claimForClaimPmt) => {
      const dateRangeFrom = claimForClaimPmt?.dateRange?.early;
      const clientName = `${claimForClaimPmt?.client?.firstName} ${claimForClaimPmt?.client?.lastName}`;
      const dateRangeTo = claimForClaimPmt?.dateRange?.latest;

      if (selDateFrom === "" && selClient === "All" && selDateTo === "") return true;

      if (selDateFrom !== "" && selClient === "All" && selDateTo === "")
         return handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom);

      if (selDateFrom === "" && selClient !== "All" && selDateTo === "")
         return makeLowC(clientName) === makeLowC(selClient);

      if (selDateFrom === "" && selClient === "All" && selDateTo !== "")
         return handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo);

      if (selDateFrom !== "" && selClient !== "All" && selDateTo === "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(clientName) === makeLowC(selClient)
         );

      if (selDateFrom !== "" && selClient === "All" && selDateTo !== "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (selDateFrom === "" && selClient !== "All" && selDateTo !== "")
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (selDateFrom !== "" && selClient !== "All" && selDateTo !== "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      return false;
   });
}

export function getClaimDetailsForClaimPmt(claim) {
   const { createdDate, dateRangeTo, dateRange, staff, funder, client, totalCharge } =
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
         detail: !!funder && makeCapitalize(funder?.name),
      },
      {
         detailText: "Total Charges:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalCharge)),
      },
      {
         detailText: "Submitted Date:",
         detail: handleCreatedAtDate(dateRangeTo),
      },
   ];

   return claimDetailsForClaimPmt;
}
