import React, { useContext } from "react";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   resetRadius,
   useWidth,
} from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

export const BillTHeadWithoutScroll = () => {
   const classes = billTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1830 : 1680;
   const limit = open ? 3 : 4;

   function getBillTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle} style={resetRadius("right")}>
         <div className={classes.thStyle}>{getBillTitle("ID", "", false)}</div>
         <div className={classes.thStyle}>{getBillTitle("DoS", "latestEarliest")}</div>
         <div className={classes.thStyle}>{getBillTitle("Payor")}</div>
         <div className={classes.thStyle}>{getBillTitle("Client")}</div>
         <div className={classes.thStyle} style={resetRadius("right")}>
            {getBillTitle("Service", "", false)}
         </div>
      </div>
   );
};
