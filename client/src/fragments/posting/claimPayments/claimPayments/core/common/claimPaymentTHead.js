import React, { useContext } from "react";
import { SearchAndFilter } from "@eachbase/components";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import { claimPaymentTHeadTBodyStyle } from "./styles";

export const ClaimPaymentTHead = () => {
   const classes = claimPaymentTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getClaimPaymentTitle(givenTitle = "", ...rest) {
      const size = open ? 1880 : 1680;
      const limit = open ? 7 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const claimPaymentId = <SearchAndFilter title={"ID"} custom={false} />;
   const funder = getClaimPaymentTitle("Funding Source");
   const totalPaid = getClaimPaymentTitle("Total Paid", "", false);
   const totalUsed = getClaimPaymentTitle("Total Used", "", false);
   const status = <SearchAndFilter title={"Status"} type={"arrow"} />;
   const paymentReference = getClaimPaymentTitle("Payment Reference", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{claimPaymentId}</div>
         <div className={classes.thStyle}>{funder}</div>
         <div className={classes.thStyle}>{totalPaid}</div>
         <div className={classes.thStyle}>{totalUsed}</div>
         <div className={classes.thStyle}>{status}</div>
         <div className={classes.thStyle}>{paymentReference}</div>
      </div>
   );
};
