export function getFilteredInvoicePayments(invoicePayments, selClient, selStatus) {
   const filteredInvoicePayments =
      selClient === "All" && selStatus === "All"
         ? invoicePayments
         : selClient !== "All"
         ? invoicePayments.filter(
              (invoicePayment) =>
                 `${invoicePayment?.client?.firstName} ${invoicePayment?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selStatus !== "All"
         ? invoicePayments.filter(
              (invoicePayment) =>
                 invoicePayment?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredInvoicePayments;
}
