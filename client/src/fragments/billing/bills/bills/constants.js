import { handleCreatedAtDate } from "@eachbase/utils";

export function getFilteredBills(bills = [], selFunder, selClient, selDate) {
   const filteredBills =
      selFunder === "All" && selClient === "All" && selDate === ""
         ? bills
         : selFunder !== "All"
         ? bills.filter(
              (bill) => bill?.funder?.firstName?.toLowerCase() === selFunder.toLowerCase()
           )
         : selClient !== "All"
         ? bills.filter(
              (bill) => bill?.client?.firstName?.toLowerCase() === selClient.toLowerCase()
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
