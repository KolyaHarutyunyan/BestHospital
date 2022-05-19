export function getFilteredClaimPayments(claimPmts = [], selFunder, selStatus) {
   const makeLowC = (value = "") => value?.toLowerCase();

   return claimPmts.filter((claimPmt) => {
      const funderName = claimPmt?.fundingSource?.name;
      const status = claimPmt?.status;

      if (selFunder === "All" && selStatus === "All") return true;

      if (selFunder !== "All" && selStatus === "All")
         return makeLowC(funderName) === makeLowC(selFunder);

      if (selFunder === "All" && selStatus !== "All")
         return makeLowC(status) === makeLowC(selStatus);

      if (selFunder !== "All" && selStatus !== "All")
         return (
            makeLowC(funderName) === makeLowC(selFunder) &&
            makeLowC(status) === makeLowC(selStatus)
         );

      return false;
   });
}
