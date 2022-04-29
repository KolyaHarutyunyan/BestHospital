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

   function getBillTitle(givenTitle = "", ...rest) {
      const size = open ? 1830 : 1680;
      const limit = open ? 3 : 4;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const billId = getBillTitle("ID", "", false);
   const dateOfService = getBillTitle("DoS", "latestEarliest");
   const payor = getBillTitle("Payor");
   const client = getBillTitle("Client");
   const service = getBillTitle("Service", "", false);

   return (
      <div className={classes.tableTheadStyle} style={resetRadius("right")}>
         <div className={classes.thStyle}>{billId}</div>
         <div className={classes.thStyle}>{dateOfService}</div>
         <div className={classes.thStyle}>{payor}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{service}</div>
      </div>
   );
};
