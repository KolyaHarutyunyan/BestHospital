import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const ClaimReceivableTHead = () => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getReceivTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const dateOfService = getReceivTitle("Date of Service", "latestEarliest", true, true);
   const placeOfService = getReceivTitle("Place of Service", "", false);
   const cptCode = getReceivTitle("CPT Code", "", false);
   const modifier = getReceivTitle("Modifier", "", false);
   const totalUnits = getReceivTitle("Total Units", "", false);
   const totalBilled = getReceivTitle("Total Billed", "", false);
   const renderingProvider = getReceivTitle("Rendering Provider", "", false);
   const arrowArea = getReceivTitle("", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{dateOfService}</div>
         <div className={classes.thStyle}>{placeOfService}</div>
         <div className={classes.thStyle}>{cptCode}</div>
         <div className={classes.thStyle}>{modifier}</div>
         <div className={classes.thStyle}>{totalUnits}</div>
         <div className={classes.thStyle}>{totalBilled}</div>
         <div className={classes.thStyle}>{renderingProvider}</div>
         <div className={classes.thStyle}>{arrowArea}</div>
      </div>
   );
};
