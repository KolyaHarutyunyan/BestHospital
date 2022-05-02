import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getTextDependsOnWidth,
   getValueByFixedNumber,
   manageStatus,
   resetRadius,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

export const BillTBodyWithScroll = ({ bills = [] }) => {
   const classes = billTHeadTBodyStyle();

   const { open } = useContext(DrawerContext);

   const tbodyRowClassName = `${classes.tbodyRowStyle} withScroll ${
      open ? "narrow" : ""
   }`;

   const history = useHistory();

   const width = useWidth();

   function getDisplayOf(givenText = "") {
      if (typeof givenText !== "string") return givenText;
      return showDashIfEmpty(getTextDependsOnWidth(width, 2565, givenText, 5));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {bills.map((bill, index) => {
            const hours = getDisplayOf(bill.totalHours);
            const units = getDisplayOf(bill.totalUnits?.toString());
            const billedRate = getDisplayOf(
               addSignToValueFromStart(getValueByFixedNumber(bill.billedRate))
            );
            const totalAmount = getDisplayOf(
               addSignToValueFromStart(getValueByFixedNumber(bill.billedAmount))
            );
            const payorBalance = getDisplayOf(
               addSignToValueFromStart(
                  getValueByFixedNumber(bill.payerTotal - bill.payerPaid)
               )
            );
            const clientBalance = getDisplayOf(
               addSignToValueFromStart(getValueByFixedNumber(bill.clientResp))
            );
            const totalBalance = getDisplayOf(
               addSignToValueFromStart(getValueByFixedNumber(bill.balance))
            );
            const claimStatus = getDisplayOf(manageStatus(bill.claimStatus));
            const invoiceStatus = getDisplayOf(manageStatus(bill.invoiceStatus));
            const status = getDisplayOf(manageStatus(bill.status));

            return (
               <div
                  key={index}
                  className={tbodyRowClassName}
                  style={{ ...resetRadius("left"), paddingLeft: 0 }}
                  onClick={() => history.push(`/bill/${bill._id}`)}
               >
                  <div className={classes.tdStyle}>{hours}</div>
                  <div className={classes.tdStyle}>{units}</div>
                  <div className={classes.tdStyle}>{billedRate}</div>
                  <div className={classes.tdStyle}>{totalAmount}</div>
                  <div className={classes.tdStyle}>{payorBalance}</div>
                  <div className={classes.tdStyle}>{clientBalance}</div>
                  <div className={classes.tdStyle}>{totalBalance}</div>
                  <div className={classes.tdStyle}>{claimStatus}</div>
                  <div className={classes.tdStyle}>{invoiceStatus}</div>
                  <div className={classes.tdStyle}>{status}</div>
               </div>
            );
         })}
      </div>
   );
};
