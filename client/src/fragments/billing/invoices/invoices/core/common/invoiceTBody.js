import React, { useContext } from "react";
import { invoiceTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

const styles = { display: "flex", alignItems: "center" };

function getInvoiceData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1730;
   const firstLimit = isOpen ? 18 : 20;

   const secondSize = isOpen ? 1680 : 1640;
   const secondLimit = isOpen ? 14 : 16;

   const thirdSize = isOpen ? 1350 : 1345;
   const thirdLimit = isOpen ? 10 : 12;

   const initialLimit = isOpen ? 25 : 27;

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

export const InvoiceTBody = ({ invoices = [] }) => {
   const classes = invoiceTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getInvoiceData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {invoices.map((invoice, index) => {
            const { dateRange, client } = invoice || {};

            const early = handleCreatedAtDate(dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

            const serviceDates = getTableData(`${early} - ${latest}`);
            const clientFirstName = getTableData(client?.firstName);
            const clientLastName = getTableData(client?.lastName);
            const totalHours = getTableData(invoice.totalHours);
            const totalAmount = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoice.totalAmount))
            );
            const invoiceDate = getTableData(
               handleCreatedAtDate(invoice.invoiceDate, 10, "/")
            );
            const status = getTableData(manageStatus(invoice.status));

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/invoice/${invoice._id}`)}
               >
                  <div className={classes.tdStyle}>{serviceDates}</div>
                  <div className={classes.tdStyle} style={styles}>
                     {clientFirstName} {clientLastName}
                  </div>
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
