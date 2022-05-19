export function getFilteredInvoicePayments(invoicePmts = [], selFunder, selStatus) {
   const makeLowC = (value = "") => value?.toLowerCase();

   return invoicePmts.filter((invoicePmt) => {
      const clientName = `${invoicePmt?.client?.firstName} ${invoicePmt?.client?.lastName}`;
      const status = invoicePmt?.status;

      if (selFunder === "All" && selStatus === "All") return true;

      if (selFunder !== "All" && selStatus === "All")
         return makeLowC(clientName) === makeLowC(selFunder);

      if (selFunder === "All" && selStatus !== "All")
         return makeLowC(status) === makeLowC(selStatus);

      if (selFunder !== "All" && selStatus !== "All")
         return (
            makeLowC(clientName) === makeLowC(selFunder) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      return false;
   });
}
