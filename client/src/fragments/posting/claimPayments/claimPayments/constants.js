export function getFilteredClaimPayments(claimPayments, selFunder, selStatus) {
   const filteredClaimPayments =
      selFunder === "All" && selStatus === "All"
         ? claimPayments
         : selFunder !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.fundingSource?.name.toLowerCase() ===
                 selFunder.toLowerCase()
           )
         : selStatus !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.status?.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredClaimPayments;
}
