import React, { useContext } from "react";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";
import { invoiceReceivableTHeadTBodyStyle } from "./styles";

export const InvoiceReceivableTBody = ({ receivable }) => {
   const classes = invoiceReceivableTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const {
      addSignToValueFromStart,
      getFullName,
      getTextDependsOnWidth,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      const size = open ? 2270 : 2120;
      const limit = open ? 8 : 10;

      return showDashIfEmpty(getTextDependsOnWidth(width, size, data, limit));
   }

   const start = handleCreatedAtDate(receivable?.dateOfService?.start);
   const end = handleCreatedAtDate(receivable?.dateOfService?.end);
   const staffFirstName = receivable?.staff?.firstName;
   const staffLastName = receivable?.staff?.lastName;

   const staff = getFullName(staffFirstName, staffLastName, getTableData);
   const serviceDate = getTableData(`${start} - ${end}`);
   const serviceCode = getTableData(receivable?.serviceCode);
   const startTime = getTableData(
      handleCreatedAtDate(receivable?.timeOfService?.startTime)
   );
   const endTime = getTableData(handleCreatedAtDate(receivable?.timeOfService?.endTime));
   const hours = getTableData(receivable?.hours);
   const totalAmount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable?.amountTotal))
   );
   const copay = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable?.copay))
   );
   const priorPaid = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable?.priorPaid))
   );
   const currentBalance = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(receivable?.currentBalance))
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
