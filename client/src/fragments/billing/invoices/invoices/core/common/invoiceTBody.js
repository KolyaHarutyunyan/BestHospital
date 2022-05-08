import React, { useContext } from "react";
import { invoiceTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   manageStatus,
   useWidth,
} from "@eachbase/utils";

export const InvoiceTBody = ({ invoices = [] }) => {
   const classes = invoiceTHeadTBodyStyle();

   const history = useHistory();

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

   return (
      <div className={classes.tbodyContainerStyle}>
         {invoices.map((invoice, index) => {
            const early = handleCreatedAtDate(invoice?.dateRange?.early);
            const latest = handleCreatedAtDate(invoice?.dateRange?.latest);
            const clientFirstName = invoice?.client?.firstName;
            const clientLastName = invoice?.client?.lastName;

            const serviceDates = getTableData(`${early} - ${latest}`);
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalHours = getTableData(invoice.totalHours);
            const totalAmount = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoice.totalAmount))
            );
            const invoiceDate = getTableData(handleCreatedAtDate(invoice.invoiceDate));
            const status = getTableData(manageStatus(invoice.status));

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/invoice/${invoice._id}`)}
               >
                  <div className={classes.tdStyle}>{serviceDates}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalHours}</div>
                  <div className={classes.tdStyle}>{totalAmount}</div>
                  <div className={classes.tdStyle}>{invoiceDate}</div>
                  <div className={classes.tdStyle}>{status}</div>
               </div>
            );
         })}
      </div>
   );
};
