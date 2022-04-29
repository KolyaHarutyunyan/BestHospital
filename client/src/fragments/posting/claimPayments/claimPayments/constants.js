export function getFilteredClaimPayments(claimPayments, selFunder, selClient, selStatus) {
   const filteredClaimPayments =
      selFunder === "All" && selClient === "All" && selStatus === "All"
         ? claimPayments
         : selFunder !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.funder?.firstName?.toLowerCase() ===
                 selFunder.toLowerCase()
           )
         : selClient !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.client?.firstName?.toLowerCase() ===
                 selClient.toLowerCase()
           )
         : selStatus !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.status.toLowerCase() === selStatus.toLowerCase()
           )
         : [];

   return filteredClaimPayments;
}
