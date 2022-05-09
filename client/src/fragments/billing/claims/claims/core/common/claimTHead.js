import React, { useContext } from "react";
import { SearchAndFilter } from "@eachbase/components";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import { claimTHeadTBodyStyle } from "./styles";

export const ClaimTHead = () => {
   const classes = claimTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getClaimTitle(givenTitle = "", ...rest) {
      const size = open ? 2150 : 1980;
      const limit = open ? 5 : 7;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const claimId = <SearchAndFilter title={"ID"} custom={false} />;
   const datePeriod = getClaimTitle("Date Period", "latestEarliest");
   const funder = getClaimTitle("Funding Source");
   const client = <SearchAndFilter title={"Client"} />;
   const totalCharged = getClaimTitle("Total Charged", "", false);
   const totalPaid = getClaimTitle("Total Paid", "", false);
   const remaining = <SearchAndFilter title={"Remaining"} custom={false} />;
   const status = <SearchAndFilter title={"Status"} type={"arrow"} />;
   const paymentReference = getClaimTitle("Payment Reference", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{claimId}</div>
         <div className={classes.thStyle}>{datePeriod}</div>
         <div className={classes.thStyle}>{funder}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalCharged}</div>
         <div className={classes.thStyle}>{totalPaid}</div>
         <div className={classes.thStyle}>{remaining}</div>
         <div className={classes.thStyle}>{status}</div>
         <div className={classes.thStyle}>{paymentReference}</div>
      </div>
   );
};
