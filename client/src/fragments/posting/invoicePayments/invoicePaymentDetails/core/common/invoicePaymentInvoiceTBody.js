import React, { useContext } from "react";
import {
    addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";

function getInvoiceData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1730;
   const firstLimit = isOpen ? 18 : 20;

   const secondSize = isOpen ? 1680 : 1640;
   const secondLimit = isOpen ? 12 : 14;

   const thirdSize = isOpen ? 1350 : 1345;
   const thirdLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 21 : 23;

   const tableData =
      givenWidth <= thirdSize
         ? getLimitedVal(givenData, thirdLimit)
         : givenWidth > thirdSize && givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export const InvoicePaymentInvoiceTBody = ({ invoice }) => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getInvoiceData(data, open, width));
   }

   const early = handleCreatedAtDate(invoice.dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(invoice.dateRange?.latest, 10, "/");
   const clientFirstName = invoice.client?.firstName;
   const clientLastName = invoice.client?.lastName;

   const serviceDates = getTableData(`${early} - ${latest}`);
   const client = getFullName(clientFirstName, clientLastName, getTableData);
   const totalHours = getTableData(invoice.totalHours);
   const totalAmount = getTableData(addSignToValueFromStart(getValueByFixedNumber(invoice.totalAmount)));
   const invoiceDate = getTableData(handleCreatedAtDate(invoice.invoiceDate, 10, "/"));

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

