import React, { useContext } from "react";
import { claimPaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   manageStatus,
   useWidth,
} from "@eachbase/utils";

export const ClaimPaymentTBody = ({ claimPayments = [] }) => {
   const classes = claimPaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { addSignToValueFromStart, getValueByFixedNumber, showDashIfEmpty } =
      hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claimPayments.map((claimPayment, index) => {
            const claimPaymentId = getTableData(claimPayment._id);
            const funder = getTableData(claimPayment?.fundingSource?.name);
            const totalPaid = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalPaid))
            );
            const totalUsed = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalUsed))
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
                  <div className={classes.tdStyle}>{totalPaid}</div>
                  <div className={classes.tdStyle}>{totalUsed}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>{paymentReference}</div>
               </div>
            );
         })}
      </div>
   );
};
