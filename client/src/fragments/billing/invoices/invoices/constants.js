import { hooksForTable } from "@eachbase/utils";

export function getFilteredInvoices(
   invoices = [],
   selClient,
   selDateFrom,
   selDateTo,
   selStatus,
   selDate
) {
   const { handleCreatedAtDate } = hooksForTable;
   const makeLowC = (value = "") => value?.toLowerCase();

   return invoices.filter((invoice) => {
      const invoiceDate = invoice?.invoiceDate;
      const clientName = `${invoice?.client?.firstName} ${invoice?.client?.lastName}`;
      const dateRangeFrom = invoice?.dateRange?.early;
      const dateRangeTo = invoice?.dateRange?.latest;
      const status = invoice?.status;

      if (
         selDate === "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return true;

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate);

      if (
         selDate === "" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return makeLowC(clientName) === makeLowC(selClient);

      if (
         selDate === "" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom);

      if (
         selDate === "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo);

      if (
         selDate === "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return makeLowC(status) === makeLowC(selStatus);

      if (
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom)
         );

      if (
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate === "" &&
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
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus === "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (
         selDate !== "" &&
         selClient === "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom === "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo === "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      if (
         selDate === "" &&
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
         selDate !== "" &&
         selClient !== "All" &&
         selDateFrom !== "" &&
         selDateTo !== "" &&
         selStatus !== "All"
      )
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      return false;
   });
}
