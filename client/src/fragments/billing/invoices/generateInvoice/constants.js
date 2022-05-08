import { hooksForTable } from "@eachbase/utils";

const { handleCreatedAtDate } = hooksForTable;

export function getFilteredNotInvoicedBills(
   notInvoicedBills = [],
   selClient,
   selServiceDate
) {
   const filteredNotInvoicedBills =
      selClient === "All" && selServiceDate === ""
         ? notInvoicedBills
         : selClient !== "All"
         ? notInvoicedBills.filter(
              (bill) =>
                 `${bill?.client?.firstName} ${bill?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selServiceDate !== ""
         ? notInvoicedBills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService) ===
                 handleCreatedAtDate(selServiceDate)
           )
         : [];

   return filteredNotInvoicedBills;
}

export function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((bill) => ({ ...bill, isChecked: boolean }));
}
