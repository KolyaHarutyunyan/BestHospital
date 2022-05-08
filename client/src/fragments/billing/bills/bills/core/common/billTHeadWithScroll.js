import React, { useContext } from "react";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

function addStyle(initialStyle) {
   return `${initialStyle} withScroll`;
}

const styles = { ...hooksForTable.resetRadius("left"), paddingLeft: 0 };

export const BillTHeadWithScroll = () => {
   const classes = billTHeadTBodyStyle();

   const { open } = useContext(DrawerContext);

   const tableTheadClassName = `${classes.tableTheadStyle} withScroll ${
      open ? "narrow" : ""
   }`;

   const thClassName = addStyle(classes.thStyle);

   const width = useWidth();

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getBillTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, 2565, givenTitle, 4),
         ...rest
      );
   }

   const hours = getBillTitle("Hrs", "", false);
   const units = getBillTitle("Units", "", false);
   const billedRate = getBillTitle("Billed Rate", "", false);
   const totalAmount = getBillTitle("Total Amount", "latestEarliest");
   const payorBalance = getBillTitle("Payor Balance", "", false);
   const clientBalance = getBillTitle("Client Balance", "", false);
   const totalBalance = getBillTitle("Total Balance", "", false);
   const claimStatus = getBillTitle("Claim Status", "arrow");
   const invoiceStatus = getBillTitle("Invoice Status", "arrow");
   const status = getBillTitle("Status", "arrow");

   return (
      <div className={tableTheadClassName} style={styles}>
         <div className={thClassName}>{hours}</div>
         <div className={thClassName}>{units}</div>
         <div className={thClassName}>{billedRate}</div>
         <div className={thClassName}>{totalAmount}</div>
         <div className={thClassName}>{payorBalance}</div>
         <div className={thClassName}>{clientBalance}</div>
         <div className={thClassName}>{totalBalance}</div>
         <div className={thClassName}>{claimStatus}</div>
         <div className={thClassName}>{invoiceStatus}</div>
         <div className={thClassName}>{status}</div>
      </div>
   );
};
