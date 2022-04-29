import React from "react";
import { billTransactionInputsStyle } from "./styles";
import { BillTotalsDemoTBody, BillTotalsDemoTHead } from "./common";

export const BillTotalsDemoTable = ({ billTotals }) => {
   const classes = billTransactionInputsStyle();

   return (
      <div className={classes.billTotalContainerStyle}>
         <BillTotalsDemoTHead />
         <BillTotalsDemoTBody billTotals={billTotals} />
      </div>
   );
};
