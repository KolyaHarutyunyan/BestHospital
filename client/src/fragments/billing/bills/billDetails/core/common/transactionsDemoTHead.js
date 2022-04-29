import React, { useContext } from "react";
import { tableTheadTbodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const TransactionsDemoTHead = () => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getBillTransactionTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const billTransactionId = getBillTransactionTitle("ID", "", false);
   const date = getBillTransactionTitle("Date", "latestEarliest", true, true);
   const creator = getBillTransactionTitle("Creator", "", true, true);
   const type = getBillTransactionTitle("Type", "arrow", true, true);
   const amount = getBillTransactionTitle("Amount", "", false);
   const paymentRefNumber = getBillTransactionTitle("Payment Ref. Number", "", false);
   const note = getBillTransactionTitle("Note", "", false);
   const action = getBillTransactionTitle("Action", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{billTransactionId}</div>
         <div className={classes.thStyle}>{date}</div>
         <div className={classes.thStyle}>{creator}</div>
         <div className={classes.thStyle}>{type}</div>
         <div className={classes.thStyle}>{amount}</div>
         <div className={classes.thStyle}>{paymentRefNumber}</div>
         <div className={classes.thStyle}>{note}</div>
         <div className={classes.thStyle}>{action}</div>
      </div>
   );
};
