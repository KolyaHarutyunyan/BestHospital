import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const ReceivableTHead = () => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getReceivTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>
            {getReceivTitle("Date of Service", "latestEarliest", true, true)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("Place of Service", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("CPT Code", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("Modifier", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("Total Units", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("Total Billed", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getReceivTitle("Rendering Provider", "", false)}
         </div>
         <div className={classes.thStyle}>{getReceivTitle("", "", false)}</div>
      </div>
   );
};
