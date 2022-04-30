import React, { useContext } from "react";
import { claimPaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getDataForTable,
   getFullName,
   getValueByFixedNumber,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

export const ClaimPaymentTBody = ({ claimPayments = [] }) => {
   const classes = claimPaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claimPayments.map((claimPayment, index) => {
            const claimPaymentId = getTableData(claimPayment._id);
            const funderFirstName = claimPayment?.funder?.firstName;
            const funderLastName = claimPayment?.funder?.lastName;
            const funder = getFullName(funderFirstName, funderLastName, getTableData);
            const clientFirstName = claimPayment?.client?.firstName;
            const clientLastName = claimPayment?.client?.firstName;
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalBilled = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalBilled))
            );
            const totalCollected = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalCollected))
            );
            const status = showDashIfEmpty(manageStatus(claimPayment.status));
            const paymentReference = getTableData(claimPayment.paymentRef);

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/claimPayment/${claimPayment._id}`)}
               >
                  <div className={classes.tdStyle}>{claimPaymentId}</div>
                  <div className={classes.tdStyle}>{funder}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalBilled}</div>
                  <div className={classes.tdStyle}>{totalCollected}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>{paymentReference}</div>
               </div>
            );
         })}
      </div>
   );
};
