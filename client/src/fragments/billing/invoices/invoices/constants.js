import { handleCreatedAtDate } from "@eachbase/utils";

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
                 handleCreatedAtDate(invoice?.dateRange?.early, 10) ===
                 handleCreatedAtDate(selDateFrom, 10)
           )
         : selDateTo !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(selDateTo, 10)
           )
         : selStatus !== "All"
         ? invoices.filter(
              (invoice) => invoice?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : selInvoiceDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate, 10) ===
                 handleCreatedAtDate(selInvoiceDate, 10)
           )
         : [];

   return filteredInvoices;
}
