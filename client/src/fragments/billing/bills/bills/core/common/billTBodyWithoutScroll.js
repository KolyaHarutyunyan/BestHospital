import React from "react";
import { useHistory } from "react-router-dom";
import { hooksForTable, useWidth } from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

export const BillTBodyWithoutScroll = ({ bills = [] }) => {
   const classes = billTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const {
      getFullName,
      getTextDependsOnWidth,
      handleCreatedAtDate,
      resetRadius,
      showDashIfEmpty,
   } = hooksForTable;

   function getDisplayOf(givenText = "") {
      if (typeof givenText !== "string") return givenText;
      return showDashIfEmpty(getTextDependsOnWidth(width, 2565, givenText, 5));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {bills.map((bill, index) => {
            const payorFirstName = bill.payor?.firstName;
            const payorLastName = bill.payor?.lastName;
            const clientFirstName = bill.client?.firstName;
            const clientLastName = bill.client?.lastName;

            const billId = getDisplayOf(bill._id);
            const dateOfService = getDisplayOf(handleCreatedAtDate(bill.dateOfService));
            const payor = getFullName(payorFirstName, payorLastName, getDisplayOf);
            const client = getFullName(clientFirstName, clientLastName, getDisplayOf);
            const service = getDisplayOf(bill.authService?.authorizationId);

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  style={resetRadius("right")}
                  onClick={() => history.push(`/bill/${bill._id}`)}
               >
                  <div className={classes.tdStyle}>{billId}</div>
                  <div className={classes.tdStyle}>{dateOfService}</div>
                  <div className={classes.tdStyle}>{payor}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{service}</div>
               </div>
            );
         })}
      </div>
   );
};
