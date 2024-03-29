import React, { useContext } from "react";
import { invoicePaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   manageStatus,
   useWidth,
} from "@eachbase/utils";

export const InvoicePaymentTBody = ({ invoicePayments = [] }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const {
      // getTableHeader,
      addSignToValueFromStart,
      getValueByFixedNumber,
      getFullName,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {invoicePayments.map((invoicePayment, index) => {
            const clientFirstName = invoicePayment?.client?.firstName;
            const clientLastName = invoicePayment?.client?.firstName;

            const invoicePaymentId = getTableData(invoicePayment._id);
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalAmount = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoicePayment.totalBilled))
            );
            const totalUsed = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(invoicePayment.totalUsed))
            );
            const status = showDashIfEmpty(manageStatus(invoicePayment.status));
            const paymentReference = showDashIfEmpty(invoicePayment.checkNumber);
            // const paymentReference = getTableHeader(
            //    invoicePayment.paymentRef || "www.testlink.com",
            //    getTableData(invoicePayment.paymentRef || "www.testlink.com"),
            //    "",
            //    false
            // );

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/invoicePayment/${invoicePayment._id}`)}
               >
                  <div className={classes.tdStyle}>{invoicePaymentId}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalAmount}</div>
                  <div className={classes.tdStyle}>{totalUsed}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>{paymentReference}</div>
                  {/* <div className={classes.tdStyle}>
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
                  </div> */}
               </div>
            );
         })}
      </div>
   );
};
