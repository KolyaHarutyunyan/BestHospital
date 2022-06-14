import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import React, { useContext } from "react";
import { clientCommonCoreStyle } from "./styles";

export const ClientAuthServiceTHead = () => {
   const classes = clientCommonCoreStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getAuthServiceTitle(givenTitle = "", ...rest) {
      const size = open ? 1950 : 1800;
      const limit = open ? 5 : 8;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const serviceCode = open ? getAuthServiceTitle("Service Code") : "Service Code";
   const modifiers = "Modifiers";
   const totalUnits = open ? getAuthServiceTitle("Total Units") : "Total Units";
   const completedUnits = getAuthServiceTitle("Completed Units");
   const availableUnits = getAuthServiceTitle("Available Units");
   const percentUtilization = getAuthServiceTitle("Percent Utilization");
   const action = "Action";

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{serviceCode}</div>
         <div className={classes.thStyle}>{modifiers}</div>
         <div className={classes.thStyle}>{totalUnits}</div>
         <div className={classes.thStyle}>{completedUnits}</div>
         <div className={classes.thStyle}>{availableUnits}</div>
         <div className={classes.thStyle}>{percentUtilization}</div>
         <div className={classes.thStyle}>{action}</div>
      </div>
   );
};
