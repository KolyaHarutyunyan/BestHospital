import { handleCreatedAtDate } from "@eachbase/utils";

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
              (bill) => bill?.client?.firstName?.toLowerCase() === selClient.toLowerCase()
           )
         : selServiceDate !== ""
         ? notInvoicedBills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService, 10) ===
                 handleCreatedAtDate(selServiceDate, 10)
           )
         : [];

   return filteredNotInvoicedBills;
}

export function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((bill) => ({ ...bill, isChecked: boolean }));
}
