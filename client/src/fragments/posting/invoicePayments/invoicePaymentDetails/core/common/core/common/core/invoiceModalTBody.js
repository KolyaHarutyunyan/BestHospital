import React from "react";
import { invoiceModalTHeadTBodyStyle } from "./styles";
import {
   addSignToValueFromStart,
   getFullName,
   getModalDataForTable,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

export const InvoiceModalTBody = ({ invoices = [], triggerId }) => {
   const classes = invoiceModalTHeadTBodyStyle();

   const width = useWidth();

   function getTableData(data) {
      return showDashIfEmpty(getModalDataForTable(data, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {invoices.map((invoice, index) => {
            const early = handleCreatedAtDate(invoice?.dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(invoice?.dateRange?.latest, 10, "/");
            const clientFirstName = invoice?.client?.firstName;
            const clientLastName = invoice?.client?.lastName;

            const serviceDates = getTableData(`${early} - ${latest}`);
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalHours = getTableData(invoice.totalHours);
            const invoiceDate = getTableData(
               handleCreatedAtDate(invoice.invoiceDate, 10, "/")
            );
            const totalAMT = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoice.totalAmount))
            );

            return (
               <label
                  key={index}
                  htmlFor={invoice._id}
                  className={classes.tbodyLabelStyle}
                  onClick={() => triggerId(invoice._id)}
               >
                  <input type="radio" id={invoice._id} name="invoice" />
                  <div className={classes.tbodyRowStyle}>
                     <div className={classes.tdStyle}>{serviceDates}</div>
                     <div className={classes.tdStyle}>{client}</div>
                     <div className={classes.tdStyle}>{totalHours}</div>
                     <div className={classes.tdStyle}>{invoiceDate}</div>
                     <div className={classes.tdStyle}>{totalAMT}</div>
                  </div>
               </label>
            );
         })}
      </div>
   );
};
