import { hooksForTable } from "@eachbase/utils";

const { handleCreatedAtDate } = hooksForTable;

export function getFilteredBills(bills = [], selFunder, selClient, selDate) {
   const filteredBills =
      selFunder === "All" && selClient === "All" && selDate === ""
         ? bills
         : selFunder !== "All"
         ? bills.filter(
              (bill) => bill?.payer?.name.toLowerCase() === selFunder.toLowerCase()
           )
         : selClient !== "All"
         ? bills.filter(
              (bill) =>
                 `${bill?.client?.firstName} ${bill?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selDate !== ""
         ? bills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService) === handleCreatedAtDate(selDate)
           )
         : [];

   return filteredBills;
}
