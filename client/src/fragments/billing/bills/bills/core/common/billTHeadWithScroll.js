import React, { useContext } from "react";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   resetRadius,
   useWidth,
} from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

function addStyle(initialStyle) {
   return `${initialStyle} withScroll`;
}

export const BillTHeadWithScroll = () => {
   const classes = billTHeadTBodyStyle();

   const { open } = useContext(DrawerContext);

   const tableTheadClassName = `${classes.tableTheadStyle} withScroll ${
      open ? "narrow" : ""
   }`;

   const thClassName = addStyle(classes.thStyle);

   const width = useWidth();

   function getBillTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, 2565, givenTitle, 4),
         ...rest
      );
   }

   return (
      <div
         className={tableTheadClassName}
         style={{ ...resetRadius("left"), paddingLeft: 0 }}
      >
         <div className={thClassName}>{getBillTitle("Hrs", "", false)}</div>
         <div className={thClassName}>{getBillTitle("Units", "", false)}</div>
         <div className={thClassName}>{getBillTitle("Billed Rate", "", false)}</div>
         <div className={thClassName}>
            {getBillTitle("Total Amount", "latestEarliest")}
         </div>
         <div className={thClassName}>{getBillTitle("Payor Balance", "", false)}</div>
         <div className={thClassName}>{getBillTitle("Client Balance", "", false)}</div>
         <div className={thClassName}>{getBillTitle("Total Balance", "", false)}</div>
         <div className={thClassName}>{getBillTitle("Claim Status", "arrow")}</div>
         <div className={thClassName}>{getBillTitle("Invoice Status", "arrow")}</div>
         <div className={thClassName}>{getBillTitle("Status", "arrow")}</div>
      </div>
   );
};
