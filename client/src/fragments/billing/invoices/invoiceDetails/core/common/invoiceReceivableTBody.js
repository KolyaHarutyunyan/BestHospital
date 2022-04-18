import React, { useContext } from "react";
import {
   addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getTextDependsOnWidth,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { invoiceReceivableTHeadTBodyStyle } from "./styles";

export const InvoiceReceivableTBody = ({ receivable }) => {
   const classes = invoiceReceivableTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      const size = open ? 1855 : 1700;
      const limit = open ? 8 : 10;

      return showDashIfEmpty(getTextDependsOnWidth(width, size, data, limit));
   }

   const staffFirstName = receivable.staffMember?.firstName;
   const staffLastName = receivable.staffMember?.lastName;
   const staff = getFullName(staffFirstName, staffLastName, getTableData);
   const serviceDate = getTableData(receivable.dateOfService);
   const serviceCode = getTableData(receivable.serviceCode);
   const startTime = getTableData(
      handleCreatedAtDate(receivable.timeOfService?.startTime, 10, "/")
   );
   const endTime = getTableData(
      handleCreatedAtDate(receivable.timeOfService?.endTime, 10, "/")
   );
   const hours = getTableData(receivable.hours);
   const totalAmount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable.totalAmount))
   );
   const copay = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable.copay))
   );
   const priorPaid = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable.priorPaid))
   );
   const currentBalance = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable.currentBalance))
   );

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{staff}</div>
            <div className={classes.tdStyle}>{serviceDate}</div>
            <div className={classes.tdStyle}>{serviceCode}</div>
            <div className={classes.tdStyle}>{startTime}</div>
            <div className={classes.tdStyle}>{endTime}</div>
            <div className={classes.tdStyle}>{hours}</div>
            <div className={classes.tdStyle}>{totalAmount}</div>
            <div className={classes.tdStyle}>{copay}</div>
            <div className={classes.tdStyle}>{priorPaid}</div>
            <div className={classes.tdStyle}>{currentBalance}</div>
         </div>
      </div>
   );
};
