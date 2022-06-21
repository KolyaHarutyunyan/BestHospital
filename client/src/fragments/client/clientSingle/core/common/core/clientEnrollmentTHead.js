import React, { useContext } from "react";
import { clientCommonCoreStyle } from "./styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const ClientEnrollmentTHead = () => {
   const classes = clientCommonCoreStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getEnrollmentTitle(givenTitle = "", ...rest) {
      const size = open ? 1800 : 1520;
      const limit = open ? 7 : 10;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const primary = "Primary";
   const fundingSource = getEnrollmentTitle("Funding Source");
   const clientId = "Client ID";
   const startDate = "Start Date";
   const terminationDate = getEnrollmentTitle("Termination Date");
   const action = "Action";

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "120px" }}>
            {primary}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "280px" }}>
            {fundingSource}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "155px" }}>
            {clientId}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "175px" }}>
            {startDate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "207px" }}>
            {terminationDate}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "107px" }}>
            {action}
         </div>
      </div>
   );
};
