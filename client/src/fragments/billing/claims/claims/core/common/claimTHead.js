import React, { useContext } from "react";
import { SearchAndFilter } from "@eachbase/components";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { claimTHeadTBodyStyle } from "./styles";

export const ClaimTHead = () => {
   const classes = claimTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1830 : 1680;
   const limit = open ? 3 : 4;

   function getClaimTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"ID"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            {getClaimTitle("Date Period", "latestEarliest")}
         </div>
         <div className={classes.thStyle}>{getClaimTitle("Funding Source")}</div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Client"} />
         </div>
         <div className={classes.thStyle}>
            {getClaimTitle("Total Charged", "", false)}
         </div>
         <div className={classes.thStyle}>{getClaimTitle("Total Paid", "", false)}</div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Remaining"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Status"} type={"arrow"} />
         </div>
         <div className={classes.thStyle}>
            {getClaimTitle("Payment Reference", "", false)}
         </div>
      </div>
   );
};
