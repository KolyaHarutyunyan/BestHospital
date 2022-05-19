import { hooksForTable } from "@eachbase/utils";

export function getFilteredNotInvoicedBills(notInvoicedBills = [], selClient, selDate) {
   const { handleCreatedAtDate } = hooksForTable;
   const makeLowC = (value = "") => value?.toLowerCase();

   return notInvoicedBills.filter((notInvoicedBill) => {
      const clientName = `${notInvoicedBill?.client?.firstName} ${notInvoicedBill?.client?.lastName}`;
      const serviceDate = notInvoicedBill?.dateOfService;

      if (selClient === "All" && selDate === "") return true;

      if (selClient !== "All" && selDate === "")
         return makeLowC(clientName) === makeLowC(selClient);

      if (selClient === "All" && selDate !== "")
         return handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate);

      if (selClient !== "All" && selDate !== "")
         return (
            makeLowC(clientName) === makeLowC(selClient) &&
            handleCreatedAtDate(serviceDate) === handleCreatedAtDate(selDate)
         );

      return false;
   });
}

export function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((bill) => ({ ...bill, isChecked: boolean }));
}
