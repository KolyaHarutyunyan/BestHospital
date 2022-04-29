import React, { useContext } from "react";
import { invoicePaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getDataForTable,
   getFullName,
   getTableHeader,
   getValueByFixedNumber,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

export const InvoicePaymentTBody = ({ invoicePayments = [] }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {invoicePayments.map((invoicePayment, index) => {
            const invoicePaymentId = getTableData(invoicePayment._id);
            const clientFirstName = invoicePayment?.client?.firstName;
            const clientLastName = invoicePayment?.client?.firstName;
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalBilled = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoicePayment.totalBilled))
            );
            const totalCollected = getTableData(
               addSignToValueFromStart(
                  getValueByFixedNumber(invoicePayment.totalCollected)
               )
            );
            const status = showDashIfEmpty(manageStatus(invoicePayment.status));
            const paymentReference = getTableHeader(
               invoicePayment.paymentRef || "www.testlink.com",
               getTableData(invoicePayment.paymentRef || "www.testlink.com"),
               "",
               false
            );

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/invoicePayment/${invoicePayment._id}`)}
               >
                  <div className={classes.tdStyle}>{invoicePaymentId}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalBilled}</div>
                  <div className={classes.tdStyle}>{totalCollected}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>
                     <a
                        className={classes.paymentRefStyle}
                        href={`https://${
                           invoicePayment.paymentRef || "www.testlink.com"
                        }`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {paymentReference}
                     </a>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
