import React from "react";
import { useHistory } from "react-router-dom";
import { getLimitedVal, hooksForTable } from "@eachbase/utils";
import { billTHeadTBodyStyle } from "./style";

export const BillTBodyWithoutScroll = ({ bills = [] }) => {
   const classes = billTHeadTBodyStyle();

   const history = useHistory();

   const { getFullName, handleCreatedAtDate, resetRadius, showDashIfEmpty } =
      hooksForTable;

   function getDisplayOf(givenText = "") {
      return showDashIfEmpty(getLimitedVal(givenText, 7));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {bills.map((bill, index) => {
            const clientFirstName = bill.client?.firstName;
            const clientLastName = bill.client?.lastName;

            const billId = getDisplayOf(bill._id);
            const dateOfService = getDisplayOf(handleCreatedAtDate(bill.dateOfService));
            const payor = getDisplayOf(bill.payer?.name);
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
