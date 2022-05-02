import React from "react";
import { tableTheadTbodyStyle } from "./styles";
import { SearchAndFilter } from "@eachbase/components";

export const BillTotalsDemoTHead = () => {
   const classes = tableTheadTbodyStyle();

   function getBillTotalTitle(givenTitle = "") {
      return <SearchAndFilter title={givenTitle} custom={false} />;
   }

   const billedRate = getBillTotalTitle("Billed Rate");
   const totalAmount = getBillTotalTitle("Total Amount");
   const payorBalance = getBillTotalTitle("Payor Balance");
   const clientBalance = getBillTotalTitle("Client Balance");
   const totalBalance = getBillTotalTitle("Total Balance");

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{billedRate}</div>
         <div className={classes.thStyle}>{totalAmount}</div>
         <div className={classes.thStyle}>{payorBalance}</div>
         <div className={classes.thStyle}>{clientBalance}</div>
         <div className={classes.thStyle}>{totalBalance}</div>
      </div>
   );
};
