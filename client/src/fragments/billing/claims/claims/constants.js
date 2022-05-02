import { handleCreatedAtDate } from "@eachbase/utils";

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
                 handleCreatedAtDate(claim?.dateRange?.early, 10) ===
                 handleCreatedAtDate(selDateFrom, 10)
           )
         : selDateTo !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(selDateTo, 10)
           )
         : selStatus !== "All"
         ? claims.filter(
              (claim) => claim?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredClaims;
}
