import { hooksForTable } from "@eachbase/utils";

const { handleCreatedAtDate } = hooksForTable;

export function getFilteredInvoices(
   invoices,
   selClient,
   selDateFrom,
   selDateTo,
   selStatus,
   selInvoiceDate
) {
   const filteredInvoices =
      selClient === "All" &&
      selDateFrom === "" &&
      selDateTo === "" &&
      selStatus === "All" &&
      selInvoiceDate === ""
         ? invoices
         : selClient !== "All"
         ? invoices.filter(
              (invoice) =>
                 `${invoice?.client?.firstName} ${invoice?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selDateFrom !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.early) ===
                 handleCreatedAtDate(selDateFrom)
           )
         : selDateTo !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.latest) ===
                 handleCreatedAtDate(selDateTo)
           )
         : selStatus !== "All"
         ? invoices.filter(
              (invoice) => invoice?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : selInvoiceDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate) ===
                 handleCreatedAtDate(selInvoiceDate)
           )
         : [];

   return filteredInvoices;
}
