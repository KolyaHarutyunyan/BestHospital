import React, { useContext } from "react";
import { invoicePaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getTableHeader,
   getValueByFixedNumber,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

const styles = { display: "flex", alignItems: "center" };

function getInvoicePaymentData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 2040 : 1940;
   const firstLimit = isOpen ? 14 : 16;

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

export const InvoicePaymentTBody = ({ invoicePayments = [] }) => {
   const classes = invoicePaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getInvoicePaymentData(data, open, width));
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
               addSignToValueFromStart(getValueByFixedNumber(invoicePayment.totalCollected))
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
                  <div className={classes.tdStyle} style={styles}>
                     {client}
                  </div>
                  <div className={classes.tdStyle}>{totalBilled}</div>
                  <div className={classes.tdStyle}>{totalCollected}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>
                    <a  
                        className={classes.paymentRefStyle}
                        href={`https://${invoicePayment.paymentRef || "www.testlink.com"}`}
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
