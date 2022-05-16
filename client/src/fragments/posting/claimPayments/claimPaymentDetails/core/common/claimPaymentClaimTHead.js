import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const ClaimPaymentClaimTHead = () => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getClaimTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const claimId = getClaimTitle("ID", "", false);
   const datePeriod = getClaimTitle("Date Period", "latestEarliest", true, true);
   const funder = getClaimTitle("Funding Source", "", true, true);
   const client = getClaimTitle("Client", "", true, true);
   const totalBilled = getClaimTitle("Total Billed", "", false);
   const totalPaid = getClaimTitle("Total Paid", "", false);
   const remaining = getClaimTitle("Remaining", "", false);
   const arrowArea = getClaimTitle("", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{claimId}</div>
         <div className={classes.thStyle}>{datePeriod}</div>
         <div className={classes.thStyle}>{funder}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalBilled}</div>
         <div className={classes.thStyle}>{totalPaid}</div>
         <div className={classes.thStyle}>{remaining}</div>
         <div className={classes.thStyle}>{arrowArea}</div>
      </div>
   );
};
