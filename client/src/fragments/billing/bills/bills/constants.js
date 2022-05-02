import { handleCreatedAtDate } from "@eachbase/utils";

export function getFilteredBills(bills = [], selFunder, selClient, selDate) {
   const filteredBills =
      selFunder === "All" && selClient === "All" && selDate === ""
         ? bills
         : selFunder !== "All"
         ? bills.filter(
              (bill) =>
                 `${bill?.funder?.firstName} ${bill?.funder?.lastName}`.toLowerCase() ===
                 selFunder.toLowerCase()
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
                 handleCreatedAtDate(bill?.dateOfService, 10) ===
                 handleCreatedAtDate(selDate, 10)
           )
         : [];

   return filteredBills;
}
