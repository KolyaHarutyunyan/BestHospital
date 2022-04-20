import React, { useContext } from "react";
import { SearchAndFilter } from "@eachbase/components";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { claimPaymentTHeadTBodyStyle } from "./styles";

export const ClaimPaymentTHead = () => {
   const classes = claimPaymentTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1880 : 1680;
   const limit = open ? 7 : 9;

   function getClaimPaymentTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const claimPaymentId = <SearchAndFilter title={"ID"} custom={false} />;
   const funder = getClaimPaymentTitle("Funding Source");
   const client = <SearchAndFilter title={"Client"} />;
   const totalBilled = getClaimPaymentTitle("Total Billed", "", false);
   const totalCollected = getClaimPaymentTitle("Total Collected", "", false);
   const status = <SearchAndFilter title={"Status"} type={"arrow"} />;
   const paymentReference = getClaimPaymentTitle("Payment Reference", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{claimPaymentId}</div>
         <div className={classes.thStyle}>{funder}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{totalBilled}</div>
         <div className={classes.thStyle}>{totalCollected}</div>
         <div className={classes.thStyle}>{status}</div>
         <div className={classes.thStyle}>{paymentReference}</div>
      </div>
   );
};
