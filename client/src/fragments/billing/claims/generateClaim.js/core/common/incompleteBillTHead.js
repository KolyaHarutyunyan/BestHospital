import React, { useContext } from "react";
import { incompleteBillTHeadTBodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const IncompleteBillTHead = () => {
   const classes = incompleteBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getIncompleteBillTitle(givenTitle = "", ...rest) {
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
            {getIncompleteBillTitle("", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Date of Service", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Place of Service", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Service", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Founding Source", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Client", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Units", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Claim Amount", "", false)}
         </div>
         <div className={classes.thStyle}>
            {getIncompleteBillTitle("Signature", "", false)}
         </div>
      </div>
   );
};
