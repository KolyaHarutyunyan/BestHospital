import { hooksForTable } from "@eachbase/utils";

export function getFilteredClaims(
   claims = [],
   selFunder,
   selClient,
   selDateFrom,
   selDateTo,
   selStatus
) {
   const { handleCreatedAtDate } = hooksForTable;
   const makeLowC = (value = "") => value?.toLowerCase();

   return claims.filter((claim) => {
      const funderName = claim?.payer?.name;
      const clientName = `${claim?.client?.firstName} ${claim?.client?.lastName}`;
      const dateRangeFrom = claim?.dateRange?.early;
      const dateRangeTo = claim?.dateRange?.latest;
      const status = claim?.status;

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return true;

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return makeLowC(funderName) === makeLowC(selFunder);

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return makeLowC(clientName) === makeLowC(selClient);

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom);

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo);

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return makeLowC(status) === makeLowC(selStatus);

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selFunder !== "All" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder === "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selFunder !== "All" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      return false;
   });
}
