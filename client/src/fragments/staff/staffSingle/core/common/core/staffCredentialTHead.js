import React, { useContext } from "react";
import { staffSingleCoreCommonCoreStyle } from "./style";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const StaffCredentialTHead = () => {
   const classes = staffSingleCoreCommonCoreStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getStaffCredentialTitle(givenTitle = "", ...rest) {
      const size = open ? 1800 : 1520;
      const limit = open ? 7 : 10;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const name = getStaffCredentialTitle("Name", "latestEarliest", true);
   const type = getStaffCredentialTitle("Type", "arrow", true);
   const receivedDate = getStaffCredentialTitle("Received Date", "latestEarliest", true);
   const expirationDate = "Expiration Date";
   const action = "Action";

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "492px" }}>
            {name}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "492px" }}>
            {type}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "234px" }}>
            {receivedDate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "234px" }}>
            {expirationDate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "128px" }}>
            {action}
         </div>
      </div>
   );
};
