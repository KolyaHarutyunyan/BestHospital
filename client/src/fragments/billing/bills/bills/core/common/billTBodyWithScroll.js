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
         {bills.map((bill, index) => (
            <div
               key={index}
               className={tbodyRowClassName}
               style={{ ...resetRadius("left"), paddingLeft: 0 }}
               onClick={() => history.push(`/bill/${bill._id}`)}
            >
               <div className={classes.tdStyle}>{getDisplayOf(bill.totalHours)}</div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(bill.totalUnits?.toString())}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(
                     addSignToValueFromStart(getValueByFixedNumber(bill.billedRate))
                  )}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(
                     addSignToValueFromStart(getValueByFixedNumber(bill.totalAmount))
                  )}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(
                     addSignToValueFromStart(getValueByFixedNumber(bill.payerTotal))
                  )}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(
                     addSignToValueFromStart(getValueByFixedNumber(bill.clientResp))
                  )}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(
                     addSignToValueFromStart(getValueByFixedNumber(bill.billedAmount))
                  )}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(manageStatus(bill.claimStatus))}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(manageStatus(bill.invoiceStatus))}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(manageStatus(bill.status))}
               </div>
            </div>
         ))}
      </div>
   );
};
