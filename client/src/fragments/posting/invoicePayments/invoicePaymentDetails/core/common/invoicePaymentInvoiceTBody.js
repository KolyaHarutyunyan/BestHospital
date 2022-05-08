import React, { useContext } from "react";
import { DrawerContext, getDataForTable, hooksForTable, useWidth } from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";

export const InvoicePaymentInvoiceTBody = ({ invoice }) => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const {
      addSignToValueFromStart,
      getFullName,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const early = handleCreatedAtDate(invoice.dateRange?.early);
   const latest = handleCreatedAtDate(invoice.dateRange?.latest);
   const clientFirstName = invoice.client?.firstName;
   const clientLastName = invoice.client?.lastName;

   const serviceDates = getTableData(`${early} - ${latest}`);
   const client = getFullName(clientFirstName, clientLastName, getTableData);
   const totalHours = getTableData(invoice.totalHours);
   const totalAmount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(invoice.totalAmount))
   );
   const invoiceDate = getTableData(handleCreatedAtDate(invoice.invoiceDate));

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{serviceDates}</div>
            <div className={classes.tdStyle}>{client}</div>
            <div className={classes.tdStyle}>{totalHours}</div>
            <div className={classes.tdStyle}>{totalAmount}</div>
            <div className={classes.tdStyle}>{invoiceDate}</div>
         </div>
      </div>
   );
};
