import { hooksForTable } from "@eachbase/utils";

export function getFilteredNotClaimedBills(
   notClaimedBills = [],
   selFunder,
   selClient,
   selDate
) {
   const { handleCreatedAtDate } = hooksForTable;
   const makeLowC = (value = "") => value?.toLowerCase();

   return notClaimedBills.filter((notClaimedBill) => {
      const funderName = notClaimedBill?.payer?.name;
      const clientName = `${notClaimedBill?.client?.firstName} ${notClaimedBill?.client?.lastName}`;
      const serviceDate = notClaimedBill?.dateOfService;

      if (selFunder === "All" && selClient === "All" && selDate === "") return true;

      if (selFunder !== "All" && selClient === "All" && selDate === "")
         return makeLowC(funderName) === makeLowC(selFunder);

      if (selFunder === "All" && selClient !== "All" && selDate === "")
         return makeLowC(clientName) === makeLowC(selClient);

      if (selFunder === "All" && selClient === "All" && selDate !== "")
         return handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate);

      if (selFunder !== "All" && selClient !== "All" && selDate === "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient)
         );

      if (selFunder !== "All" && selClient === "All" && selDate !== "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate)
         );

      if (selFunder === "All" && selClient !== "All" && selDate !== "")
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate)
         );

      if (selFunder !== "All" && selClient !== "All" && selDate !== "")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate)
         );

      return false;
   });
}

export function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((notClaimedBill) => ({ ...notClaimedBill, isChecked: boolean }));
}
