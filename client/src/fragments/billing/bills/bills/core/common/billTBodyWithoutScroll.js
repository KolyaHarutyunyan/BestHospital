import React from "react";
import { useHistory } from "react-router-dom";
import {
   getTextDependsOnWidth,
   handleCreatedAtDate,
   resetRadius,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

export const BillTBodyWithoutScroll = ({ bills = [] }) => {
   const classes = billTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const size = 2565;
   const limit = 5;

   function getDisplayOf(givenText = "") {
      if (typeof givenText !== "string") return givenText;
      return showDashIfEmpty(getTextDependsOnWidth(width, size, givenText, limit));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {bills.map((bill, index) => (
            <div
               key={index}
               className={classes.tbodyRowStyle}
               style={resetRadius("right")}
               onClick={() => history.push(`/bill/${bill._id}`)}
            >
               <div className={classes.tdStyle}>{getDisplayOf(bill._id)}</div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(handleCreatedAtDate(bill.dateOfService, 10, "/"))}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(bill.payor?.middleName)}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(bill.client?.middleName)}
               </div>
               <div className={classes.tdStyle}>
                  {getDisplayOf(bill.authService?.authorizationId)}
               </div>
            </div>
         ))}
      </div>
   );
};
