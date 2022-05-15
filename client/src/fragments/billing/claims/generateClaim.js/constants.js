import { hooksForTable } from "@eachbase/utils";

const { handleCreatedAtDate } = hooksForTable;

export function getFilteredNotClaimedBills(
   notClaimedBills,
   selFunder,
   selClient,
   selServiceDate
) {
   const filteredNotClaimedBills =
      selFunder === "All" && selClient === "All" && selServiceDate === ""
         ? notClaimedBills
         : selFunder !== "All"
         ? notClaimedBills.filter(
              (bill) => bill?.payer?.name.toLowerCase() === selFunder.toLowerCase()
           )
         : selClient !== "All"
         ? notClaimedBills.filter(
              (bill) =>
                 `${bill?.client?.firstName} ${bill?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selServiceDate !== ""
         ? notClaimedBills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService) ===
                 handleCreatedAtDate(selServiceDate)
           )
         : [];

   return filteredNotClaimedBills;
}

export function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((bill) => ({ ...bill, isChecked: boolean }));
}
