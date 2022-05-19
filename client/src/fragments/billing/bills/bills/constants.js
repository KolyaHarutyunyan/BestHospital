import { hooksForTable } from "@eachbase/utils";

export function getFilteredBills(bills = [], selFunder, selClient, selDate) {
   const { handleCreatedAtDate } = hooksForTable;
   const makeLowC = (value = "") => value?.toLowerCase();

   return bills.filter((bill) => {
      const funderName = bill?.payer?.name;
      const clientName = `${bill?.client?.firstName} ${bill?.client?.lastName}`;
      const submittedDate = bill?.dateOfService;

      if (selFunder === "All" && selClient === "All" && selDate === "") return true;

      if (selFunder !== "All" && selClient === "All" && selDate === "")
         return makeLowC(funderName) === makeLowC(selFunder);

      if (selFunder === "All" && selClient !== "All" && selDate === "")
         return makeLowC(clientName) === makeLowC(selClient);

      if (selFunder === "All" && selClient === "All" && selDate !== "")
         return handleCreatedAtDate(submittedDate) === handleCreatedAtDate(selDate);

      if (selFunder !== "All" && selClient !== "All" && selDate === "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient)
         );

      if (selFunder !== "All" && selClient === "All" && selDate !== "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(submittedDate) === handleCreatedAtDate(selDate)
         );

      if (selFunder === "All" && selClient !== "All" && selDate !== "")
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(submittedDate) === handleCreatedAtDate(selDate)
         );

      if (selFunder !== "All" && selClient !== "All" && selDate !== "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(submittedDate) === handleCreatedAtDate(selDate)
         );

      return false;
   });
}
