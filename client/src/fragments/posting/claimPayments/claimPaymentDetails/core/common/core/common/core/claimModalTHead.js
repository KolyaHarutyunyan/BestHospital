import React from "react";
import { SearchAndFilter } from "@eachbase/components";
import { getLimitedVal, hooksForTable } from "@eachbase/utils";
import { claimModalTHeadTBodyStyle } from "./styles";

export const ClaimModalTHead = () => {
   const classes = claimModalTHeadTBodyStyle();

   const { getTableHeader } = hooksForTable;

   function getClaimTitle(givenTitle = "", ...rest) {
      return getTableHeader(givenTitle, getLimitedVal(givenTitle, 15), ...rest);
   }

   const claimId = <SearchAndFilter title={"ID"} custom={false} />;
   const datePeriod = getClaimTitle("Date Period", "latestEarliest");
   const funder = getClaimTitle("Funding Source");
   const client = <SearchAndFilter title={"Client"} />;
   const totalCharged = getClaimTitle("Total Charged", "", false);
   const totalPaid = getClaimTitle("Total Paid", "", false);
   const remaining = <SearchAndFilter title={"Remaining"} custom={false} />;

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{claimId}</div>
         <div className={classes.thStyle}>{datePeriod}</div>
         <div className={classes.thStyle}>{funder}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalCharged}</div>
         <div className={classes.thStyle}>{totalPaid}</div>
         <div className={classes.thStyle}>{remaining}</div>
      </div>
   );
};
