import React, { useContext } from "react";
import { invoiceReceivableTHeadTBodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const InvoiceReceivableTHead = () => {
   const classes = invoiceReceivableTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getReceivTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 5 : 6;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const staffMember = getReceivTitle("Staff Member", "", true, true);
   const serviceDate = getReceivTitle("Service Date", "latestEarliest", true, true);
   const serviceCode = getReceivTitle("Service Code", "", false);
   const startTime = getReceivTitle("Start Time", "", false);
   const endTime = getReceivTitle("End Time", "", false);
   const hours = getReceivTitle("Hours", "", false);
   const totalAmount = getReceivTitle("Total Amount", "", false);
   const copay = getReceivTitle("Copay", "", false);
   const priorPaid = getReceivTitle("Prior Paid", "", false);
   const currentBalance = getReceivTitle("Current Balance", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{staffMember}</div>
         <div className={classes.thStyle}>{serviceDate}</div>
         <div className={classes.thStyle}>{serviceCode}</div>
         <div className={classes.thStyle}>{startTime}</div>
         <div className={classes.thStyle}>{endTime}</div>
         <div className={classes.thStyle}>{hours}</div>
         <div className={classes.thStyle}>{totalAmount}</div>
         <div className={classes.thStyle}>{copay}</div>
         <div className={classes.thStyle}>{priorPaid}</div>
         <div className={classes.thStyle}>{currentBalance}</div>
      </div>
   );
};
