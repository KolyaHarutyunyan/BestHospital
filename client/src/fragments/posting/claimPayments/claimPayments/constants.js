export function getFilteredClaimPayments(claimPayments, selFunder, selClient, selStatus) {
   const filteredClaimPayments =
      selFunder === "All" && selClient === "All" && selStatus === "All"
         ? claimPayments
         : selFunder !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.fundingSource?.name.toLowerCase() ===
                 selFunder.toLowerCase()
           )
         : selClient !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 `${claimPayment?.client?.firstName} ${claimPayment?.client?.lastName}`.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selStatus !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.status?.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredClaimPayments;
}
