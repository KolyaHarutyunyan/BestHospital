import { hooksForTable } from "@eachbase/utils";

const { handleCreatedAtDate } = hooksForTable;

export function getFilteredClaims(
   claims = [],
   selFunder,
   selClient,
   selDateFrom,
   selDateTo,
   selStatus
) {
   const filteredClaims =
      selFunder === "All" &&
      selClient === "All" &&
      selDateFrom === "" &&
      selDateTo === "" &&
      selStatus === "All"
         ? claims
         : selFunder !== "All"
         ? claims.filter(
              (claim) =>
                 `${claim?.funder?.firstName} ${claim?.funder?.lastName}`.toLowerCase() ===
                 selFunder.toLowerCase()
           )
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
         : selStatus !== "All"
         ? claims.filter(
              (claim) => claim?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredClaims;
}
