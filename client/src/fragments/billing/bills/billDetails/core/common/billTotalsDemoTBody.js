import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import {
   addSignToValueFromStart,
   DrawerContext,
   getDataForTable,
   getValueByFixedNumber,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

export const BillTotalsDemoTBody = ({ billTotals }) => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(
         addSignToValueFromStart(
            getValueByFixedNumber(getDataForTable(data, open, width))
         )
      );
   }

   const billedRate = getTableData(billTotals.billedRate);
   const totalAmount = getTableData(billTotals.totalAmount);
   const payorBalance = getTableData(billTotals.payorBalance);
   const clientBalance = getTableData(billTotals.clientBalance);
   const totalBalance = getTableData(billTotals.totalBalance);

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{billedRate}</div>
            <div className={classes.tdStyle}>{totalAmount}</div>
            <div className={classes.tdStyle}>{payorBalance}</div>
            <div className={classes.tdStyle}>{clientBalance}</div>
            <div className={classes.tdStyle}>{totalBalance}</div>
         </div>
      </div>
   );
};
