import React, { useContext } from "react";
import { staffSingleCoreCommonCoreStyle } from "./style";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const PaycodeTHead = () => {
   const classes = staffSingleCoreCommonCoreStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getPaycodeTitle(givenTitle = "", ...rest) {
      const size = open ? 1800 : 1520;
      const limit = open ? 7 : 10;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const name = "Name";
   const code = "Code";
   const type = getPaycodeTitle("Type", "arrow", true);
   const rate = "Rate";
   const startDate = getPaycodeTitle("Start Date", "latestEarliest", true);
   const status = getPaycodeTitle("Status", "arrow", true);
   const action = "Action";

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "297px" }}>
            {name}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "152px" }}>
            {code}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "176px" }}>
            {type}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "144px" }}>
            {rate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "184px" }}>
            {startDate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "159px" }}>
            {status}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "186px" }}>
            {action}
         </div>
      </div>
   );
};
